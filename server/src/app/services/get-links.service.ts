import { db } from "@/db"
import { schema } from "@/db/schemas"
import { count, desc } from "drizzle-orm"
import { mountShortenedUrl } from "@/http/utils/links.utils"

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