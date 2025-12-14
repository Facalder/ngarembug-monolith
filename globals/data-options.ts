export const CONTENT_STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Terpublish" },
  { value: "ARCHIVED", label: "Arsip" },
] as const;

export const PRICE_RANGE_OPTIONS = [
  { value: "LOW", label: "Murah" },
  { value: "MEDIUM", label: "Sedang" },
  { value: "HIGH", label: "Mahal" },
  { value: "PREMIUM", label: "Premium" },
] as const;

export const CAFE_TYPE_OPTIONS = [
  { value: "INDOOR_CAFE", label: "Cafe Indoor" },
  { value: "OUTDOOR_CAFE", label: "Cafe Outdoor" },
] as const;

export const REGION_OPTIONS = [
  { value: "SUKABIRUS", label: "Sukabirus" },
  { value: "SUKAPURA", label: "Sukapura" },
  { value: "BATUNUNGGAL", label: "Batununggal" },
  { value: "BUAH BATU", label: "Buah Batu" },
  { value: "DAYEUH KOLOT", label: "Dayeuh Kolot" },
  { value: "CIGANITRI", label: "Ciganitri" },
] as const;

export const REVIEW_STATUS_OPTIONS = [
  { value: "APPROVED", label: "Disetujui" },
  { value: "REJECTED", label: "Ditolak" },
  { value: "PENDING", label: "Menunggu" },
] as const;

export const STAR_RATING_OPTIONS = [
  { value: "ONE", label: "1 Bintang" },
  { value: "TWO", label: "2 Bintang" },
  { value: "THREE", label: "3 Bintang" },
  { value: "FOUR", label: "4 Bintang" },
  { value: "FIVE", label: "5 Bintang" },
] as const;

export const VISITOR_TYPE_OPTIONS = [
  { value: "FAMILY", label: "Keluarga" },
  { value: "COUPLE", label: "Pasangan" },
  { value: "SOLO", label: "Sendiri" },
  { value: "BUSINESS", label: "Bisnis" },
  { value: "FRIENDS", label: "Teman" },
] as const;

export const DAYS_OPTIONS = [
  { value: 0, label: "Minggu" },
  { value: 1, label: "Senin" },
  { value: 2, label: "Selasa" },
  { value: 3, label: "Rabu" },
  { value: 4, label: "Kamis" },
  { value: 5, label: "Jumat" },
  { value: 6, label: "Sabtu" },
] as const;
