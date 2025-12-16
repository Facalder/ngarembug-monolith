import { defineRelations } from "drizzle-orm";
import { accounts } from "@/db/schema/accounts.schema";
import { cafeOpeningHours } from "@/db/schema/cafe-opening-hours.schema";
import { cafes } from "@/db/schema/cafes.schema";
import { sessions } from "@/db/schema/sessions.schema";
import { users } from "@/db/schema/users.schema";
import { verifications } from "@/db/schema/verifications.schema";

const schema = {
  cafes,
  cafeOpeningHours,
  users,
  verifications,
  sessions,
  accounts,
};

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions(),
    accounts: r.many.accounts(),
  },

  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },

  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
}));
