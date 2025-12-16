"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FilterHorizontalIcon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

export function FilterBar() {
  const [filters, setFilters] = useState<string[]>([])

  const categories = ["Latest", "Popular", "Banking", "E-commerce", "Social", "Productivity", "Health & Fitness"]

  const toggleFilter = (filter: string) => {
    setFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={FilterHorizontalIcon} className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {filters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setFilters([])}>
              Clear all
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">1,234 apps</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={filters.includes(category) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleFilter(category)}
          >
            {category}
            {filters.includes(category) && <HugeiconsIcon icon={Cancel01Icon} className="ml-1 h-3 w-3" />}
          </Badge>
        ))}
      </div>
    </div>
  )
}
