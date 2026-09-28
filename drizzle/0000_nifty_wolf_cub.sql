CREATE TABLE "registrations" (
	"id" text PRIMARY KEY NOT NULL,
	"event_key" text NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_e164" text NOT NULL,
	"country" text NOT NULL,
	"instagram" text NOT NULL,
	"location" text NOT NULL,
	"answers_json" text NOT NULL,
	"payload_hash" text NOT NULL,
	"notice_version" text NOT NULL,
	"created_at" text NOT NULL
);
