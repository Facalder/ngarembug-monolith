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
import { cafeFacilities, cafeTerms } from "@/db/schema/junction-table.schema";
import type { CafeQuery, CreateCafe, UpdateCafe } from "@/schemas/cafes.dto";

export const findCafes = cache(async (params: CafeQuery) => {
  const {
    id,
    slug,
    region,
    cafeType,
    priceRange,
    minPrice,
    maxPrice,
    minReviews,
    averageRating,
    minAvgRating,
    orderBy = "created_at",
    orderDir = "desc",
    page = 1,
    limit = 10,
    search,
    contentStatus,
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
    cafeType?.length && inArray(cafes.cafeType, cafeType),
    contentStatus?.length && inArray(cafes.contentStatus, contentStatus),
    priceRange?.length && inArray(cafes.priceRange, priceRange),
    minPrice !== undefined && gte(cafes.pricePerPerson, minPrice),
    maxPrice !== undefined && lte(cafes.pricePerPerson, maxPrice),
    minReviews !== undefined && gte(cafes.totalReviews, minReviews),
    averageRating?.length &&
      inArray(
        sql`FLOOR(${cafes.averageRating})`,
        averageRating.map((r) => {
          switch (r) {
            case "ONE":
              return 1;
            case "TWO":
              return 2;
            case "THREE":
              return 3;
            case "FOUR":
              return 4;
            case "FIVE":
              return 5;
            default:
              return 0;
          }
        }),
      ),
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

export const getCafeById = cache(async (id: string) => {
  const [cafe] = await db.select().from(cafes).where(eq(cafes.id, id));

  if (!cafe) return null;

  const [facilitiesResult, termsResult] = await Promise.all([
    db
      .select({ id: cafeFacilities.facilityId })
      .from(cafeFacilities)
      .where(eq(cafeFacilities.cafeId, id)),
    db
      .select({ id: cafeTerms.termId })
      .from(cafeTerms)
      .where(eq(cafeTerms.cafeId, id)),
  ]);

  return {
    ...cafe,
    facilities: facilitiesResult.map((f) => f.id),
    terms: termsResult.map((t) => t.id),
  };
});

export const createCafe = async (data: CreateCafe) => {
  const { facilities, terms, ...cafeData } = data;

  return await db.transaction(async (tx) => {
    // 1. Create Cafe
    const [newCafe] = await tx
      .insert(cafes)
      .values(cafeData as any)
      .returning();

    // 2. Insert Facilities if any
    if (facilities?.length) {
      await tx.insert(cafeFacilities).values(
        facilities.map((facilityId) => ({
          cafeId: newCafe.id,
          facilityId,
        })),
      );
    }

    // 3. Insert Terms if any
    if (terms?.length) {
      await tx.insert(cafeTerms).values(
        terms.map((termId) => ({
          cafeId: newCafe.id,
          termId,
        })),
      );
    }

    return newCafe;
  });
};

export const updateCafe = async (id: string, data: UpdateCafe) => {
  const { id: _, facilities, terms, ...updateData } = data;

  return await db.transaction(async (tx) => {
    // 1. Update Cafe Details
    const [updatedCafe] = await tx
      .update(cafes)
      .set(updateData as any)
      .where(eq(cafes.id, id))
      .returning();

    // 2. Update Facilities (Delete all & Re-insert)
    if (facilities !== undefined) {
      await tx.delete(cafeFacilities).where(eq(cafeFacilities.cafeId, id));
      if (facilities.length > 0) {
        await tx.insert(cafeFacilities).values(
          facilities.map((facilityId) => ({
            cafeId: id,
            facilityId,
          })),
        );
      }
    }

    // 3. Update Terms (Delete all & Re-insert)
    if (terms !== undefined) {
      await tx.delete(cafeTerms).where(eq(cafeTerms.cafeId, id));
      if (terms.length > 0) {
        await tx.insert(cafeTerms).values(
          terms.map((termId) => ({
            cafeId: id,
            termId,
          })),
        );
      }
    }

    return updatedCafe;
  });
};

export const deleteCafe = async (id: string) => {
  const [deletedCafe] = await db
    .delete(cafes)
    .where(eq(cafes.id, id))
    .returning();
  return deletedCafe;
};
