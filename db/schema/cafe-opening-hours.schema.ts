import { pgTable, smallint, text, time, timestamp } from "drizzle-orm/pg-core";
import { cafes } from "@/db/schema/cafes.schema";
import { createId } from "@/lib/cuid";

const cafeOpeningHoursTable = pgTable.withRLS("cafe_opening_hours", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  cafeId: text("cafe_id")
    .notNull()
    .references(() => cafes.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),

  dayOfWeek: smallint("day_of_week").notNull(),
  openTime: time("open_time").notNull(),
  closeTime: time("close_time").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const cafeOpeningHours = cafeOpeningHoursTable;
