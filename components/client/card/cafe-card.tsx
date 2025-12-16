import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CafeCardProps {
    href: string;
    image: string;
    rating: number;
    reviewCount: number;
    name: string;
    area: string;
    category: string;
    distance: string;
    openingHours: string;
    priceRange: string;
    capacity: string; // Changed to string to match "6-12 orang"
    facilities: string[];
}

const CafeCardComponent = ({
    href,
    image,
    rating,
    reviewCount,
    name,
    area,
    category,
    distance,
    openingHours,
    priceRange,
    capacity,
    facilities,
}: CafeCardProps) => {
    return (
        <Link href={href} className="block group">
            <Card className="ring-0 p-0 gap-0 bg-transparent outline-none shadow-none rounded-none">
                {/* Image Section */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-md mb-3">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={false}
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-2">
                    {/* Rating & Status */}
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="flex items-center justify-center bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px]">
                            {rating.toFixed(1)}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                            Approved
                        </span>
                        <span className="text-xs text-muted-foreground">
                            ({reviewCount} Google Reviews)
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold tracking-tight text-foreground leading-tight group-hover:text-primary group-hover:underline transition-colors line-clamp-1">
                        {name}
                    </h3>

                    {/* Metadata: Area • Category • Distance */}
                    <div className="text-sm text-muted-foreground mb-4">
                        {area} • {category} • {distance}
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">Opening Hours</span>
                            <span className="text-sm font-semibold text-foreground truncate">{openingHours}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">Start From</span>
                            <span className="text-sm font-semibold text-foreground truncate">{priceRange}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">Kapasitas</span>
                            <span className="text-sm font-semibold text-foreground truncate">{capacity}</span>
                        </div>
                    </div>

                    {/* Facilities */}
                    {facilities.length > 0 && (
                        <div className="flex items-center flex-wrap gap-2">
                            {facilities.slice(0, 3).map((facility, index) => (
                                <Badge
                                    key={index}
                                    variant='secondary'
                                    className="px-2 py-3"
                                >
                                    {/* Placeholder icon logic - ideally mapped to facility type */}
                                    {/* <HugeiconsIcon icon={AiGenerativeIcon} className="w-3 h-3" /> */}
                                    {facility}
                                </Badge>
                            ))}
                            {facilities.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{facilities.length - 3} more</span>
                            )}
                        </div>
                    )}

                </div>
            </Card>
        </Link>
    );
};

export const CafeCard = memo(CafeCardComponent);
