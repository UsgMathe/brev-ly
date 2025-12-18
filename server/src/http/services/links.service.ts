import { db } from "@/db";
import { schema } from "@/db/schemas";
import { env } from "@/env";
import { count, desc, eq, sql } from "drizzle-orm";

function mountShortenedUrl(slug: string) {
  return `${env.SERVER_BASE_URL}/${slug}`
}

type CreateLinkInput = typeof schema.links.$inferInsert;

export async function createLink({ targetUrl, slug }: CreateLinkInput) {

  const result = await db.insert(schema.links).values({
    targetUrl,
    slug,
  }).returning();

  return {
    id: result[0].id,
    url: mountShortenedUrl(result[0].slug),
  }
};



export type GetLinksInput = {
  page: number
  perPage: number
}

export async function getLinks({ page, perPage }: GetLinksInput) {
  const offset = (page - 1) * perPage

  const [totalCount] = await db.select({ count: count() }).from(schema.links)
  const total = totalCount.count

  const result = await db.select().from(schema.links).limit(perPage).offset(offset).orderBy(desc(schema.links.createdAt))

  const links = result.map((link) => ({
    ...link,
    shortenedUrl: mountShortenedUrl(link.slug),
  }))

  return {
    links,
    meta: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  }
}

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

export async function deleteLinkById(id: number) {
  await db.delete(schema.links).where(eq(schema.links.id, id))
}

export async function getLinkByShortenedUrl(shortenedUrl: string) {
  const slug = shortenedUrl.split(`${env.SERVER_BASE_URL}/`).pop()

  if (!slug) {
    return null
  }

  const result = await db.select().from(schema.links).where(eq(schema.links.slug, slug))

  if (!result[0]) {
    return null
  }

  return {
    ...result[0],
    shortenedUrl: mountShortenedUrl(result[0].slug),
  };
}

export async function updateLinkAccessesCount(id: number) {
  await db.update(schema.links).set({
    accessesCount: sql`${schema.links.accessesCount} + 1`,
  }).where(eq(schema.links.id, id))
}