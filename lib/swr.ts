import type { SWRConfiguration } from "swr";
import { authClient } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
const buildUrl = (path: string) => {
  if (path.startsWith("http")) return path;

  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // Fix double API prefix issue if BASE_URL already contains the path prefix
  if (cleanBase.endsWith("/api/v1") && cleanPath.startsWith("/api/v1")) {
    return `${cleanBase.slice(0, -"/api/v1".length)}${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
};

export const fetcher = async (url: string) => {
  const fullUrl = buildUrl(url);
  const session = await authClient.getSession();

  const res = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${session.data?.session.token}`,
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
  { arg }: { arg: { method: string; body?: Record<string, unknown> } },
) => {
  const fullUrl = buildUrl(url);
  const session = await authClient.getSession();

  const res = await fetch(fullUrl, {
    method: arg.method,
    headers: {
      Authorization: `Bearer ${session.data?.session.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.error ||
      (errorData.details
        ? JSON.stringify(errorData.details)
        : "Terjadi kesalahan saat memproses permintaan.");
    throw new Error(errorMessage);
  }

  return res.json();
};

export const uploadFetcher = async (
  url: string,
  { arg }: { arg: { method: string; body: FormData } },
) => {
  const fullUrl = buildUrl(url);
  const session = await authClient.getSession();

  const res = await fetch(fullUrl, {
    method: arg.method,
    headers: {
      Authorization: `Bearer ${session.data?.session.token}`,
      // Content-Type is irrelevant for FormData as the browser sets it automatically with boundary
    },
    body: arg.body,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error || "Terjadi kesalahan saat mengunggah file.",
    );
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
