"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface CafeFiltersProps {
  activeFilters: string[]
  setActiveFilters: (filters: string[] | ((prev: string[]) => string[])) => void
}

const filterSections = [
  {
    id: "establishment",
    title: "Establishment type",
    options: [
      "Restaurants",
      "Coffee & Tea",
      "Dessert",
      "Bakeries",
      "Bars & Pubs",
      "Quick Bites",
      "Specialty Food Market",
      "Delivery Only",
    ],
  },
  {
    id: "meal",
    title: "Meal type",
    options: ["Breakfast", "Brunch", "Lunch", "Dinner"],
  },
  {
    id: "cuisines",
    title: "Cuisines",
    options: ["Asian", "Indonesian", "Western", "Japanese", "Italian", "Chinese"],
  },
  {
    id: "facilities",
    title: "Fasilitas",
    options: ["Parkir", "WiFi Gratis", "AC", "Outdoor Seating", "Pet Friendly"],
  },
]

export function CafeFilters({ activeFilters, setActiveFilters }: CafeFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["establishment"])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev: string[]) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="space-y-6">
      {filterSections.map((section) => (
        <div key={section.id} className="border-b pb-4">
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <h3 className="font-semibold">{section.title}</h3>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${expandedSections.includes(section.id) ? "rotate-180" : ""}`}
            />
          </button>

          {expandedSections.includes(section.id) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {section.options.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter(option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                    activeFilters.includes(option)
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-foreground border-border hover:border-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
