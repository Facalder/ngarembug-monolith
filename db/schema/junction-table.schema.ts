import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { cafes } from "@/db/schema/cafes.schema";
import { facilities } from "@/db/schema/facilities.schema";
import { terms } from "@/db/schema/terms.schema";

export const cafeFacilities = pgTable.withRLS(
  "cafe_facilities",
  {
    cafeId: text("cafe_id")
      .notNull()
      .references(() => cafes.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
    facilityId: text("facility_id")
      .notNull()
      .references(() => facilities.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.cafeId, table.facilityId] })],
);

export const cafeTerms = pgTable.withRLS(
  "cafe_terms",
  {
    cafeId: text("cafe_id")
      .notNull()
      .references(() => cafes.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
    termId: text("term_id")
      .notNull()
      .references(() => terms.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.cafeId, table.termId] })],
);
