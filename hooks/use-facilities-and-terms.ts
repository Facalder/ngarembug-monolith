import useSWR from "swr";
import { fetcher } from "@/lib/swr";

interface FacilityItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000,
};

export function useFacilitiesAndTerms() {
  const { data: facilitiesData } = useSWR(
    `/facilities?limit=100`,
    fetcher,
    SWR_CONFIG,
  );

  const { data: termsData } = useSWR(`/terms?limit=100`, fetcher, SWR_CONFIG);

  return {
    facilitiesData,
    termsData,
  };
}
