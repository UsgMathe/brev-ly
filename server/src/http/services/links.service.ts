import { db } from "@/db";
import { schema } from "@/db/schemas";
import { env } from "@/env";
import { count, desc } from "drizzle-orm";
import { z } from "zod";
import { PaginationMeta } from "../schemas/response.schemas";


export const createLinkSchema = z.object({
  targetUrl: z.url({ message: 'URL inválida' }),
  slug: z.string({ message: 'Link encurtado inválido' }).min(3, 'Link encurtado deve ter pelo menos 3 caracteres').max(255, 'Link encurtado deve ter no máximo 255 caracteres'),
})

type CreateLinkInput = z.input<typeof createLinkSchema>
type CreateLinkOutput = { id: number; url: string }

export async function createLink(input: CreateLinkInput): Promise<CreateLinkOutput> {
  const { targetUrl, slug } = createLinkSchema.parse(input)

  const result = await db.insert(schema.links).values({
    targetUrl,
    slug,
  }).returning();

  return {
    id: result[0].id,
    url: `${env.CLOUDFLARE_PUBLIC_URL}/${slug}`
  }
};

export const getLinksSchema = z.object({
  targetUrl: z.url(),
  slug: z.string(),
  fullUrl: z.url(),
  id: z.number(),
  accessesCount: z.number(),
  createdAt: z.date(),
});

export type GetLinksInput = {
  page: number
  perPage: number
}

export type GetLinksOutput = {
  links: z.infer<typeof getLinksSchema>[]
  meta: PaginationMeta
}

export async function getLinks({ page, perPage }: GetLinksInput): Promise<GetLinksOutput> {
  const offset = (page - 1) * perPage

  const [totalCount] = await db.select({ count: count() }).from(schema.links)
  const total = totalCount.count

  const result = await db.select().from(schema.links).limit(perPage).offset(offset).orderBy(desc(schema.links.createdAt))

  const links = result.map((link) => ({
    ...link,
    fullUrl: `${env.CLOUDFLARE_PUBLIC_URL}/${link.slug}`,
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
