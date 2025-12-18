import { db } from "@/db"
import { schema } from "@/db/schemas"
import { eq } from "drizzle-orm"

export async function deleteLinkById(id: number) {
  await db.delete(schema.links).where(eq(schema.links.id, id))
}