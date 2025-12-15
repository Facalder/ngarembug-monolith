import type { SWRConfiguration } from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "";

export const fetcher = async (url: string) => {
  // Check if url is already absolute
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  
  const res = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Terjadi kesalahan saat memproses permintaan.");
  }

  return res.json();
};

export const mutationFetcher = async (
  url: string,
  { arg }: { arg: { method: string; body?: Record<string, unknown> } }
) => {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const res = await fetch(fullUrl, {
    method: arg.method,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.body),
  });

  if (!res.ok) {
    throw new Error("Terjadi kesalahan saat memproses permintaan.");
  }

  return res.json();
};

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  shouldRetryOnError: false,
  dedupingInterval: 60000,
  keepPreviousData: true,
};
