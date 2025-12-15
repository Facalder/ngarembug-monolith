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
  value: string;
};

export type Filter = {
  key: string;
  label: string;
  options: FilterOption[];
};

interface TableToolbarProps {
  searchPlaceholder?: string;
  filters?: Filter[];
}

export function TableToolbar({
  searchPlaceholder = "Search...",
  filters = [],
}: TableToolbarProps) {
  const { searchParams, setSearch, setFilter } = useTableState();

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

        {filters.map((filter) => (
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
                {searchParams.getAll(filter.key).length > 0 && (
                  <span className="bg-primary text-primary-foreground ml-1 flex h-4 w-4 items-center justify-center rounded-sm text-[10px] p-0.5">
                    {searchParams.getAll(filter.key).length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by {filter.label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filter.options.map((option) => {
                const currentValues = searchParams.getAll(filter.key);
                const isChecked = currentValues.includes(option.value);

                return (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const next = checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v) => v !== option.value);
                      setFilter(filter.key, next);
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                );
              })}
              {searchParams.getAll(filter.key).length > 0 && (
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
