"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface UseTableStateOptions {
  shallow?: boolean;
}

export function useTableState(_options: UseTableStateOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (params: Record<string, string | number | null | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
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

  // 1. Search
  const setSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }
      updateUrl(params, true);
    },
    [searchParams, updateUrl],
  );

  // 2. Pagination
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const setPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(newPage));
      updateUrl(params);
    },
    [searchParams, updateUrl],
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("limit", String(newLimit));
      updateUrl(params, true); // Reset page on limit change
    },
    [searchParams, updateUrl],
  );

  // 3. Sorting
  const sortKey = searchParams.get("orderBy");
  const sortDir = searchParams.get("orderDir") as "asc" | "desc" | null;

  const setSort = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams);
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
    [searchParams, updateUrl],
  );

  const setFilter = useCallback(
    (key: string, values: string[] | string | null) => {
      const params = new URLSearchParams(searchParams);
      
      if (!values || (Array.isArray(values) && values.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(values)) {
        // Join with % and lowercase
        const joined = values.map((v) => v.toLowerCase()).join("%");
        params.set(key, joined);
      } else {
        params.set(key, String(values).toLowerCase());
      }

      updateUrl(params, true);
    },
    [searchParams, updateUrl],
  );

  return {
    // State
    searchParams,
    page,
    limit,
    sortKey,
    sortDir,
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
