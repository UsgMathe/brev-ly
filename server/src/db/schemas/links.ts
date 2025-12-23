import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

export const links = pgTable('links', {
  id: text('id').primaryKey().$defaultFn(() => uuidv7()),
  targetUrl: text('target_url').notNull(),
  slug: text('slug').notNull().unique(),
  accessCount: integer('access_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Link = typeof links.$inferSelect;