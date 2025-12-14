CREATE TYPE "CafeType" AS ENUM('INDOOR_CAFE', 'OUTDOOR_CAFE');--> statement-breakpoint
CREATE TYPE "ContentStatus" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "PriceRange" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'PREMIUM');--> statement-breakpoint
CREATE TYPE "Region" AS ENUM('SUKABIRUS', 'SUKAPURA', 'BATUNUNGGAL', 'BUAH BATU', 'DAYEUH KOLOT', 'CIGANITRI');--> statement-breakpoint
CREATE TYPE "ReviewStatus" AS ENUM('APPROVED', 'REJECTED', 'PENDING');--> statement-breakpoint
CREATE TYPE "StarRating" AS ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');--> statement-breakpoint
CREATE TYPE "VisitorType" AS ENUM('FAMILY', 'COUPLE', 'SOLO', 'BUSINESS', 'FRIENDS');--> statement-breakpoint
CREATE TABLE "cafe_opening_hours" (
	"id" text PRIMARY KEY,
	"cafe_id" text NOT NULL,
	"day_of_week" smallint NOT NULL,
	"open_time" time NOT NULL,
	"close_time" time NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cafe_opening_hours" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cafes" (
	"id" text PRIMARY KEY,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL UNIQUE,
	"description" text,
	"cafe_type" "CafeType" DEFAULT 'INDOOR_CAFE'::"CafeType" NOT NULL,
	"region" "Region" NOT NULL,
	"capacity" smallint DEFAULT 0 NOT NULL,
	"distance" smallint DEFAULT 0,
	"address" varchar(255) NOT NULL,
	"phone" varchar(20),
	"email" varchar(100),
	"website" varchar(255),
	"price_range" "PriceRange" NOT NULL,
	"price_per_person" integer DEFAULT 0 NOT NULL,
	"average_rating" numeric(3,2) DEFAULT '0' NOT NULL,
	"total_reviews" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cafes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "facilities" (
	"id" text PRIMARY KEY,
	"name" varchar(60) NOT NULL UNIQUE,
	"slug" varchar(80) NOT NULL UNIQUE,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "facilities" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cafe_facilities" (
	"cafe_id" text,
	"facility_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cafe_facilities_pkey" PRIMARY KEY("cafe_id","facility_id")
);
--> statement-breakpoint
ALTER TABLE "cafe_facilities" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "cafe_terms" (
	"cafe_id" text,
	"term_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "cafe_terms_pkey" PRIMARY KEY("cafe_id","term_id")
);
--> statement-breakpoint
ALTER TABLE "cafe_terms" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "terms" (
	"id" text PRIMARY KEY,
	"name" varchar(60) NOT NULL UNIQUE,
	"slug" varchar(80) NOT NULL UNIQUE,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "terms" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "cafe_opening_hours" ADD CONSTRAINT "cafe_opening_hours_cafe_id_cafes_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "cafe_facilities" ADD CONSTRAINT "cafe_facilities_cafe_id_cafes_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "cafe_facilities" ADD CONSTRAINT "cafe_facilities_facility_id_facilities_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "cafe_terms" ADD CONSTRAINT "cafe_terms_cafe_id_cafes_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "cafe_terms" ADD CONSTRAINT "cafe_terms_term_id_terms_id_fkey" FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON DELETE CASCADE ON UPDATE CASCADE;