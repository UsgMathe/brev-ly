import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  targetUrl: text('target_url').notNull(),
  slug: text('slug').notNull().unique(),
  accessesCount: integer('accesses_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Link = typeof links.$inferSelect;