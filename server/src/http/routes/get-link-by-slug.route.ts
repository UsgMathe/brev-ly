import { getLinkBySlug } from '@/app/services/get-link-by-slug.service'
import { getLinkSchema } from '@/http/routes/schemas/get-link.schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinkBySlugRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links/slug/:slug',
    {
      schema: {
        summary: 'Get link by slug',
        tags: ['links'],
        params: z.object({
          slug: z.string({ message: 'Link encurtado inválido' })
            .max(255, 'Link encurtado deve ter no máximo 255 caracteres')
            .regex(
              /^[a-z0-9-]+$/,
              'Slug deve conter apenas letras minúsculas, números e hífen'
            )
            .transform(s => s.toLowerCase()),
        }).meta({
          example: {
            slug: 'google',
          },
        }),
        response: {
          200: getLinkSchema
            .meta({
              example: {
                id: 1,
                targetUrl: 'https://google.com',
                slug: 'google',
                accessCount: 0,
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
      const { slug } = request.params
      const result = await getLinkBySlug(slug)

      if (!result) {
        return reply.status(404).send({ message: 'Link não encontrado' })
      }

      return reply.status(200).send(result)
    }
  )
}