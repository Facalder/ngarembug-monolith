"use server";

import { db } from "@/db";
import { cafeRecommendations } from "@/db/schema/cafe-recommendations.schema";
import type { CreateRecommendation } from "@/schemas/cafe-recommendations.dto";

export const createRecommendation = async (
  userId: string,
  data: CreateRecommendation,
) => {
  const [recommendation] = await db
    .insert(cafeRecommendations)
    .values({
      ...data,
      userId,
    })
    .returning();
  return recommendation;
};
