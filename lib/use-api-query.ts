import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";
import { fetcher, swrConfig } from "./swr";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export type SortDirection = "asc" | "desc";

export interface ApiQueryOptions {
  /**
   * The API endpoint to fetch data from.
   * If not provided, data fetching is disabled.
   */
  apiEndpoint?: string;
  /**
   * Whether to sync state with URL search params.
   * Default: true
   */
  syncWithUrl?: boolean;
  /**
   * Default state values
   */
  defaults?: {
    page?: number;
    limit?: number;
    search?: string;
    filters?: Record<string, string | string[]>;
    sortKey?: string;
    sortDir?: SortDirection;
  };
  /**
   * Debounce time for search in ms. Default: 300
   */
  searchDebounceMs?: number;
}

export interface UseApiQueryResult<T> {
  // Data
  data: T[];
  meta: PaginationMeta;
  isLoading: boolean;
  isValidating: boolean;
  error: any;
  mutate: () => Promise<any>;
  /**
   * Force revalidate the data, bypassing the cache.
   */
  reload: () => Promise<any>;

  // State
  page: number;
  limit: number;
  search: string;
  filters: Record<string, string | string[]>;
  sortKey: string | null;
  sortDir: SortDirection | null;

  // Actions
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (term: string) => void;

  /**
   * Set a filter value.
   * - Pass `null` to remove the filter.
   * - Pass an array to set multiple values (comma separated in URL).
   */
  setFilter: (key: string, value: string | string[] | null) => void;

  /**
   * Toggle a value in a multi-select filter.
   */
  toggleFilter: (key: string, value: string) => void;

  /**
   * Set sorting key. Toggles direction if key is the same.
   */
  setSort: (key: string) => void;

  /**
   * Reset all filters and search, returning to page 1.
   */
  resetFilters: () => void;
}

