import { getLinkSchema } from '@/http/routes/schemas/get-link.schema'
import { getLinkById } from '@/app/services/get-link-by-id.service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinkByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links/id/:id',
    {
      schema: {
        summary: 'Get link by id',
        tags: ['links'],
        params: z.object({
          id: z.string({ message: 'Id is required' })
        }),
        response: {
          200: getLinkSchema
            .meta({
              example: {
                id: 1,
                targetUrl: 'https://google.com',
                slug: 'google',
                shortenedUrl: 'https://brev.ly/google',
                accessesCount: 0,
                createdAt: new Date(),
              },
            })
            .describe('Link'),
          404: z.object({ message: z.string() })
            .describe('Link not found'),
          400: z.object({ message: z.string() })
            .describe('Validation error'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const result = await getLinkById(Number(id))

      if (!result) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      return reply.status(200).send(result)
    }
  )
}