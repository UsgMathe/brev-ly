import { createLink } from '@/app/services/create-link.service'
import { getLinkBySlug } from '@/app/services/get-link-by-slug.service'
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
            id: z.number().describe('Link ID'),
            url: z.string().describe('Link URL'),
          })
            .meta({
              example: {
                id: 1,
                url: 'https://google.com'
              }
            })
            .describe('Link created'),
          400: z.object({ message: z.string() })
            .describe('Validation error'),
        },
        body: z.object({
          targetUrl: z.url({ message: 'URL inválida' }),
          slug: z.string({ message: 'Link encurtado inválido' })
            .min(3, 'Link encurtado deve ter pelo menos 3 caracteres')
            .max(255, 'Link encurtado deve ter no máximo 255 caracteres'),
        }).meta({
          example: {
            targetUrl: 'https://google.com',
            slug: 'google',
          }
        }),
      },
    },
    async (request, reply) => {
      const { targetUrl, slug } = request.body
      const foundLink = await getLinkBySlug(slug)

      if (foundLink) {
        return reply.status(400).send({ message: 'Link already exists' })
      }

      const result = await createLink({ targetUrl, slug })

      return reply.status(201).send(result)

    }
  )
}
