
import { notFound } from "next/navigation"
import { findCafes } from "@/repositories/cafes.repositories"
import { CafeDetailHeader } from "@/components/client/cafe-detail/cafe-detail-header"

export const dynamic = "force-dynamic"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function CafeDetailPage({ params }: PageProps) {
    const { slug } = await params
    console.log("CafeDetailPage slug:", slug)

    // @ts-expect-error - findCafes optional strict check
    const { data } = await findCafes({ slug, limit: 1 })
    const cafe = data[0]
    console.log("CafeDetailPage found:", cafe?.name)

    if (!cafe) {
        console.log("Cafe not found, returning 404")
        notFound()
    }

    return (
        <CafeDetailHeader
            id={cafe.id}
            name={cafe.name}
            slug={cafe.slug}
            rating={Number(cafe.averageRating) || 0}
            reviewCount={cafe.totalReviews || 0}
            area={cafe.region}
            type={cafe.cafeType}
            priceRange={cafe.priceRange}
            thumbnail={cafe.thumbnail}
            gallery={cafe.gallery}
            menu={cafe.menu}
        />
    )
}