import { defineRelations } from "drizzle-orm";
import { cafeOpeningHours } from "@/db/schema/cafe-opening-hours.schema";
import { cafes } from "@/db/schema/cafes.schema";
import { facilities } from "@/db/schema/facilities.schema";
import { cafeFacilities, cafeTerms } from "@/db/schema/junction-table.schema";
import { terms } from "@/db/schema/terms.schema";

const schema = {
  cafes,
  cafeOpeningHours,
  facilities,
  terms,
  cafeFacilities,
  cafeTerms,
};

export const relations = defineRelations(schema, (r) => ({
  cafes: {
    openingHours: r.many.cafeOpeningHours(),
    cafeFacilities: r.many.cafeFacilities(),
    cafeTerms: r.many.cafeTerms(),
  },

  cafeOpeningHours: {
    cafe: r.one.cafes({
      from: r.cafeOpeningHours.cafeId,
      to: r.cafes.id,
    }),
  },

  facilities: {
    cafeFacilities: r.many.cafeFacilities(),
  },

  terms: {
    cafeTerms: r.many.cafeTerms(),
  },

  cafeFacilities: {
    cafe: r.one.cafes({
      from: r.cafeFacilities.cafeId,
      to: r.cafes.id,
    }),
    facility: r.one.facilities({
      from: r.cafeFacilities.facilityId,
      to: r.facilities.id,
    }),
  },

  cafeTerms: {
    cafe: r.one.cafes({
      from: r.cafeTerms.cafeId,
      to: r.cafes.id,
    }),
    term: r.one.terms({
      from: r.cafeTerms.termId,
      to: r.terms.id,
    }),
  },
}));
