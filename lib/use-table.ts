"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

interface UseTableStateOptions {
  shallow?: boolean;
}

export function useTableState(_options: UseTableStateOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Memoize searchParams string to prevent infinite loops
  const searchParamsString = useMemo(
    () => searchParams?.toString() || "",
    [searchParams],
  );

  const createQueryString = useCallback(
    (params: Record<string, string | number | null | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParamsString);

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParamsString],
  );

  const updateUrl = useCallback(
    (newParams: URLSearchParams, resetPage = false) => {
      if (resetPage) {
        newParams.set("page", "1");
      }
      const url = `${pathname}?${newParams.toString()}`;

      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [pathname, router],
  );

  // Stabilize search params value
  const safeSearchParams = useMemo(
    () => new URLSearchParams(searchParamsString),
    [searchParamsString],
  );

  // Extract memoized values to avoid stale closures
  const memoizedValues = useMemo(() => {
    return {
      page: Number(safeSearchParams.get("page")) || 1,
      limit: Number(safeSearchParams.get("limit")) || 10,
      sortKey: safeSearchParams.get("orderBy"),
      sortDir: safeSearchParams.get("orderDir") as "asc" | "desc" | null,
    };
  }, [safeSearchParams]);

  // 1. Search
  const setSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParamsString);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      updateUrl(params, true);
    },
    [searchParamsString, updateUrl],
  );

  // 2. Pagination
  const setPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParamsString);
      params.set("page", String(newPage));
      updateUrl(params);
    },
    [searchParamsString, updateUrl],
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      const params = new URLSearchParams(searchParamsString);
      params.set("limit", String(newLimit));
      updateUrl(params, true); // Reset page on limit change
    },
    [searchParamsString, updateUrl],
  );

  // 3. Sorting
  const setSort = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParamsString);
      const currentSort = params.get("orderBy");
      const currentDir = params.get("orderDir");

      let nextDir = "asc";
      if (currentSort === key && currentDir === "asc") {
        nextDir = "desc";
      }

      params.set("orderBy", key);
      params.set("orderDir", nextDir);
      updateUrl(params);
    },
    [searchParamsString, updateUrl],
  );

  const setFilter = useCallback(
    (key: string, values: string[] | string | null) => {
      const params = new URLSearchParams(searchParamsString);

      if (!values || (Array.isArray(values) && values.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(values)) {
        // Join with comma
        const joined = values.join(",");
        params.set(key, joined);
      } else {
        params.set(key, String(values));
      }

      updateUrl(params, true);
    },
    [searchParamsString, updateUrl],
  );

  return {
    // State
    searchParams: safeSearchParams,
    page: memoizedValues.page,
    limit: memoizedValues.limit,
    sortKey: memoizedValues.sortKey,
    sortDir: memoizedValues.sortDir,
    isPending,
    // Actions
    setSearch,
    setPage,
    setLimit,
    setSort,
    setFilter,
    // Utils
    createQueryString,
  };
}
