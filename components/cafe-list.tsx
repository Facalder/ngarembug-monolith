"use client"

import { useState } from "react"
import { MapPin, AirVent, Car, Home } from "lucide-react"

const cafes = [
  {
    id: 1,
    name: "Diagram Coffee & Space",
    rating: 4.2,
    reviews: 22,
    location: "Sukapura • Outdoor Cafe • 0.5km dari Telkom University",
    hours: "13.00 - 22.00 WIB",
    priceRange: "22K - 40K",
    capacity: "6-12 orang",
    amenities: ["Air Conditioner", "Parkir Luas", "Meeting Room"],
    image: "/images/image.png",
    badge: "Approved",
  },
  {
    id: 2,
    name: "Diagram Coffee & Space",
    rating: 4.2,
    reviews: 22,
    location: "Sukapura • Outdoor Cafe • 0.5km dari Telkom University",
    hours: "13.00 - 22.00 WIB",
    priceRange: "22K - 40K",
    capacity: "6-12 orang",
    amenities: ["Air Conditioner", "Parkir Luas", "Meeting Room"],
    image: "/images/image.png",
    badge: "Approved",
  },
  {
    id: 3,
    name: "Diagram Coffee & Space",
    rating: 4.2,
    reviews: 22,
    location: "Sukapura • Outdoor Cafe • 0.5km dari Telkom University",
    hours: "13.00 - 22.00 WIB",
    priceRange: "22K - 40K",
    capacity: "6-12 orang",
    amenities: ["Air Conditioner", "Parkir Luas", "Meeting Room"],
    image: "/images/image.png",
    badge: "Approved",
  },
]

export function CafeList() {
  const [sortBy, setSortBy] = useState("Featured")

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">1,419 results</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Urutkan berdasarkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-medium border-none bg-transparent focus:outline-none cursor-pointer"
          >
            <option>Featured</option>
            <option>Rating</option>
            <option>Distance</option>
            <option>Price</option>
          </select>
        </div>
      </div>

      {/* Cafe Cards */}
      <div className="space-y-6">
        {cafes.map((cafe) => (
          <div
            key={cafe.id}
            className="flex gap-4 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Cafe Image */}
            <div className="relative w-56 h-56 flex-shrink-0 rounded-lg overflow-hidden">
              <img src={cafe.image || "/placeholder.svg"} alt={cafe.name} className="w-full h-full object-cover" />
              {cafe.badge && (
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <div className="w-5 h-5 bg-foreground text-background rounded flex items-center justify-center text-xs font-bold">
                    {cafe.rating}
                  </div>
                  <span className="text-xs font-medium">{cafe.badge}</span>
                  <span className="text-xs text-muted-foreground">({cafe.reviews} Google Reviews)</span>
                </div>
              )}
            </div>

            {/* Cafe Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold mb-1">{cafe.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {cafe.location}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Opening Hours</p>
                  <p className="font-medium">{cafe.hours}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Start From</p>
                  <p className="font-medium">{cafe.priceRange}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Kapasitas</p>
                  <p className="font-medium">{cafe.capacity}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {cafe.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-md text-xs">
                    {amenity === "Air Conditioner" && <AirVent className="h-3 w-3" />}
                    {amenity === "Parkir Luas" && <Car className="h-3 w-3" />}
                    {amenity === "Meeting Room" && <Home className="h-3 w-3" />}
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link to see more */}
      <div className="text-right pt-4">
        <a href="#" className="text-sm text-primary hover:underline">
          Lihat cafe lainnya di Batununggal
        </a>
      </div>
    </div>
  )
}
