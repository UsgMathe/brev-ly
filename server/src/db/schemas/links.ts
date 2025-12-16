import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  remoteUrl: text('remote_url').notNull(),
  shortUrl: text('short_url').notNull().unique(),
  accessesCount: integer('accesses_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
