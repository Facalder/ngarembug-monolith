ALTER TABLE "cafes" ALTER COLUMN "region" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "Region";--> statement-breakpoint
CREATE TYPE "Region" AS ENUM('SUKABIRUS', 'SUKAPURA', 'BATUNUNGGAL', 'BUAH BATU', 'DAYEUH_KOLOT', 'CIGANITRI');--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "region" SET DATA TYPE "Region" USING "region"::"Region";