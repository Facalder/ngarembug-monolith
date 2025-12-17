export const CONTENT_STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft", alias: "dft" },
  { value: "PUBLISHED", label: "Dipublikasikan", alias: "pub" },
  { value: "ARCHIVED", label: "Diarsipkan", alias: "arc" },
] as const;

export const PRICE_RANGE_OPTIONS = [
  { value: "LOW", label: "Murah", alias: "low" },
  { value: "MEDIUM", label: "Sedang", alias: "mid" },
  { value: "HIGH", label: "Mahal", alias: "high" },
  { value: "PREMIUM", label: "Premium", alias: "prem" },
] as const;

export const CAFE_TYPE_OPTIONS = [
  { value: "INDOOR_CAFE", label: "Indoor", alias: "in" },
  { value: "OUTDOOR_CAFE", label: "Outdoor", alias: "out" },
  { value: "INDOOR_OUTDOOR_CAFE", label: "Indoor & Outdoor", alias: "io" },
] as const;

export const REGION_OPTIONS = [
  { value: "SUKABIRUS", label: "Sukabirus", alias: "skb" },
  { value: "SUKAPURA", label: "Sukapura", alias: "skp" },
  { value: "BATUNUNGGAL", label: "Batununggal", alias: "btn" },
  { value: "BUAH BATU", label: "Buah Batu", alias: "bbt" },
  { value: "DAYEUH_KOLOT", label: "Dayeuh Kolot", alias: "dyk" },
  { value: "CIGANITRI", label: "Ciganitri", alias: "cgn" },
  { value: "CIJAGRA", label: "Cijagra", alias: "cjg" },
  { value: "BOJONGSOANG", label: "Bojongsoang", alias: "bjs" },
] as const;

export const REVIEW_STATUS_OPTIONS = [
  { value: "APPROVED", label: "Disetujui", alias: "app" },
  { value: "REJECTED", label: "Ditolak", alias: "rej" },
  { value: "PENDING", label: "Menunggu", alias: "pen" },
] as const;

export const STAR_RATING_OPTIONS = [
  { value: "ONE", label: "1 Bintang", alias: "1" },
  { value: "TWO", label: "2 Bintang", alias: "2" },
  { value: "THREE", label: "3 Bintang", alias: "3" },
  { value: "FOUR", label: "4 Bintang", alias: "4" },
  { value: "FIVE", label: "5 Bintang", alias: "5" },
] as const;

export const VISITOR_TYPE_OPTIONS = [
  { value: "FAMILY", label: "Keluarga", alias: "fam" },
  { value: "COUPLE", label: "Pasangan", alias: "cpl" },
  { value: "SOLO", label: "Sendiri", alias: "sol" },
  { value: "BUSINESS", label: "Bisnis", alias: "bus" },
  { value: "FRIENDS", label: "Teman", alias: "frn" },
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
