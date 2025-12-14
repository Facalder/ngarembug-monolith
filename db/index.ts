import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL as string;

if (connectionString.length < 0)
  throw new Error("DB connection string is empty");

export const client = postgres(connectionString, {
  prepare: false,
  idle_timeout: 20,
  max: 1,
  connect_timeout: 10,
});

export const db = drizzle({ client });
