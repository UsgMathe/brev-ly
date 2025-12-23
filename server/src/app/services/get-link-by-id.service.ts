import { db } from "@/db"
import { schema } from "@/db/schemas"
import { eq } from "drizzle-orm"

export async function getLinkById(id: string) {
  const result = await db.select().from(schema.links).where(eq(schema.links.id, id))

  if (!result[0]) {
    return null
  }

  return result[0];
}
