"use client";

import {
    FilterHorizontalIcon,
    Location01Icon,
    Money03Icon,
    Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { TablePagination } from "@/components/table/table-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    CAFE_TYPE_OPTIONS,
    PRICE_RANGE_OPTIONS,
    REGION_OPTIONS,
} from "@/globals/data-options";
import { useApiQuery } from "@/lib/use-api-query";

function SearchPageContent() {
    const query = useApiQuery({
        apiEndpoint: "cafes", // Assumes /api/v1/cafes endpoint exists and returns public list
        defaults: {
            limit: 12,
        },
    });

    // Fetch facilities dynamically
    const { data: facilitiesData, isLoading: isFacilitiesLoading } = useApiQuery({
        apiEndpoint: "facilities",
        syncWithUrl: false,
        defaults: {
            limit: 100,
        }
    });

    // Memoize options
    const facilitiesOptions = useMemo(() => {
        return facilitiesData?.map((f: any) => ({
            name: f.name,
            slug: f.slug
        })) || [];
    }, [facilitiesData]);

    const isFilterSelected = (key: string, value: string) => {
        const filter = query.filters[key];
        if (Array.isArray(filter)) {
            return filter.includes(value);
        }
        return filter === value;
    };

    const FilterSidebar = () => (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-semibold">Filters</h3>
                <div className="space-y-4">
                    {/* Region Filter */}
                    <div className="space-y-2">
                        <Label className="text-base">Region</Label>
                        <div className="space-y-2">
                            {REGION_OPTIONS.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`region-${option.value}`}
                                        checked={isFilterSelected("region", option.value)}
                                        onCheckedChange={() =>
                                            query.toggleFilter("region", option.value)
                                        }
                                    />
                                    <label
                                        htmlFor={`region-${option.value}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="space-y-2">
                        <Label className="text-base">Price Range</Label>
                        <div className="space-y-2">
                            {PRICE_RANGE_OPTIONS.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`price-${option.value}`}
                                        checked={isFilterSelected("priceRange", option.value)}
                                        onCheckedChange={() =>
                                            query.toggleFilter("priceRange", option.value)
                                        }
                                    />
                                    <label
                                        htmlFor={`price-${option.value}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div className="space-y-2">
                        <Label className="text-base">Type</Label>
                        <div className="space-y-2">
                            {CAFE_TYPE_OPTIONS.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`type-${option.value}`}
                                        checked={isFilterSelected("cafeType", option.value)}
                                        onCheckedChange={() =>
                                            query.toggleFilter("cafeType", option.value)
                                        }
                                    />
                                    <label
                                        htmlFor={`type-${option.value}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Facilities Filter */}
                    <div className="space-y-2">
                        <Label className="text-base">Fasilitas</Label>
                        <div className="space-y-2">
                            {isFacilitiesLoading ? (
                                <div className="text-sm text-muted-foreground">Loading...</div>
                            ) : facilitiesOptions.map((facility) => (
                                <div key={facility.slug} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`facility-${facility.slug}`}
                                        checked={isFilterSelected("facilities", facility.slug)}
                                        onCheckedChange={() =>
                                            query.toggleFilter("facilities", facility.slug)
                                        }
                                    />
                                    <label
                                        htmlFor={`facility-${facility.slug}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {facility.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Button variant="outline" className="w-full" onClick={query.resetFilters}>
                Reset Filters
            </Button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Explore Cafes</h1>
                    <p className="text-muted-foreground mt-1">
                        Find the perfect place for your meeting or hangout.
                    </p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by name..."
                            className="pl-9"
                            value={query.search}
                            onChange={(e) => query.setSearch(e.target.value)}
                        />
                    </div>
                    {/* Mobile Filter Sheet */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="md:hidden">
                                <HugeiconsIcon
                                    icon={FilterHorizontalIcon}
                                    className="mr-2 h-4 w-4"
                                />
                                Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                            </SheetHeader>
                            <div className="mt-4">
                                <FilterSidebar />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden w-64 flex-none md:block">
                    <FilterSidebar />
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {query.isLoading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="h-64 rounded-lg bg-muted animate-pulse"
                                />
                            ))}
                        </div>
                    ) : query.data.length === 0 ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
                            <h3 className="text-lg font-semibold">No cafes found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your filters or search term.
                            </p>
                            <Button
                                onClick={query.resetFilters}
                                className="mt-4"
                                variant="link"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {query.data.map((cafe: any) => (
                                    <Link key={cafe.id} href={`/cafe/${cafe.slug}`}>
                                        <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                                            <div className="aspect-video w-full bg-muted relative">
                                                {/* Placeholder for optional image */}
                                                {cafe.thumbnail ? (
                                                    <img
                                                        src={cafe.thumbnail}
                                                        alt={cafe.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                                        No Image
                                                    </div>
                                                )}
                                                <Badge className="absolute top-2 right-2 bg-white/90 text-black hover:bg-white">
                                                    {cafe.averageRating?.toString() || "New"} ★ (
                                                    {cafe.totalReviews || 0})
                                                </Badge>
                                            </div>
                                            <CardHeader className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <Badge
                                                            variant="secondary"
                                                            className="mb-2 text-[10px]"
                                                        >
                                                            {cafe.cafeType.replace(/_/g, " ")}
                                                        </Badge>
                                                        <CardTitle className="line-clamp-1 text-lg">
                                                            {cafe.name}
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                                <CardDescription className="line-clamp-2 mt-1">
                                                    {cafe.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <HugeiconsIcon
                                                        icon={Location01Icon}
                                                        className="h-4 w-4 shrink-0"
                                                    />
                                                    <span className="truncate">{cafe.address}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <HugeiconsIcon
                                                        icon={Money03Icon}
                                                        className="h-4 w-4 shrink-0"
                                                    />
                                                    <span>{cafe.priceRange}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            <TablePagination
                                total={query.meta.total}
                                totalPages={query.meta.totalPages}
                                page={query.page}
                                limit={query.limit}
                                onPageChange={query.setPage}
                                onLimitChange={query.setLimit}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 py-8">
                    <div className="space-y-6">
                        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
                        <div className="flex gap-8">
                            <div className="hidden w-64 flex-none space-y-6 md:block">
                                <div className="h-64 animate-pulse rounded-md bg-muted" />
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div
                                            key={i}
                                            className="h-64 animate-pulse rounded-lg bg-muted"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <SearchPageContent />
        </Suspense>
    );
}
