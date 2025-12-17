ALTER TABLE "cafes" ADD COLUMN "content_status" "ContentStatus" DEFAULT 'PUBLISHED'::"ContentStatus" NOT NULL;--> statement-breakpoint
ALTER TABLE "facilities" ADD COLUMN "content_status" "ContentStatus" DEFAULT 'PUBLISHED'::"ContentStatus" NOT NULL;--> statement-breakpoint
ALTER TABLE "terms" ADD COLUMN "content_status" "ContentStatus" DEFAULT 'PUBLISHED'::"ContentStatus" NOT NULL;