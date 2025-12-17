import { createLink, createLinkSchema } from '@/http/services/links.service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a link',
        tags: ['links'],
        response: {
          201: z.object({
            id: z.number().int().describe('Link ID'),
            url: z.string().describe('Link URL'),
          }),
          400: z.object({ message: z.string() }),
        },
        body: createLinkSchema,
      },
    },
    async (request, reply) => {
      const { targetUrl, slug } = request.body
      const result = await createLink({ targetUrl, slug })

      return reply.status(201).send(result)

    }
  )
}
