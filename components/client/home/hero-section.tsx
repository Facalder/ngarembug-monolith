"use client";

import { Search01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useState } from "react";
import { CafeTypeFilter } from "@/components/client/search/cafe-type-filter";
import { FacilitiesFilter } from "@/components/client/search/facilities-filter";
import { GuestFilter } from "@/components/client/search/guest-filter";
import { LocationFilter } from "@/components/client/search/location-filter";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(1);

  return (
    <section className="relative min-h-[64vh] my-4 flex items-center justify-center ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-md">
        <Image
          src="/images/hero-section.webp"
          alt="Cafe background"
          fill
          className="object-cover bg-center rounded-md"
          priority
        />
        <div className="absolute inset-0 bg-black/40 rounded-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 text-balance">
          Hai kamu, mau rapat dimana?
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 justify-center w-full">
          <LocationFilter
            value={selectedLocation}
            onChange={setSelectedLocation}
          />

          <CafeTypeFilter value={selectedType} onChange={setSelectedType} />

          <FacilitiesFilter
            value={selectedFacilities}
            onChange={setSelectedFacilities}
          />

          <GuestFilter count={guestCount} onChange={setGuestCount} />

          {/* Search Button */}
          <Button className="rounded-full px-6 py-3 text-base font-bold shadow-lg h-auto">
            {/* <Search className="w-4 h-4 mr-2" /> */}
            Cari Cafe
            <HugeiconsIcon icon={Search01FreeIcons} className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
