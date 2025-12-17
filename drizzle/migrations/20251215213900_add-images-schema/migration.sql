CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"file_name" varchar(255) NOT NULL,
	"file_path" text NOT NULL,
	"file_url" text NOT NULL,
	"file_size" varchar(50),
	"mime_type" varchar(100),
	"folder" varchar(100) DEFAULT 'uncategorized' NOT NULL,
	"category" varchar(100) DEFAULT 'uncategorized',
	"alt" text,
	"description" text,
	"bucket" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "images" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE INDEX "images_folder_idx" ON "images" ("folder");--> statement-breakpoint
CREATE INDEX "images_category_idx" ON "images" ("category");--> statement-breakpoint
CREATE INDEX "images_bucket_idx" ON "images" ("bucket");--> statement-breakpoint
CREATE INDEX "images_created_at_idx" ON "images" ("created_at" DESC NULLS LAST);