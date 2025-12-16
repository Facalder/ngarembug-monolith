"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const photoCategories = [
  { id: "all", name: "All photos", count: 2821 },
  { id: "interior", name: "Interior", count: 1331 },
  { id: "food", name: "Food", count: 470 },
  { id: "menu", name: "Menu", count: 167 },
  { id: "drinks", name: "Drinks", count: 89 },
  { id: "exterior", name: "Exterior", count: 764 },
]

const photos = [
  {
    id: 1,
    url: "/images/image.png",
    alt: "Restaurant exterior at sunset",
    category: "exterior",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Restaurant interior",
    category: "interior",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Food platter",
    category: "food",
  },
  {
    id: 4,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Menu",
    category: "menu",
  },
  {
    id: 5,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Building exterior",
    category: "exterior",
  },
  {
    id: 6,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Drinks",
    category: "drinks",
  },
  {
    id: 7,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Traditional dishes",
    category: "food",
  },
  {
    id: 8,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Menu pages",
    category: "menu",
  },
]

export default function PhotoGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Photos</h2>
          <Button variant="outline" size="sm">
            <Camera className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        </div>

        <div className="flex gap-2 h-[400px]">
          {/* Large hero image on the left */}
          <Card
            className="flex-[2] overflow-hidden group cursor-pointer relative"
            onClick={() => {
              setCurrentPhotoIndex(0)
              setIsModalOpen(true)
            }}
          >
            <Image
              src={photos[0].url || "/placeholder.svg"}
              alt={photos[0].alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md flex items-center gap-2 text-sm">
              <Camera className="h-4 w-4" />
              {photoCategories[0].count}
            </div>
          </Card>

          {/* Categorized thumbnail grid on the right */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            {photoCategories.slice(1, 5).map((category, index) => (
              <Card
                key={category.id}
                className="overflow-hidden group cursor-pointer relative"
                onClick={() => {
                  setSelectedCategory(category.id)
                  setCurrentPhotoIndex(0)
                  setIsModalOpen(true)
                }}
              >
                <Image
                  src={photos[index + 1]?.url || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                  <p className="font-semibold text-lg">{category.name}</p>
                  <p className="text-sm">{category.count}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex">
          {/* Sidebar with categories */}
          <div className="w-64 bg-white p-6 overflow-y-auto">
            <div className="space-y-2">
              {photoCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setCurrentPhotoIndex(0)
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.count} photos</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main photo grid area */}
          <div className="flex-1 relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Photo masonry grid */}
            <div className="h-full overflow-y-auto p-6">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {filteredPhotos.map((photo, index) => (
                  <Card
                    key={photo.id}
                    className="overflow-hidden break-inside-avoid cursor-pointer group"
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
