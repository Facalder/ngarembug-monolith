"use client";

import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Suspense, useState } from "react";
import useSWR from "swr";
import { AreaCafeSection } from "@/components/section/area-cafe-section";
import { CafeSection } from "@/components/section/cafe-section";
import { HeroSection } from "@/components/section/hero-section";
import { PLACEHODER_IMAGE } from "@/globals/globals";
import { fetcher } from "@/lib/swr";
import { useApiQuery } from "@/lib/use-api-query";

function HomeContent() {
  const [selectedArea, setSelectedArea] = useState("SUKAPURA");

  const { data: featuredCafes } = useApiQuery({
    apiEndpoint: "cafes",
    defaults: {
      limit: 3,
      sortKey: "averageRating",
      sortDir: "desc",
    },
    syncWithUrl: false, // Don't sync home page state with URL
  });

  const { data: areaResponse, isLoading: isAreaLoading } = useSWR(
    `/cafes?region=${selectedArea}&limit=6`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  const areaCafes = areaResponse?.data || [];

  return (
    <>
      <HeroSection />

      <CafeSection
        title="Rekomendasi Cafe Terpopuler"
        subtitle="Temukan tempat terbaik untuk nugas, nongkrong, atau sekadar bersantai di sekitar Tel-U."
        location="Bandung"
        cafes={
          featuredCafes?.map((cafe: any) => ({
            id: cafe.id,
            name: cafe.name,
            image: cafe.thumbnail || PLACEHODER_IMAGE,
            rating: cafe.averageRating || 0,
            reviewCount: cafe.reviewCount || 10,
            area: cafe.region?.replace(/_/g, " ") || "Bandung",
            type: cafe.cafeType?.replace(/_/g, " ") || "Cafe",
            distance: "1.2 km", // Mock data as API might not support geo-distance yet
            openingHours: "08:00 - 22:00", // Fallback
            priceRange: "Start 15rb",
            capacity: "50+ Seats",
            facilities: ["Wifi", "AC", "Toilet"], // Fallback or map if available
            slug: cafe.slug,
          })) || []
        }
      />

      <AreaCafeSection
        selectedArea={selectedArea}
        onAreaChange={setSelectedArea}
        isLoading={isAreaLoading}
        cafes={
          areaCafes?.map((cafe: any) => ({
            id: cafe.id,
            name: cafe.name,
            image: cafe.thumbnail || PLACEHODER_IMAGE,
            rating: cafe.averageRating || 0,
            reviewCount: cafe.reviewCount || 10,
            area: cafe.region?.replace(/_/g, " ") || selectedArea,
            category: cafe.cafeType?.replace(/_/g, " ") || "Cafe",
            distance: "0.5km", // Mock
            openingHours: "08:00 - 22:00", // Fallback
            priceRange: cafe.priceRange,
            capacity: `${cafe.capacity || "50+"} orang`,
            facilities:
              cafe.facilities?.map((f: any) => f.name || f.slug) || [],
            slug: cafe.slug,
          })) || []
        }
      />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <HugeiconsIcon
            icon={Loading03Icon}
            className="animate-spin size-8 text-primary"
          />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
