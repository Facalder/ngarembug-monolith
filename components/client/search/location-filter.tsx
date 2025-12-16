"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Location01Icon, ArrowDown01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { REGION_OPTIONS } from "@/globals/data-options"
import { useState } from "react"

interface LocationFilterProps {
    value: string
    onChange: (value: string) => void
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className="bg-white/95 hover:bg-white text-foreground rounded-full px-6 py-3 text-base font-bold shadow-lg h-auto"
                >
                    <HugeiconsIcon icon={Location01Icon} className="w-6 h-6" />
                    Lokasi: <span className="font-medium text-muted-foreground">{value || "Pilih Lokasi"}</span>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="w-6 h-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="start">
                <h3 className="text-lg font-semibold mb-4">Pilih Wilayah</h3>
                <div>
                    <div className="flex flex-wrap gap-2">
                        {REGION_OPTIONS.map((region) => (
                            <button
                                key={region.value}
                                onClick={() => {
                                    onChange(region.label)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                                    value === region.label
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-background hover:bg-muted border-border",
                                )}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
