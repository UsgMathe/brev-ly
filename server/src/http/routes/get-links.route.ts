import { getLinks } from '@/http/services/links.service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { paginationMetaSchema } from '../schemas/response.schemas'

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
            links: z.array(z.object({
              id: z.number().int().describe('Link ID'),
              targetUrl: z.string().describe('Link target URL'),
              slug: z.string().describe('Link slug'),
              fullUrl: z.string().describe('Link full URL'),
              accessesCount: z.number().int().describe('Link accesses count'),
              createdAt: z.date().describe('Link created at'),
            })),
            meta: paginationMetaSchema
          }),
          400: z.object({ message: z.string() }),
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
