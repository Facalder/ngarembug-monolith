import { notFound } from "next/navigation";
import { CafeDetailHeader } from "@/components/client/cafe-detail/cafe-detail-header";
import { CafeDetailInfo } from "@/components/client/cafe-detail/cafe-detail-info";
import { findCafes } from "@/repositories/cafes.repositories";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CafeDetailPage({ params }: PageProps) {
    const { slug } = await params;
    console.log("CafeDetailPage slug:", slug);

    // @ts-expect-error - findCafes optional strict check
    const { data } = await findCafes({ slug, limit: 1 });
    const cafe = data[0];
    console.log("CafeDetailPage found:", cafe?.name);

    if (!cafe) {
        console.log("Cafe not found, returning 404");
        notFound();
    }

    return (
        <div className="space-y-8">
            <CafeDetailHeader
                id={cafe.id}
                name={cafe.name}
                slug={cafe.slug}
                description={cafe.description as string}
                rating={Number(cafe.averageRating) || 0}
                reviewCount={cafe.totalReviews || 0}
                area={cafe.region}
                type={cafe.cafeType}
                priceRange={cafe.priceRange}
                thumbnail={cafe.thumbnail}
                gallery={cafe.gallery}
                menu={cafe.menu}
            />
            <CafeDetailInfo
                description={cafe.description}
                address={cafe.address}
                phone={cafe.phone}
                email={cafe.email}
                website={cafe.website}
                mapLink={cafe.mapLink}
                facilities={cafe.facilities as string[]}
            />
        </div>
    );
}
