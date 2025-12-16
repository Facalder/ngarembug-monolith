import {
    Car01Icon,
    FlashIcon,
    Globe02Icon,
    Idea01Icon,
    Mail01Icon,
    MapPinpoint01Icon,
    Mosque01Icon,
    MusicNote01Icon,
    Restaurant01Icon,
    SmartPhone01Icon,
    Tick02Icon,
    Toilet01Icon,
    Wifi01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CafeDetailInfoProps {
    description?: string | null;
    address: string;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    mapLink: string;
    facilities: string[];
}

const facilityIcons: Record<string, typeof Tick02Icon> = {
    // Common mappings (case-insensitive keys for matching)
    wifi: Wifi01Icon,
    "wi-fi": Wifi01Icon,
    ac: Idea01Icon,
    "air conditioner": Idea01Icon,
    parking: Car01Icon,
    parkir: Car01Icon,
    toilet: Toilet01Icon,
    mushola: Mosque01Icon,
    masjid: Mosque01Icon,
    power: FlashIcon,
    stopkontak: FlashIcon,
    music: MusicNote01Icon,
    "live music": MusicNote01Icon,
    makan: Restaurant01Icon,
    "r. makan": Restaurant01Icon,
    restoran: Restaurant01Icon,
};

export function CafeDetailInfo({
    description,
    address,
    phone,
    email,
    website,
    mapLink,
    facilities = [],
}: CafeDetailInfoProps) {
    const getFacilityIcon = (name: string) => {
        if (typeof name !== "string") return Tick02Icon;
        const lowerName = name.toLowerCase();
        for (const key in facilityIcons) {
            if (lowerName.includes(key)) {
                return facilityIcons[key];
            }
        }
        return Tick02Icon; // Fallback
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-10">
            {/* Description & Main Info */}
            <div className="rounded-xl  border bg-card text-card-foreground shadow-sm lg:col-span-2 space-y-8 p-6">
                {/* Description */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Tentang Cafe Ini</h2>
                    <p className="leading-relaxed">
                        {description || "Tidak ada deskripsi tersedia."}
                    </p>
                </section>

                {/* Facilities */}
                {facilities.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Fasilitas</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                            {facilities
                                .filter((f): f is string => typeof f === "string")
                                .map((facility) => {
                                    const Icon = getFacilityIcon(facility);
                                    return (
                                        <div key={facility} className="flex items-center gap-3">
                                            <HugeiconsIcon
                                                icon={Icon}
                                                className="w-5 h-5 text-muted-foreground shrink-0"
                                            />
                                            <span className="text-foreground font-medium capitalize">
                                                {facility}
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
                )}
            </div>

            {/* Sidebar / Contact Info */}
            <div className="space-y-6">
                <div className="rounded-xl  border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 space-y-6">
                        <h3 className="font-semibold text-lg">Informasi Kontak</h3>
                        <div className="space-y-4">
                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <HugeiconsIcon
                                    icon={MapPinpoint01Icon}
                                    className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0"
                                />
                                <span className="text-sm text-foreground">{address}</span>
                            </div>

                            {/* Phone */}
                            {phone && (
                                <div className="flex items-center gap-3">
                                    <HugeiconsIcon
                                        icon={SmartPhone01Icon}
                                        className="w-5 h-5 text-muted-foreground shrink-0"
                                    />
                                    <span className="text-sm text-foreground">{phone}</span>
                                </div>
                            )}

                            {/* Email */}
                            {email && (
                                <div className="flex items-center gap-3">
                                    <HugeiconsIcon
                                        icon={Mail01Icon}
                                        className="w-5 h-5 text-muted-foreground shrink-0"
                                    />
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-sm text-foreground hover:underline truncate"
                                    >
                                        {email}
                                    </a>
                                </div>
                            )}

                            {/* Website */}
                            {website && (
                                <div className="flex items-center gap-3">
                                    <HugeiconsIcon
                                        icon={Globe02Icon}
                                        className="w-5 h-5 text-muted-foreground shrink-0"
                                    />
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-foreground hover:underline truncate"
                                    >
                                        Website
                                    </a>
                                </div>
                            )}

                            <div className="pt-4">
                                <Button asChild className="w-full" variant="outline">
                                    <Link
                                        href={mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Lihat di Google Maps
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
