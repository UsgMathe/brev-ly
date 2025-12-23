import { db } from "@/db";
import { schema } from "@/db/schemas";
import { eq, sql } from "drizzle-orm";

export async function incrementLinkAccessCount(id: number) {
  const result = await db.update(schema.links).set({
    accessCount: sql`${schema.links.accessCount} + 1`,
  }).where(eq(schema.links.id, id)).returning();

  return result[0]
}