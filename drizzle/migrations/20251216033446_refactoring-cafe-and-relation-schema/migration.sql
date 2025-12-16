DROP TABLE "cafe_facilities";--> statement-breakpoint
DROP TABLE "cafe_terms";--> statement-breakpoint
ALTER TABLE "cafes" ADD COLUMN "facilities" jsonb DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE "cafes" ADD COLUMN "terms" jsonb DEFAULT '[]' NOT NULL;