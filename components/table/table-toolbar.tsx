"use client";

import {
  FilterHorizontalIcon,
  ReloadIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTableState } from "../../lib/use-table";

export type FilterOption = {
  label: string;
  value: string | number;
};

export type Filter = {
  key: string;
  label: string;
  description?: string;
  options: FilterOption[];
};

import {
  CAFE_TYPE_OPTIONS,
  CONTENT_STATUS_OPTIONS,
  DAYS_OPTIONS,
  PRICE_RANGE_OPTIONS,
  REGION_OPTIONS,
  REVIEW_STATUS_OPTIONS,
  VISITOR_TYPE_OPTIONS,
} from "@/globals/data-options";

const FILTER_MAPPING: Record<
  string,
  { label: string; options: readonly any[] }
> = {
  cafeType: { label: "Tipe Kafe", options: CAFE_TYPE_OPTIONS },
  region: { label: "Wilayah", options: REGION_OPTIONS },
  priceRange: { label: "Rentang Harga", options: PRICE_RANGE_OPTIONS },
  contentStatus: { label: "Status", options: CONTENT_STATUS_OPTIONS },
  reviewStatus: { label: "Status Review", options: REVIEW_STATUS_OPTIONS },
  visitorType: { label: "Tipe Pengunjung", options: VISITOR_TYPE_OPTIONS },
  days: { label: "Hari", options: DAYS_OPTIONS },
};

interface TableToolbarProps {
  searchPlaceholder?: string;
  filters?: Filter[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns?: { key: string | number | symbol }[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function TableToolbar({
  searchPlaceholder = "Search...",
  filters = [],
  columns = [],
  onRefresh,
  isRefreshing,
}: TableToolbarProps) {
  const { searchParams, setSearch, setFilter } = useTableState();

  const dynamicFilters: Filter[] = columns
    .map((col) => {
      const key = String(col.key);
      const mapping = FILTER_MAPPING[key];
      if (mapping) {
        return {
          key,
          label: mapping.label,
          options: mapping.options as unknown as FilterOption[],
        };
      }
      return null;
    })
    .filter((f): f is Filter => f !== null);

  const activeFilters = [...dynamicFilters, ...filters];

  // Handle Search
  const handleSearch = useDebouncedCallback((term: string) => {
    setSearch(term);
  }, 300);

  return (
    <div className="flex flex-col gap-4 md:gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        <div className="relative w-full sm:max-w-xs min-w-50">
          <Input
            placeholder={searchPlaceholder}
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-9"
          />
          <HugeiconsIcon
            icon={Search01Icon}
            className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          />
        </div>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1"
            disabled={isRefreshing}
            onClick={onRefresh}
          >
            <HugeiconsIcon
              icon={ReloadIcon}
              className={cn("h-4 w-4", isRefreshing && "animate-spin")}
            />
            Refresh
          </Button>
        )}

        {activeFilters.map((filter) => (
          <DropdownMenu key={filter.key}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 border-dashed"
              >
                <HugeiconsIcon
                  icon={FilterHorizontalIcon}
                  className="h-4 w-4"
                />
                {filter.label}
                {searchParams.get(filter.key) && (
                  <span className="bg-primary text-primary-foreground ml-1 flex h-4 w-4 items-center justify-center rounded-sm text-[10px] p-0.5">
                    {searchParams.get(filter.key)?.split(",").length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>{filter.label}</DropdownMenuLabel>
              {filter.description && (
                <p className="px-2 py-1 text-xs text-muted-foreground">
                  {filter.description}
                </p>
              )}
              <DropdownMenuSeparator />
              {filter.options.map((option) => {
                // Get raw value, split by , if present, ensure array
                const rawParam = searchParams.get(filter.key);
                const currentValues = rawParam ? rawParam.split(",") : [];

                // Check case-insensitively to support lowercase URL params
                const isChecked = currentValues.some(
                  (v) => v.toLowerCase() === String(option.value).toLowerCase(),
                );

                return (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      // Usahakan URL param lowercase semua
                      const valueStr = String(option.value).toLowerCase();
                      let next: string[];

                      // We need to work with lowercase values for comparison/filtering to be consistent
                      const currentValuesLower = currentValues.map((v) =>
                        v.toLowerCase(),
                      );

                      if (checked) {
                        // Add if not present (although Dropdown handles display, logic needs to be safe)
                        if (!currentValuesLower.includes(valueStr)) {
                          next = [...currentValues, valueStr];
                        } else {
                          next = currentValues;
                        }
                      } else {
                        next = currentValues.filter(
                          (v) => v.toLowerCase() !== valueStr,
                        );
                      }
                      setFilter(filter.key, next);
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                );
              })}
              {searchParams.get(filter.key) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={false}
                    onSelect={() => setFilter(filter.key, [])}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
}
