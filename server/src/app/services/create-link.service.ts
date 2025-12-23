import { db } from "@/db";
import { schema } from "@/db/schemas";

type CreateLinkInput = typeof schema.links.$inferInsert;

export async function createLink({ targetUrl, slug }: CreateLinkInput) {

  const result = await db.insert(schema.links).values({
    targetUrl,
    slug,
  }).returning();

  return result[0]
};