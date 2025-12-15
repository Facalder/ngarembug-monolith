"use client";

import { FilterHorizontalIcon, Search01Icon } from "@hugeicons/core-free-icons";
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
import { useTableState } from "./use-table";

export type FilterOption = {
  label: string;
  value: string | number;
};

export type Filter = {
  key: string;
  label: string;
  options: FilterOption[];
};

import {
  CAFE_TYPE_OPTIONS,
  CONTENT_STATUS_OPTIONS,
  DAYS_OPTIONS,
  PRICE_RANGE_OPTIONS,
  REGION_OPTIONS,
  REVIEW_STATUS_OPTIONS,
  STAR_RATING_OPTIONS,
  VISITOR_TYPE_OPTIONS,
} from "@/globals/data-options";

const FILTER_MAPPING: Record<string, { label: string; options: readonly any[] }> =
{
  cafeType: { label: "Tipe Kafe", options: CAFE_TYPE_OPTIONS },
  region: { label: "Wilayah", options: REGION_OPTIONS },
  priceRange: { label: "Rentang Harga", options: PRICE_RANGE_OPTIONS },
  contentStatus: { label: "Status", options: CONTENT_STATUS_OPTIONS },
  reviewStatus: { label: "Status Review", options: REVIEW_STATUS_OPTIONS },
  averageRating: { label: "Rating", options: STAR_RATING_OPTIONS },
  visitorType: { label: "Tipe Pengunjung", options: VISITOR_TYPE_OPTIONS },
  days: { label: "Hari", options: DAYS_OPTIONS },
};

interface TableToolbarProps {
  searchPlaceholder?: string;
  filters?: Filter[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns?: { key: string | number | symbol }[];
}

export function TableToolbar({
  searchPlaceholder = "Search...",
  filters = [],
  columns = [],
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
        <div className="relative w-full sm:max-w-xs min-w-[200px]">
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
                    {searchParams.get(filter.key)?.split("%").length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by {filter.label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filter.options.map((option) => {
                // Get raw value, split by % if present, ensure array
                const rawParam = searchParams.get(filter.key);
                const currentValues = rawParam ? rawParam.split("%") : [];

                // Check case-insensitively
                const isChecked = currentValues.some(
                  (v) => v.toLowerCase() === String(option.value).toLowerCase(),
                );

                return (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const valueStr = String(option.value);
                      // Filter logic: we work with the original values but comparison is case-insensitive
                      // We'll reconstruct the array
                      let next: string[];

                      if (checked) {
                        next = [...currentValues, valueStr];
                      } else {
                        next = currentValues.filter(
                          (v) => v.toLowerCase() !== valueStr.toLowerCase(),
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
