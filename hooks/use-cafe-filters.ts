import useSWR from "swr";
import type { Filter } from "@/components/table/table-toolbar";
import { fetcher } from "@/lib/swr";

interface SimpleItem {
  id: string;
  name: string;
  slug: string;
}

export function useCafeTableFilters() {
  const { data: facilitiesData, isLoading: isFacilitiesLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/facilities?limit=100&contentStatus=PUBLISHED`,
    fetcher,
  );

  const { data: termsData, isLoading: isTermsLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/terms?limit=100&contentStatus=PUBLISHED`,
    fetcher,
  );

  const filters: Filter[] = [
    {
      key: "facilities",
      label: "Fasilitas",
      options:
        facilitiesData?.data?.map((f: SimpleItem) => ({
          label: f.name,
          value: f.slug,
        })) || [],
    },
    {
      key: "terms",
      label: "Ketentuan",
      options:
        termsData?.data?.map((t: SimpleItem) => ({
          label: t.name,
          value: t.slug,
        })) || [],
    },
  ];

  return {
    filters,
    isLoading: isFacilitiesLoading || isTermsLoading,
  };
}
