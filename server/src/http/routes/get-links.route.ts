import { getLinkSchema } from '@/http/routes/schemas/get-link.schema'
import { paginationMetaSchema } from '@/http/schemas/response.schemas'
import { getLinks } from '@/app/services/get-links.service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get all links',
        tags: ['links'],
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          perPage: z.coerce.number().min(1).max(100).default(10),
        }),
        response: {
          200: z.object({
            links: z.array(getLinkSchema),
            meta: paginationMetaSchema
          })
            .meta({
              example: {
                links: [
                  {
                    id: 1,
                    targetUrl: 'https://google.com',
                    slug: 'google',
                    shortenedUrl: 'https://brev.ly/google',
                    accessesCount: 0,
                    createdAt: new Date(),
                  },
                ],
                meta: {
                  page: 1,
                  perPage: 10,
                  total: 1,
                  totalPages: 1,
                },
              },
            })
            .describe('Links list'),
          400: z.object({ message: z.string() })
            .describe('Validation error'),
        },
      },
    },
    async (request, reply) => {
      const { page, perPage } = request.query

      const result = await getLinks({ page, perPage })
      return reply.status(200).send(result)
    }
  )
}
