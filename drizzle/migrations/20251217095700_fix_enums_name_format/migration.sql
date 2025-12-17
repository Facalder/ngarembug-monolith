ALTER TABLE "cafes" ALTER COLUMN "cafe_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "cafe_type" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "CafeType";--> statement-breakpoint
CREATE TYPE "CafeType" AS ENUM('indoor_cafe', 'outdoor_cafe', 'indoor_outdoor_cafe');--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "cafe_type" SET DATA TYPE "CafeType" USING lower("cafe_type")::"CafeType";--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "cafe_type" SET DEFAULT 'indoor_cafe'::"CafeType";--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "content_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "content_status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "content_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "content_status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "terms" ALTER COLUMN "content_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "terms" ALTER COLUMN "content_status" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "ContentStatus";--> statement-breakpoint
CREATE TYPE "ContentStatus" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "content_status" SET DATA TYPE "ContentStatus" USING lower("content_status")::"ContentStatus";--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "content_status" SET DEFAULT 'published'::"ContentStatus";--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "content_status" SET DATA TYPE "ContentStatus" USING lower("content_status")::"ContentStatus";--> statement-breakpoint
ALTER TABLE "facilities" ALTER COLUMN "content_status" SET DEFAULT 'published'::"ContentStatus";--> statement-breakpoint
ALTER TABLE "terms" ALTER COLUMN "content_status" SET DATA TYPE "ContentStatus" USING lower("content_status")::"ContentStatus";--> statement-breakpoint
ALTER TABLE "terms" ALTER COLUMN "content_status" SET DEFAULT 'published'::"ContentStatus";--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "price_range" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "PriceRange";--> statement-breakpoint
CREATE TYPE "PriceRange" AS ENUM('low', 'medium', 'high', 'premium');--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "price_range" SET DATA TYPE "PriceRange" USING lower("price_range")::"PriceRange";--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "region" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "Region";--> statement-breakpoint
CREATE TYPE "Region" AS ENUM('sukabirus', 'sukapura', 'batununggal', 'buah_batu', 'dayeuh_kolot', 'ciganitri', 'cijagra', 'bojongsoang');--> statement-breakpoint
ALTER TABLE "cafes" ALTER COLUMN "region" SET DATA TYPE "Region" USING lower("region")::"Region";--> statement-breakpoint
DROP TYPE "ReviewStatus";--> statement-breakpoint
CREATE TYPE "ReviewStatus" AS ENUM('approved', 'rejected', 'pending');--> statement-breakpoint
DROP TYPE "StarRating";--> statement-breakpoint
CREATE TYPE "StarRating" AS ENUM('one', 'two', 'three', 'four', 'five');--> statement-breakpoint
DROP TYPE "VisitorType";--> statement-breakpoint
CREATE TYPE "VisitorType" AS ENUM('family', 'couple', 'solo', 'business', 'friends');