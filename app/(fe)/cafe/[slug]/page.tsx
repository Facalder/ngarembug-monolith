import {
    Call02Icon,
    Clock01Icon,
    Globe02Icon,
    Location01Icon,
    Money03Icon,
    Share08Icon,
    StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { notFound } from "next/navigation";
import { ReviewModal } from "@/components/modal/review-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { findCafes } from "@/repositories/cafes.repositories";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CafeDetailPage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch cafe by slug
    const { data } = await findCafes({
        slug,
        limit: 1,
        region: undefined,
        cafeType: undefined,
        priceRange: undefined,
        averageRating: undefined,
        facilities: undefined,
        terms: undefined,
        contentStatus: undefined,
        page: 1,
    });
    const cafe = data[0];

    if (!cafe) {
        notFound();
    }

    // Helper to format currency/price if needed, for new just string
    const facilities = (cafe.facilities as any[]) || [];
    const terms = (cafe.terms as any[]) || [];

    return (
        <div className="min-h-screen pb-20">
            {/* Hero / Gallery Section */}
            <div className="relative h-[50vh] w-full bg-muted">
                {cafe.thumbnail ? (
                    <ResponsiveImage
                        src={cafe.thumbnail}
                        alt={cafe.name}
                        className="h-full w-full"
                        imageClassName="object-cover"
                        priority
                        fill
                        sizes="100vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground text-lg">
                        No Photos Available
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full container mx-auto">
                    <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                        {cafe.cafeType.replace(/_/g, " ")}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{cafe.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-90">
                        <div className="flex items-center gap-1">
                            <HugeiconsIcon icon={Location01Icon} className="h-5 w-5" />
                            {cafe.address}
                        </div>
                        <div className="flex items-center gap-1">
                            <HugeiconsIcon
                                icon={StarIcon}
                                className="h-5 w-5 text-yellow-400 fill-yellow-400"
                            />
                            {cafe.averageRating} ({cafe.totalReviews} reviews)
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 grid gap-8 md:grid-cols-[2fr_1fr]">
                {/* Main Content */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <div className="prose max-w-none text-muted-foreground">
                            <p>{cafe.description || "No description provided."}</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                        {facilities.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {facilities.map((facility: any, idx: number) => (
                                    <Badge
                                        key={idx.toString()}
                                        variant="secondary"
                                        className="px-3 py-1 text-sm"
                                    >
                                        {facility.name || facility.slug}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic">
                                No facilities listed.
                            </p>
                        )}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                        <div className="rounded-lg border border-dashed p-8 text-center bg-muted/30">
                            <p className="text-muted-foreground mb-4">
                                Belum ada review. Jadilah yang pertama mereview!
                            </p>
                            <ReviewModal cafeId={cafe.id} />
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4 sticky top-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Information</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <HugeiconsIcon
                                    icon={Clock01Icon}
                                    className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                                />
                                <div>
                                    <p className="font-medium">Opening Hours</p>
                                    <p className="text-muted-foreground">
                                        08:00 - 22:00 (Placeholder)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <HugeiconsIcon
                                    icon={Money03Icon}
                                    className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                                />
                                <div>
                                    <p className="font-medium">Price Range</p>
                                    <p className="text-muted-foreground">
                                        {cafe.priceRange} (~Rp{" "}
                                        {cafe.pricePerPerson.toLocaleString()})
                                    </p>
                                </div>
                            </div>

                            {cafe.website && (
                                <div className="flex items-start gap-3">
                                    <HugeiconsIcon
                                        icon={Globe02Icon}
                                        className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                                    />
                                    <a
                                        href={cafe.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline truncate w-full"
                                    >
                                        Website
                                    </a>
                                </div>
                            )}

                            {cafe.phone && (
                                <div className="flex items-start gap-3">
                                    <HugeiconsIcon
                                        icon={Call02Icon}
                                        className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
                                    />
                                    <a href={`tel:${cafe.phone}`} className="hover:underline">
                                        {cafe.phone}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 flex flex-col gap-2">
                            {cafe.mapLink && (
                                <Button className="w-full" asChild>
                                    <a
                                        href={cafe.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <HugeiconsIcon
                                            icon={Location01Icon}
                                            className="mr-2 h-4 w-4"
                                        />
                                        Get Directions
                                    </a>
                                </Button>
                            )}
                            <Button variant="outline" className="w-full">
                                <HugeiconsIcon icon={Share08Icon} className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
