import { db } from "@/db"
import { schema } from "@/db/schemas"
import { eq } from "drizzle-orm"
import { mountShortenedUrl } from "@/http/utils/links.utils"

export async function getLinkBySlug(slug: string) {
  const result = await db.select().from(schema.links).where(eq(schema.links.slug, slug))

  if (!result[0]) {
    return null
  }

  return {
    ...result[0],
    shortenedUrl: mountShortenedUrl(result[0].slug),
  };
}