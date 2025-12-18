import { db } from "@/db"
import { schema } from "@/db/schemas"
import { eq, sql } from "drizzle-orm"

export async function incrementLinkAccessesCount(id: number) {
  await db.update(schema.links).set({
    accessesCount: sql`${schema.links.accessesCount} + 1`,
  }).where(eq(schema.links.id, id))
}