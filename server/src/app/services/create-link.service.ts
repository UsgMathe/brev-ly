import { db } from "@/db";
import { schema } from "@/db/schemas";
import { buildShortenedUrl } from "@/http/utils/links.utils";

type CreateLinkInput = typeof schema.links.$inferInsert;

export async function createLink({ targetUrl, slug }: CreateLinkInput) {

  const result = await db.insert(schema.links).values({
    targetUrl,
    slug,
  }).returning();

  return {
    id: result[0].id,
    url: buildShortenedUrl(result[0].slug),
  }
};