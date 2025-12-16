"use client";

import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { ClientBreadcrumb } from "@/components/client/client-breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CafeDetailHeaderProps {
    id: string;
    name: string;
    slug: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    area: string;
    type: string;
    thumbnail?: string | null;
    gallery?: string[] | null;
    menu?: string[] | null;
}

export function CafeDetailHeader({
    id,
    name,
    slug,
    rating,
    reviewCount,
    priceRange,
    area,
    type,
    thumbnail,
    gallery = [],
    menu = [],
}: CafeDetailHeaderProps) {
    const breadcrumbItems = [
        { label: area, href: `/search?region=${area}` },
        { label: name, href: `/cafe/${slug}`, active: true },
    ];

    // Priority for side images: Menu -> Gallery
    const sideImages = [...(menu || []), ...(gallery || [])].filter(Boolean);
    const mainImage = thumbnail || sideImages[0] || "/placeholder.svg"; // Fallback

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
                <ClientBreadcrumb items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            {name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base">
                            <div className="flex items-center gap-1.5">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i.toString()}
                                            className={cn(
                                                "w-4 h-4 rounded-full border border-primary",
                                                i < Math.round(rating)
                                                    ? "bg-primary"
                                                    : "bg-transparent",
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="font-bold text-foreground ml-1">{rating.toFixed(1)}</span>
                            </div>

                            <span className="text-foreground underline decoration-dotted underline-offset-4 capitalize font-semibold">
                                {reviewCount} reviews
                            </span>

                            <span className="font-normal text-muted-foreground underline decoration-1 underline-offset-4 capitalize">
                                {(priceRange || "").replace(/_/g, " ").toLowerCase()}
                            </span>


                            <span className="font-normal text-muted-foreground underline decoration-1 underline-offset-4 capitalize">
                                {(type || "").replace(/_/g, " ").toLowerCase()}
                            </span>

                            <span className="font-normal text-muted-foreground underline decoration-1 underline-offset-4 capitalize">
                                {area}
                            </span>
                        </div>
                    </div>

                    <Link href={`/cafe/${slug}/reviews`}>
                        <Button variant='outline'>
                            <HugeiconsIcon icon={PencilEdit02Icon} className="w-4 h-4 mr-2" />
                            Tulis Review
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Image Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[450px] overflow-hidden rounded-md">
                {/* Main Image - Spans 3 columns (or 2 on smaller split) */}
                <div className="md:col-span-3 h-full relative group cursor-pointer bg-muted">
                    <Image
                        src={mainImage}
                        alt={`${name} Main`}
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                        priority
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                        <span className="text-white font-bold text-lg tracking-wide">
                            Interior / Main
                        </span>
                    </div>
                </div>

                {/* Side Column */}
                <div className="hidden md:flex flex-col gap-2 h-full">
                    {/* Top Side Image (Menu/Food) */}
                    <div className="relative flex-1 group cursor-pointer bg-muted overflow-hidden">
                        <Image
                            src={sideImages[0] || "/placeholder.svg"}
                            alt="Menu or Food"
                            fill
                            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/60 to-transparent">
                            <span className="text-white font-semibold text-sm">
                                Menu / Makanan
                            </span>
                        </div>
                    </div>

                    {/* Bottom Side Image (More) */}
                    <div className="relative flex-1 group cursor-pointer bg-muted overflow-hidden">
                        <Image
                            src={sideImages[1] || sideImages[0] || "/placeholder.svg"}
                            alt="Gallery"
                            fill
                            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                            <span className="text-white font-bold text-base border-b border-white pb-0.5">
                                +{sideImages.length > 2 ? sideImages.length - 2 : "Lainnya"}{" "}
                                Foto
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
