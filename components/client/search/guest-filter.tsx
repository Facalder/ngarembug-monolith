"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HugeiconsIcon } from "@hugeicons/react"
import { UserGroup02Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { useState } from "react"

interface GuestFilterProps {
    count: number
    onChange: (count: number) => void
}

export function GuestFilter({ count, onChange }: GuestFilterProps) {
    const [open, setOpen] = useState(false)
    // Simplified state for demo (keeping original logic's single count for prop, but internal can be more complex if needed)
    // The original hero used a single 'guestCount' but showed UI for adults/children. 
    // I will keep the UI but primarily update the main count for now, or just map 'Adults' to the main count.

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className="bg-white/95 hover:bg-white text-foreground rounded-full px-6 py-3 text-base font-bold shadow-lg h-auto"
                >
                    <HugeiconsIcon icon={UserGroup02Icon} className="w-6 h-6" />
                    {count} Tamu
                    <HugeiconsIcon icon={ArrowDown01Icon} className="w-6 h-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="start">
                <h3 className="text-lg font-semibold mb-4">Berapa banyak mahasiswa</h3>

                <div className="space-y-4">
                    {/* Dewasa */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Dewasa</p>
                            <p className="text-sm text-muted-foreground">(12 tahun ke atas)</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => onChange(Math.max(1, count - 1))}
                                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
                            >
                                <span className="text-lg">−</span>
                            </button>
                            <span className="w-8 text-center font-medium">{count}</span>
                            <button
                                onClick={() => onChange(count + 1)}
                                className="w-8 h-8 rounded-full border-2 border-primary text-primary hover:bg-primary/10 flex items-center justify-center"
                            >
                                <span className="text-lg">+</span>
                            </button>
                        </div>
                    </div>
                </div>

                <Button onClick={() => setOpen(false)} className="w-full mt-6 rounded-full bg-primary hover:bg-primary/90 font-medium">Simpan</Button>
            </PopoverContent>
        </Popover>
    )
}
