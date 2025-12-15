"use server";

import {
  and,
  asc,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lte,
  or,
  type SQL,
  sql,
} from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { cafes } from "@/db/schema/cafes.schema";
import type { CafeQuery } from "@/schemas/cafes.dto";

export const findCafes = cache(async (params: CafeQuery) => {
  const {
    id,
    slug,
    region,
    types,
    priceRange,
    minPrice,
    maxPrice,
    minReviews,
    minAvgRating,
    orderBy = "created_at",
    orderDir = "desc",
    page = 1,
    limit = 10,
    search,
  } = params;

  const conditions = [
    search &&
      or(
        ilike(cafes.name, `%${search}%`),
        ilike(cafes.description, `%${search}%`),
      ),
    id && eq(cafes.id, id),
    slug && eq(cafes.slug, slug),
    region?.length && inArray(cafes.region, region),
    types?.length && inArray(cafes.cafeType, types),
    priceRange?.length && inArray(cafes.priceRange, priceRange),
    minPrice !== undefined && gte(cafes.pricePerPerson, minPrice),
    maxPrice !== undefined && lte(cafes.pricePerPerson, maxPrice),
    minReviews !== undefined && gte(cafes.totalReviews, minReviews),
    minAvgRating !== undefined && gte(cafes.averageRating, minAvgRating),
  ].filter(Boolean) as SQL[];

  const orderCol = {
    name: cafes.name,
    price: cafes.pricePerPerson,
    rating: cafes.averageRating,
    reviews: cafes.totalReviews,
    capacity: cafes.capacity,
    distance: cafes.distance,
    created_at: cafes.createdAt,
    updated_at: cafes.updatedAt,
  }[orderBy];

  const data = await db
    .select()
    .from(cafes)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(orderDir === "asc" ? asc(orderCol) : desc(orderCol))
    .limit(limit)
    .offset((page - 1) * limit);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(cafes)
    .where(conditions.length ? and(...conditions) : undefined);

  return {
    data,
    pagination: {
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    },
  };
});
