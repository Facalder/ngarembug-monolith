"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Wifi01Icon, ArrowDown01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { FACILITIES_OPTIONS } from "@/globals/data-options"
import { useState } from "react"

interface FacilitiesFilterProps {
    value: string[]
    onChange: (value: string[]) => void
}

export function FacilitiesFilter({ value, onChange }: FacilitiesFilterProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")

    const filteredFacilities = FACILITIES_OPTIONS.filter((f) =>
        f.toLowerCase().includes(search.toLowerCase())
    )

    const toggleFacility = (facility: string) => {
        onChange(
            value.includes(facility)
                ? value.filter((f) => f !== facility)
                : [...value, facility]
        )
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className="bg-white/95 hover:bg-white text-foreground rounded-full px-6 py-3 text-base font-bold shadow-lg h-auto"
                >
                    <HugeiconsIcon icon={Wifi01Icon} className="w-6 h-6" />
                    Fasilitas: <span className="font-medium text-muted-foreground">{value.length > 0 ? value.slice(0, 2).join(", ") : "Pilih Fasilitas"} {value.length > 2 && "..."}</span>
                    <HugeiconsIcon icon={ArrowDown01Icon} className="w-6 h-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="start">
                <h3 className="text-lg font-semibold mb-4">Pilih Fasilitas</h3>
                <div className="mb-4">
                    <div className="relative">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Cari fasilitas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 bg-muted/50"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {filteredFacilities.map((facility) => (
                        <button
                            key={facility}
                            onClick={() => toggleFacility(facility)}
                            className={cn(
                                "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                                value.includes(facility)
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background hover:bg-muted border-border",
                            )}
                        >
                            {facility}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
