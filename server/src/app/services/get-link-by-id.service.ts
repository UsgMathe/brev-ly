import { db } from "@/db"
import { schema } from "@/db/schemas"
import { eq } from "drizzle-orm"
import { mountShortenedUrl } from "@/http/utils/links.utils"

export async function getLinkById(id: number) {
  const result = await db.select().from(schema.links).where(eq(schema.links.id, id))

  if (!result[0]) {
    return null
  }

  return {
    ...result[0],
    shortenedUrl: mountShortenedUrl(result[0].slug),
  };
}
