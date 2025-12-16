"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    CAFE_TYPE_OPTIONS,
    FACILITIES_OPTIONS,
    PRICE_RANGE_OPTIONS,
} from "@/globals/data-options";

export function SearchFilter() {
    return (
        <div className="w-full flex flex-col gap-6 pr-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Reset
                </Button>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-medium text-sm">Rentang Harga</h4>
                <div className="space-y-2">
                    {PRICE_RANGE_OPTIONS.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox id={`price-${option.value}`} />
                            <Label
                                htmlFor={`price-${option.value}`}
                                className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Cafe Type */}
            <div className="space-y-4">
                <h4 className="font-medium text-sm">Tipe Cafe</h4>
                <div className="space-y-2">
                    {CAFE_TYPE_OPTIONS.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox id={`type-${option.value}`} />
                            <Label
                                htmlFor={`type-${option.value}`}
                                className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {option.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Facilities */}
            <div className="space-y-4">
                <h4 className="font-medium text-sm">Fasilitas</h4>
                <div className="space-y-2">
                    {FACILITIES_OPTIONS.slice(0, 5).map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                            <Checkbox id={`facility-${facility}`} />
                            <Label
                                htmlFor={`facility-${facility}`}
                                className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {facility}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
