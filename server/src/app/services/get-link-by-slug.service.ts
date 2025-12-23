import { db } from "@/db"
import { schema } from "@/db/schemas"
import { eq } from "drizzle-orm"

export async function getLinkBySlug(slug: string) {
  const result = await db.select().from(schema.links).where(eq(schema.links.slug, slug))

  if (!result[0]) {
    return null
  }

  return result[0];
}