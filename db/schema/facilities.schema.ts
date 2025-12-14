import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@/lib/cuid";

const facilitiesTable = pgTable.withRLS("facilities", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),

  name: varchar("name", { length: 60 }).notNull().unique(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  description: text("description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const facilities = facilitiesTable;
