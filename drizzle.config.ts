import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema/**",
  out: "../drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
