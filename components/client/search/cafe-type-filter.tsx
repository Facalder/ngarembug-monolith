"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Store03FreeIcons, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { CAFE_TYPE_OPTIONS } from "@/globals/data-options"
import { useState } from "react"

interface CafeTypeFilterProps {
    value: string
    onChange: (value: string) => void
}

export function CafeTypeFilter({ value, onChange }: CafeTypeFilterProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className="bg-white/95 hover:bg-white text-foreground rounded-full px-6 py-3 text-base font-bold shadow-lg h-auto"
                >
                    <HugeiconsIcon icon={Store03FreeIcons} className="w-6 h-6" />
                    Tipe: <span className="font-medium text-muted-foreground">{value || "Pilih Tipe"}</span>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="w-6 h-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="start">
                <h3 className="text-lg font-semibold mb-4">Pilih Tipe Cafe</h3>
                <div className="flex flex-wrap gap-2">
                    {CAFE_TYPE_OPTIONS.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => {
                                onChange(type.label)
                                setOpen(false)
                            }}
                            className={cn(
                                "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                                value === type.label
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background hover:bg-muted border-border",
                            )}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
