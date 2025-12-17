import { z } from "zod";
import { starRating, visitorType } from "@/db/schema/enums.schema";

export const createReviewSchema = z.object({
  cafeId: z.string().min(1, "Cafe ID wajib diisi"),
  rating: z.enum(starRating.enumValues, {
    message: "Rating wajib dipilih",
  }),
  visitorType: z.enum(visitorType.enumValues, {
    message: "Tipe kunjungan wajib dipilih",
  }),
  review: z.string().min(1, "Review tidak boleh kosong"),
  title: z.string().min(1, "Judul review wajib diisi").max(255),
});

export type CreateReview = z.infer<typeof createReviewSchema>;
