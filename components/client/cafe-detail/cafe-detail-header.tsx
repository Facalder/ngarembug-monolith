"use client";

import {
    MapPinpoint01FreeIcons,
    PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { ClientBreadcrumb } from "@/components/client/client-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CafeDetailHeaderProps {
    id: string;
    name: string;
    slug: string;
    description?: string;
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
    description,
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
        <div className="space-y-4 my-4">
            {/* Header Section */}
            <div className="space-y-6">
                <ClientBreadcrumb items={breadcrumbItems} />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                    <div className="space-y-3">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            {name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base">
                            <Badge variant='outline' className="capitalize">{type.replace(/_/g, " ").toLowerCase()}</Badge>

                            <div className="flex items-center gap-1.5">
                                <span>{rating.toFixed(1)}</span>
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

                                <span className="underline">({reviewCount} reviews)</span>
                            </div>

                            <div className="flex gap-1 font-normal text-muted-foreground items-center">
                                <HugeiconsIcon
                                    icon={MapPinpoint01FreeIcons}
                                    className="size-4"
                                />
                                <span className=" capitalize">
                                    {area.replace(/_/g, " ").toLowerCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Link href={`/cafe/${slug}/reviews`}>
                        <Button variant="outline" size="lg">
                            <HugeiconsIcon icon={PencilEdit02Icon} className="w-4 h-4 mr-2" />
                            Tulis Review
                        </Button>
                    </Link>
                </div>

                {/* Image Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[450px] overflow-hidden rounded-md">
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

                    <div className="hidden md:flex flex-col gap-2 h-full">
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
        </div>
    );
}
