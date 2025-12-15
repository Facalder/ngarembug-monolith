"use client";

import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Delete01Icon,
  FileNotFoundIcon,
  MoreHorizontalIcon,
  PencilEdit01Icon,
  ReloadIcon,
  Sorting05Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher, swrConfig } from "@/lib/swr";
import { cn } from "@/lib/utils";
import { TablePagination } from "./table-pagination";
import { type Filter, TableToolbar } from "./table-toolbar";
import { useTableState } from "./use-table";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  className?: string; // Additional classes for cell
  headerClassName?: string; // Additional classes for header
  render?: (row: T) => React.ReactNode;
  pinned?: "left" | "right";
};

export interface DataTableProps<T> {
  apiEndpoint: string;
  columns: Column<T>[];
  renderRowAction?: (row: T) => React.ReactNode;
  searchPlaceholder?: string;
  filters?: Filter[];
}

export function DataTable<T extends { id: string | number }>({
  apiEndpoint,
  columns,
  renderRowAction,
  searchPlaceholder,
  filters,
}: DataTableProps<T>) {
  const { searchParams, setSort } = useTableState();

  // Construct URL with params for SWR key
  // We use useTableState's params but we need to convert them to string for key
  const queryString = searchParams.toString();
  const endpoint = apiEndpoint.startsWith("/")
    ? apiEndpoint
    : `/api/v1/${apiEndpoint}`;
  const swrKey = `${endpoint}${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading } = useSWR(swrKey, fetcher, swrConfig);

  const rows = (data?.data as T[]) || [];
  const pagination = data?.pagination || {
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 10,
  };

  // Sticky Helpers
  const getStickyStyle = (col: Column<T>) => {
    if (!col.pinned) return {};
    if (col.pinned === "left") {
      return { position: "sticky", left: 0, zIndex: 10 } as React.CSSProperties;
    }
    if (col.pinned === "right") {
      return {
        position: "sticky",
        right: 0,
        zIndex: 10,
      } as React.CSSProperties;
    }
    return {};
  };

  const getStickyClass = (col: Column<T>) => {
    if (!col.pinned) return "";
    return cn(
      "bg-background shadow-[1px_0_0_0_var(--color-border)]",
      col.pinned === "left"
        ? "left-0 border-r"
        : "right-0 border-l shadow-[-1px_0_0_0_var(--color-border)]",
    );
  };

  if (error) {
    return <div className="p-4 text-destructive">Failed to load data.</div>;
  }

  return (
    <div className="space-y-4">
      <TableToolbar searchPlaceholder={searchPlaceholder} filters={filters} />
      <div className="rounded-md border border-border overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                {columns.map((col) => {
                  const isSorted = searchParams.get("orderBy") === col.key;
                  const sortDir = searchParams.get("orderDir");

                  return (
                    <th
                      key={String(col.key)}
                      className={cn(
                        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
                        col.headerClassName,
                        getStickyClass(col),
                      )}
                      style={getStickyStyle(col)}
                    >
                      {col.sortable ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-ml-3 h-8 data-[state=open]:bg-accent"
                          onClick={() => setSort(String(col.key))}
                        >
                          <span>{col.label}</span>
                          {isSorted ? (
                            sortDir === "desc" ? (
                              <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                className="ml-2 h-4 w-4"
                              />
                            ) : (
                              <HugeiconsIcon
                                icon={ArrowUp01Icon}
                                className="ml-2 h-4 w-4"
                              />
                            )
                          ) : (
                            <HugeiconsIcon
                              icon={Sorting05Icon}
                              className="ml-2 h-4 w-4 opacity-50"
                            />
                          )}
                        </Button>
                      ) : (
                        col.label
                      )}
                    </th>
                  );
                })}
                {/* Actions column */}
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground sticky right-0 z-10 bg-background border-l shadow-[-1px_0_0_0_var(--color-border)] w-[50px]"></th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr
                    key={i.toString()}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {columns.map((_col, j) => (
                      <td key={j.toString()} className="p-4">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                    <td className="p-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="h-24 text-center">
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <HugeiconsIcon icon={FileNotFoundIcon} />
                        </EmptyMedia>
                        <EmptyTitle>Tidak ada data yang ditemukan</EmptyTitle>
                      </EmptyHeader>
                      <EmptyContent>
                        <Button variant="outline">
                          <HugeiconsIcon icon={ReloadIcon} />
                          Perbarui Data
                        </Button>
                      </EmptyContent>
                    </Empty>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className={cn(
                          "p-4 align-middle [&:has([role=checkbox])]:pr-0",
                          col.className,
                          getStickyClass(col),
                        )}
                        style={getStickyStyle(col)}
                      >
                        {col.render
                          ? col.render(row)
                          : (row[col.key as keyof T] as React.ReactNode)}
                      </td>
                    ))}
                    <td className="p-4 align-middle sticky right-0 z-10 bg-background border-l shadow-[-1px_0_0_0_var(--color-border)]">
                      {renderRowAction ? (
                        renderRowAction(row)
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                className="h-4 w-4"
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                navigator.clipboard.writeText(String(row.id))
                              }
                            >
                              Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <HugeiconsIcon
                                icon={PencilEdit01Icon}
                                className="mr-2 h-4 w-4"
                              />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <HugeiconsIcon
                                icon={Delete01Icon}
                                className="mr-2 h-4 w-4"
                              />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && (
        <TablePagination
          total={pagination.total}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}
