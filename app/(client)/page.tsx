import { CafeSection } from "@/components/client/home/cafe-section";
import { HeroSection } from "@/components/client/home/hero-section";
import { findCafes } from "@/repositories/cafes.repositories";

export const dynamic = "force-dynamic"; // Ensure fresh data on navigation

export default async function Home() {
  // Fetch trending cafes (highest rated)
  // @ts-expect-error - 'findCafes' expects all optional fields to be explicitly undefined in strict mode
  const { data: trendingCafes } = await findCafes({
    limit: 6,
    orderBy: "rating",
    orderDir: "desc",
  });

  // Map DB data to UI format
  const mappedCafes = trendingCafes.map((cafe) => {
    // Determine image: thumbnail -> first gallery image -> placeholder
    const image = cafe.thumbnail || (cafe.gallery && cafe.gallery.length > 0 ? cafe.gallery[0] : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop");

    // Format facilities array strings
    const facilities = Array.isArray(cafe.facilities)
      ? cafe.facilities.slice(0, 3).map((f: any) => f.name || f.slug)
      : [];

    return {
      id: cafe.id,
      name: cafe.name,
      image: image || "",
      rating: Number(cafe.averageRating) || 0,
      reviewCount: cafe.totalReviews || 0,
      area: cafe.region, // Can be enhanced with mapping if needed
      type: cafe.cafeType.replace(/_/g, " "), // "INDOOR_CAFE" -> "INDOOR CAFE"
      distance: cafe.distance ? `${cafe.distance}km dari Telkom University` : "Dekat Telkom University",
      openingHours: "08.00 - 22.00 WIB", // Placeholder as not in DB
      priceRange: cafe.priceRange, // e.g. "UNDER_50K"
      capacity: `${cafe.capacity || 0} orang`,
      facilities: facilities,
      slug: cafe.slug, // Pass slug for href construction
    };
  });



  return (
    <>
      <HeroSection />
      <CafeSection
        title="Disukai banget ini sama mahasiswa"
        cafes={mappedCafes}
      />

      <CafeSection
        title="Disukai banget ini sama mahasiswa"
        cafes={mappedCafes}
      />
    </>
  );
}
