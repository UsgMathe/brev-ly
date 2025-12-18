import { getLinkBySlug } from "@/app/services/get-link-by-slug.service"
import { incrementLinkAccessesCount } from "@/app/services/increment-link-access-count.service"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

export const redirectShortenedUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/:slug',
    {
      schema: {
        summary: 'Redirect shortened URL',
        params: z.object({
          slug: z.string()
            .min(3, { message: 'Slug must be at least 3 characters long' })
            .max(255, { message: 'Slug must be at most 255 characters long' }),
        }),
        response: {
          200: z.object({
            message: z.string().describe('Redirected to URL'),
          }),
          404: z.object({
            message: z.string().describe('Link not found'),
          }),
          400: z.object({
            message: z.string().describe('Validation error'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params

      const link = await getLinkBySlug(slug)

      if (!link) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      await incrementLinkAccessesCount(link.id)

      return reply.redirect(link.targetUrl)
    }
  )
}