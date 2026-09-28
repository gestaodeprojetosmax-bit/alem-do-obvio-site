import { pgTable, text } from 'drizzle-orm/pg-core';

export const registrations = pgTable('registrations', {
  id: text('id').primaryKey(),
  eventKey: text('event_key').notNull(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phoneE164: text('phone_e164').notNull(),
  country: text('country').notNull(),
  instagram: text('instagram').notNull(),
  location: text('location').notNull(),
  answers: text('answers_json').notNull(),
  payloadHash: text('payload_hash').notNull(),
  noticeVersion: text('notice_version').notNull(),
  createdAt: text('created_at').notNull(),
});
