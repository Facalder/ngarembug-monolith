import { defineRelations } from "drizzle-orm";
import { cafeOpeningHours } from "@/db/schema/cafe-opening-hours.schema";
import { cafes } from "@/db/schema/cafes.schema";

const schema = {
  cafes,
  cafeOpeningHours,
};

export const relations = defineRelations(schema, (r) => ({
  cafes: {
    openingHours: r.many.cafeOpeningHours(),
  },

  cafeOpeningHours: {
    cafe: r.one.cafes({
      from: r.cafeOpeningHours.cafeId,
      to: r.cafes.id,
    }),
  },
}));