export function useApiQuery<T = any>(
  options: ApiQueryOptions = {},
): UseApiQueryResult<T> {
  const {
    apiEndpoint, // If undefined, we won't fetch (useful for uncontrolled state)
    syncWithUrl = true,
    defaults = {},
    searchDebounceMs = 300,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // --- Local State (for when syncWithUrl is false) ---
  const [localState, setLocalState] = useState({
    page: defaults.page || 1,
    limit: defaults.limit || 10,
    search: defaults.search || "",
    filters: defaults.filters || {},
    sortKey: defaults.sortKey || null,
    sortDir: defaults.sortDir || ("asc" as SortDirection),
  });

  // --- State Resolution ---
  // If syncWithUrl, we derive state from URL SearchParams.
  // Else, we use localState.

  const currentState = useMemo(() => {
    if (!syncWithUrl) return localState;

    const params = new URLSearchParams(searchParams?.toString() || "");
    const filters: Record<string, string | string[]> = {};

    // Extract unknown params as filters
    const knownKeys = ["page", "limit", "search", "orderBy", "orderDir"];
    params.forEach((value, key) => {
      if (!knownKeys.includes(key)) {
        filters[key] = value.includes(",") ? value.split(",") : value;
      }
    });

    return {
      page: Number(params.get("page")) || defaults.page || 1,
      limit: Number(params.get("limit")) || defaults.limit || 10,
      search: params.get("search") || defaults.search || "",
      filters,
      sortKey: params.get("orderBy") || defaults.sortKey || null,
      sortDir:
        (params.get("orderDir") as SortDirection) || defaults.sortDir || "asc",
    };
  }, [syncWithUrl, localState, searchParams, defaults]);

  // --- URL Updater ---
  const updateUrl = useCallback(
    (newState: Partial<typeof currentState>) => {
      if (!syncWithUrl) {
        setLocalState((prev) => ({ ...prev, ...newState }) as any);
        return;
      }

      const currentParams = new URLSearchParams(searchParams?.toString());

      // Helper to set/delete
      const setOrDelete = (key: string, val: any) => {
        if (
          val === null ||
          val === undefined ||
          val === "" ||
          val === "undefined" || // Prevent string "undefined"
          (Array.isArray(val) && val.length === 0)
        ) {
          currentParams.delete(key);
        } else {
          currentParams.set(
            key,
            Array.isArray(val) ? val.join(",") : String(val),
          );
        }
      };

      if (newState.page !== undefined) setOrDelete("page", newState.page);
      if (newState.limit !== undefined) setOrDelete("limit", newState.limit);
      if (newState.search !== undefined) setOrDelete("search", newState.search);
      if (newState.sortKey !== undefined)
        setOrDelete("orderBy", newState.sortKey);
      if (newState.sortDir !== undefined)
        setOrDelete("orderDir", newState.sortDir);

      if (newState.filters) {
        Object.entries(newState.filters).map(([k, v]) => setOrDelete(k, v));
      }

      const url = `${pathname}?${currentParams.toString()}`;
      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [syncWithUrl, pathname, router, searchParams],
  );

  // --- Actions ---

  const setPage = useCallback(
    (page: number) => {
      updateUrl({ page });
    },
    [updateUrl],
  );

  const setLimit = useCallback(
    (limit: number) => {
      updateUrl({ limit, page: 1 }); // Reset to page 1
    },
    [updateUrl],
  );

  // Debounced Search
  const debouncedSetSearch = useDebouncedCallback((term: string) => {
    updateUrl({ search: term, page: 1 });
  }, searchDebounceMs);

  const setSearch = useCallback(
    (term: string) => {
      debouncedSetSearch(term);
    },
    [debouncedSetSearch],
  );

  const setFilter = useCallback(
    (key: string, value: string | string[] | null) => {
      const nextFilters = { ...currentState.filters };
      if (
        value === null ||
        (Array.isArray(value) && value.length === 0) ||
        value === ""
      ) {
        delete nextFilters[key];
      } else {
        nextFilters[key] = value;
      }
      // We pass filters separately to updateUrl logic, but here we need to handle specific key removal
      // Actually, updateUrl expects a partial state object.
      // If syncWithUrl is true, we manipulate URL directly in updateUrl for the specific keys.
      // Ideally updateUrl should take a "merged" state or specific changes.
      // Let's optimize: In sync mode, we just update the specific URL param from here?
      // No, let's keep it consistent.

      // Special handling for URL sync: we need to pass the *new* full filters object
      // OR we need updateUrl to handle localized updates?
      // Let's make updateUrl smarter or just handle it here.

      if (syncWithUrl) {
        const currentParams = new URLSearchParams(searchParams?.toString());
        if (
          value === null ||
          (Array.isArray(value) && value.length === 0) ||
          value === ""
        ) {
          currentParams.delete(key);
        } else {
          currentParams.set(
            key,
            Array.isArray(value) ? value.join(",") : String(value),
          );
        }
        currentParams.set("page", "1"); // Reset page
        startTransition(() => {
          router.replace(`${pathname}?${currentParams.toString()}`, {
            scroll: false,
          });
        });
      } else {
        setLocalState((prev) => {
          const newFilters = { ...prev.filters };
          if (
            value === null ||
            (Array.isArray(value) && value.length === 0) ||
            value === ""
          ) {
            delete newFilters[key];
          } else {
            newFilters[key] = value;
          }
          return { ...prev, filters: newFilters, page: 1 };
        });
      }
    },
    [currentState.filters, syncWithUrl, searchParams, pathname, router],
  );

  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const current = currentState.filters[key];
      let next: string[];

      if (Array.isArray(current)) {
        if (current.includes(value)) {
          next = current.filter((v) => v !== value);
        } else {
          next = [...current, value];
        }
      } else if (typeof current === "string") {
        if (current === value) {
          next = [];
        } else if (current) {
          next = [current, value];
        } else {
          next = [value];
        }
      } else {
        next = [value];
      }

      setFilter(key, next);
    },
    [currentState.filters, setFilter],
  );

  const setSort = useCallback(
    (key: string) => {
      const currentKey = currentState.sortKey;
      const currentDir = currentState.sortDir;

      let nextDir: SortDirection = "asc";
      if (currentKey === key && currentDir === "asc") {
        nextDir = "desc";
      }

      updateUrl({ sortKey: key, sortDir: nextDir });
    },
    [currentState.sortKey, currentState.sortDir, updateUrl],
  );

  const resetFilters = useCallback(() => {
    if (syncWithUrl) {
      const currentParams = new URLSearchParams(searchParams?.toString());
      // Keep only pagination/limit default? Or reset entirely?
      // Usually reset means "clear search and filters"
      const keysToDelete: string[] = [];
      currentParams.forEach((_, key) => {
        if (!["page", "limit", "orderBy", "orderDir"].includes(key)) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.map((k) => currentParams.delete(k));
      currentParams.delete("search"); // Explicitly delete search
      currentParams.set("page", "1");

      startTransition(() => {
        router.replace(`${pathname}?${currentParams.toString()}`, {
          scroll: false,
        });
      });
    } else {
      setLocalState((prev) => ({
        ...prev,
        search: "",
        filters: {},
        page: 1,
      }));
    }
  }, [syncWithUrl, searchParams, pathname, router]);

  // --- Data Fetching ---

  const swrKey = useMemo(() => {
    if (!apiEndpoint) return null;

    const params = new URLSearchParams();
    params.set("page", String(currentState.page));
    params.set("limit", String(currentState.limit));
    if (currentState.search) params.set("search", currentState.search);
    if (currentState.sortKey) {
      params.set("orderBy", currentState.sortKey);
      params.set("orderDir", currentState.sortDir || "asc");
    }

    Object.entries(currentState.filters).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        if (val.length > 0) params.set(key, val.join(","));
      } else if (val && val !== "undefined") {
        params.set(key, String(val));
      }
    });

    const endpoint = apiEndpoint.startsWith("/")
      ? apiEndpoint
      : `/${apiEndpoint}`;
    return `${endpoint}?${params.toString().toLocaleLowerCase()}`;
  }, [apiEndpoint, currentState]);

  const {
    data: apiResponse,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ApiResponse<T>>(swrKey, fetcher, swrConfig);

  const defaultMeta: PaginationMeta = {
    page: currentState.page,
    limit: currentState.limit,
    total: 0,
    totalPages: 0,
  };

  return {
    data: apiResponse?.data || [],
    meta: apiResponse?.pagination || defaultMeta,
    isLoading: isLoading || isPending, // Include transition pending state
    isValidating,
    error,
    mutate,
    reload: mutate,

    page: currentState.page,
    limit: currentState.limit,
    search: currentState.search,
    filters: currentState.filters,
    sortKey: currentState.sortKey,
    sortDir: currentState.sortDir,

    setPage,
    setLimit,
    setSearch,
    setFilter,
    toggleFilter,
    setSort,
    resetFilters,
  };
}
