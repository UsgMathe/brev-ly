CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"target_url" text NOT NULL,
	"slug" text NOT NULL,
	"accesses_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_slug_unique" UNIQUE("slug")
);
