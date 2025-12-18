import { deleteLinkById } from '@/app/services/delete-link-by-id.service'
import { getLinkById } from '@/app/services/get-link-by-id.service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/links/:id',
    {
      schema: {
        summary: 'Delete link',
        tags: ['links'],
        params: z.object({
          id: z.string({ message: 'Id is required' })
        }),
        response: {
          200: z.object({ message: z.string() })
            .describe('Link deleted'),
          404: z.object({ message: z.string() })
            .describe('Link not found'),
          400: z.object({ message: z.string() })
            .describe('Validation error'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const foundLink = await getLinkById(Number(id))
      if (!foundLink) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      await deleteLinkById(Number(id))
      return reply.status(200).send({ message: 'Link deleted' })
    }
  )

}
