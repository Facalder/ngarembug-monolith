"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CafeCard } from "@/components/client/card/cafe-card";
import { SearchFilter } from "@/components/client/search/search-filter";
import { SearchHeader } from "@/components/client/search/search-header";
import { Container } from "@/components/container-layout";

// Mock data (replace with actual fetch later)
const MOCK_CAFES = [
    {
        name: "Kopi Nako Bandung",
        slug: "kopi-nako-bandung",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
        rating: 4.5,
        reviewCount: 128,
        area: "Sukapura",
        category: "Coffee Shop",
        distance: "1.2 km",
        openingHours: "08:00 - 22:00",
        priceRange: "Rp 20.000 - Rp 50.000",
        capacity: "100+ Orang",
        facilities: ["Wifi", "AC", "Outdoor Area", "Musholla"],
    },
    {
        name: "Sejiwa Coffee",
        slug: "sejiwa-coffee",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf",
        rating: 4.8,
        reviewCount: 342,
        area: "Buah Batu",
        category: "Coffee & Eatery",
        distance: "2.5 km",
        openingHours: "07:00 - 23:00",
        priceRange: "Rp 30.000 - Rp 75.000",
        capacity: "50-100 Orang",
        facilities: ["Wifi", "Meeting Room", "Parkir Luas"],
    },
    // Add more mocks to visualize list
    {
        name: "Jurnal Risa Coffee",
        slug: "jurnal-risa-coffee",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        rating: 4.7,
        reviewCount: 205,
        area: "Batununggal",
        category: "Cafe",
        distance: "3.0 km",
        openingHours: "09:00 - 22:00",
        priceRange: "Rp 25.000 - Rp 60.000",
        capacity: "100+ Orang",
        facilities: ["Wifi", "AC", "Live Music"],
    },
];

function SearchContent() {
    return (
        <div className="flex flex-col gap-8 pb-20">
            <SearchHeader />
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
                {/* Left: Filters */}
                <aside className="hidden md:block">
                    <SearchFilter />
                </aside>

                {/* Right: Results */}
                <div className="flex flex-col gap-6">
                    {MOCK_CAFES.map((cafe) => (
                        <CafeCard
                            key={cafe.slug}
                            href={`/cafe/${cafe.slug}`}
                            orientation="horizontal"
                            {...cafe}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="h-screen" />}>
            <SearchContent />
        </Suspense>
    );
}
