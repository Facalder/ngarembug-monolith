import z from "zod";

export const facilitySchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .max(60, "Nama maksimal 60 karakter"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .max(80, "Slug maksimal 80 karakter"),
  description: z.string().optional(),
});

export const facilityQuerySchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),

  keyword: z.string().optional(),

  orderBy: z.enum(["name", "created_at", "updated_at"]).optional(),
  orderDir: z.enum(["asc", "desc"]).optional(),

  page: z.coerce.number().min(1, "Page must be at least 1").default(1),
  limit: z.coerce
    .number()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit must be at most 100")
    .default(10),
});

export const createFacilitySchema = facilitySchema;
export const updateFacilitySchema = facilitySchema.partial();

export type Facility = z.infer<typeof facilitySchema>;
export type FacilityQuery = z.infer<typeof facilityQuerySchema>;
export type CreateFacility = z.infer<typeof createFacilitySchema>;
export type UpdateFacility = z.infer<typeof updateFacilitySchema>;
