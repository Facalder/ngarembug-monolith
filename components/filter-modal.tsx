"use client"

import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
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

export function FilterModal({ isOpen, onClose, activeFilters, setActiveFilters }: FilterModalProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["establishment"])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 top-20 bg-background z-50 lg:hidden overflow-y-auto">
        <div className="sticky top-0 bg-background border-b z-10">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-accent rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {filterSections.map((section) => (
            <div key={section.id} className="border-b pb-4">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full py-2 text-left"
              >
                <h3 className="font-semibold">{section.title}</h3>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedSections.includes(section.id) ? "rotate-180" : ""
                  }`}
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

        <div className="sticky bottom-0 bg-background border-t p-4">
          <Button onClick={onClose} className="w-full">
            Tampilkan hasil
          </Button>
        </div>
      </div>
    </>
  )
}
