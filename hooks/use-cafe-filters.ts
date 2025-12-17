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
    `/facilities?limit=100&contentStatus=PUBLISHED`,
    fetcher,
  );

  const { data: termsData, isLoading: isTermsLoading } = useSWR(
    `/terms?limit=100&contentStatus=PUBLISHED`,
    fetcher,
  );

  const filters: Filter[] = [
    {
      key: "facilities",
      label: "Fasilitas",
      description: "Pilih fasilitas yang tersedia di kafe",
      options:
        facilitiesData?.data?.map((f: SimpleItem) => ({
          label: f.name,
          value: f.slug,
        })) || [],
    },
    {
      key: "terms",
      label: "Ketentuan",
      description: "Pilih ketentuan yang berlaku di kafe",
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
