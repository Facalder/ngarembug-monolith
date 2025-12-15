import z from "zod";
import { cafeType, priceRange, region } from "@/db/schema/enums.schema";

import {
  CAFE_TYPE_OPTIONS,
  PRICE_RANGE_OPTIONS,
  REGION_OPTIONS,
} from "@/globals/data-options";

const cafeTypeValues = cafeType.enumValues;
const priceRangeValues = priceRange.enumValues;
const regionValues = region.enumValues;

const REGION_ALIAS = Object.fromEntries(
  REGION_OPTIONS.map((opt) => [opt.alias, opt.value]),
);

const TYPE_ALIAS = Object.fromEntries(
  CAFE_TYPE_OPTIONS.map((opt) => [opt.alias, opt.value]),
);

const PRICE_ALIAS = Object.fromEntries(
  PRICE_RANGE_OPTIONS.map((opt) => [opt.alias, opt.value]),
);

type Region = (typeof REGION_OPTIONS)[number]["value"];
type CafeType = (typeof CAFE_TYPE_OPTIONS)[number]["value"];
type PriceRange = (typeof PRICE_RANGE_OPTIONS)[number]["value"];

const createAliasSchema = <T extends string>(
  validValues: readonly T[],
  aliases: Record<string, T>,
) => {
  return z
    .union([z.string(), z.array(z.string())])
    .transform((val): T[] => {
      const inputs = typeof val === "string" ? val.split("%") : val;

      return inputs
        .map((item) => {
          const lower = item.toLowerCase().trim();
          if (lower in aliases) return aliases[lower];

          const upper = item.toUpperCase().trim();
          if ((validValues as readonly string[]).includes(upper))
            return upper as T;

          return null;
        })
        .filter((val): val is T => val !== null);
    })
    .optional();
};

export const cafeSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .max(100, "Nama maksimal 100 karakter"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .max(120, "Slug maksimal 120 karakter"),
  description: z.string().optional(),

  cafeType: z
    .enum(cafeTypeValues, { message: "Tipe kafe tidak valid" })
    .default("INDOOR_CAFE"),
  region: z.enum(regionValues, { message: "Wilayah tidak valid" }),
  capacity: z.coerce.number().int().min(0, "Kapasitas minimal 0").default(0),
  distance: z.coerce.number().int().min(0, "Jarak minimal 0").optional(),

  mapLink: z.url("Format URL tidak valid"),

  address: z
    .string()
    .min(1, "Alamat wajib diisi")
    .max(255, "Alamat maksimal 255 karakter"),
  phone: z.string().max(20, "Nomor telepon maksimal 20 karakter").optional(),
  email: z.string().email("Format email tidak valid").max(100).optional(),
  website: z.string().url("Format URL tidak valid").max(255).optional(),

  priceRange: z.enum(priceRangeValues, {
    message: "Rentang harga tidak valid",
  }),
  pricePerPerson: z.coerce.number().int().min(0, "Harga minimal 0").default(0),
});

export const cafeQuerySchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  search: z.string().optional(),

  region: createAliasSchema<Region>(
    regionValues as unknown as Region[],
    REGION_ALIAS,
  ),

  types: createAliasSchema<CafeType>(
    cafeTypeValues as unknown as CafeType[],
    TYPE_ALIAS,
  ),

  priceRange: createAliasSchema<PriceRange>(
    priceRangeValues as unknown as PriceRange[],
    PRICE_ALIAS,
  ),
  minPrice: z.coerce.number().min(0, "Min price must be at least 0").optional(),
  maxPrice: z.coerce.number().min(0, "Max price must be at least 0").optional(),

  minReviews: z.coerce
    .number()
    .min(0, "Min reviews must be at least 0")
    .optional(),
  minAvgRating: z.coerce
    .number()
    .min(0)
    .max(5, "Rating must be between 0 and 5")
    .optional(),

  maxDistance: z.coerce
    .number()
    .min(0, "Max distance must be at least 0")
    .optional(),

  orderBy: z
    .enum([
      "name",
      "price",
      "rating",
      "reviews",
      "distance",
      "capacity",
      "created_at",
      "updated_at",
    ])
    .optional(),
  orderDir: z.enum(["asc", "desc"]).optional(),

  page: z.coerce.number().min(1, "Page must be at least 1").default(1),
  limit: z.coerce
    .number()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit must be at most 100")
    .default(10),
});

export const cafeWithHoursSchema = cafeSchema.extend({
  openingTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Format waktu tidak valid (HH:MM)"),
  closingTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Format waktu tidak valid (HH:MM)"),
});

export const createCafeSchema = cafeSchema;
export const updateCafeSchema = cafeSchema.partial();

export type Cafe = z.infer<typeof cafeSchema>;
export type CafeQuery = z.infer<typeof cafeQuerySchema>;
export type CreateCafe = z.infer<typeof createCafeSchema>;
export type UpdateCafe = z.infer<typeof updateCafeSchema>;
