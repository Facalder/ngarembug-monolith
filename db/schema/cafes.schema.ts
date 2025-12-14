import {
  integer,
  numeric,
  pgTable,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { cafeType, priceRange, region } from "@/db/schema/enums.schema";

import { createId } from "@/lib/cuid";

const cafesTable = pgTable.withRLS("cafes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),

  cafeType: cafeType("cafe_type").notNull().default("INDOOR_CAFE"),
  region: region("region").notNull(),
  capacity: smallint("capacity").notNull().default(0),
  distance: smallint("distance").default(0), // Jarak dari Telkom University

  address: varchar("address", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 100 }),
  website: varchar("website", { length: 255 }),

  priceRange: priceRange("price_range").notNull(),
  pricePerPerson: integer("price_per_person").notNull().default(0),

  averageRating: numeric("average_rating", {
    precision: 3,
    scale: 2,
    mode: "number",
  })
    .default(0)
    .notNull(),
  totalReviews: integer("total_reviews").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const cafes = cafesTable;
