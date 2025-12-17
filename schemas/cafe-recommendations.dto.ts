import { z } from "zod";
import { cafeType } from "@/db/schema/enums.schema";

export const createRecommendationSchema = z.object({
  name: z.string().min(1, "Nama kafe wajib diisi").max(100),
  address: z.string().min(1, "Alamat wajib diisi"),
  cafeType: z.enum(cafeType.enumValues, {
    message: "Tipe kafe wajib dipilih",
  }),
});

export type CreateRecommendation = z.infer<typeof createRecommendationSchema>;
