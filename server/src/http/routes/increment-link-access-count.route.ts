import { getLinkById } from "@/app/services/get-link-by-id.service"
import { incrementLinkAccessCount } from "@/app/services/increment-link-access-count.service"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { getLinkSchema } from "./schemas/get-link.schema"

export const incrementLinkAccessCountRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links/:id/access-count',
    {
      schema: {
        summary: 'Increment link access count',
        tags: ['links'],
        params: z.object({
          id: z.string({
            error: 'ID inválido'
          }),
        }).meta({
          example: {
            id: 1,
          },
        }),
        response: {
          200: getLinkSchema
            .describe('Success'),
          404: z.object({ message: z.string() })
            .describe('Link not found'),
          400: z.object({ message: z.string() })
            .describe('Validation error'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const foundLink = await getLinkById(id)

      if (!foundLink) {
        return reply.status(404).send({ message: 'Link não encontrado' })
      }

      const updatedLink = await incrementLinkAccessCount(foundLink.id)

      return reply.status(200).send(updatedLink)
    }
  )
}