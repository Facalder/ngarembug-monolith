import { pgEnum } from "drizzle-orm/pg-core";

export const contentStatus = pgEnum("ContentStatus", [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);
export const priceRange = pgEnum("PriceRange", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "PREMIUM",
]);
export const cafeType = pgEnum("CafeType", ["INDOOR_CAFE", "OUTDOOR_CAFE"]);
export const region = pgEnum("Region", [
  "SUKABIRUS",
  "SUKAPURA",
  "BATUNUNGGAL",
  "BUAH BATU",
  "DAYEUH_KOLOT",
  "CIGANITRI",
  "BOJONGSOANG",
]);
export const reviewStatus = pgEnum("ReviewStatus", [
  "APPROVED",
  "REJECTED",
  "PENDING",
]);
export const starRating = pgEnum("StarRating", [
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
]);
export const visitorType = pgEnum("VisitorType", [
  "FAMILY",
  "COUPLE",
  "SOLO",
  "BUSINESS",
  "FRIENDS",
]);
