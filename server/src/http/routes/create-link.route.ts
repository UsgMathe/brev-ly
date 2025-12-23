import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { createLink } from '@/app/services/create-link.service'
import { getLinkBySlug } from '@/app/services/get-link-by-slug.service'
import { getLinkSchema } from '@/http/routes/schemas/get-link.schema'

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a link',
        tags: ['links'],
        body: z.object({
          targetUrl: z.url({ message: 'URL inválida' }),
          slug: z.string({ message: 'Link encurtado inválido' })
            .max(255, 'Link encurtado deve ter no máximo 255 caracteres')
            .regex(
              /^[a-z0-9-]+$/,
              'Slug deve conter apenas letras minúsculas, números e hífen'
            )
            .transform(s => s.toLowerCase()),
        }).meta({
          example: {
            targetUrl: 'https://google.com',
            slug: 'google',
          }
        }),
        response: {
          201: getLinkSchema
            .meta({
              example: {
                id: 1,
                targetUrl: 'https://google.com',
                slug: 'google',
                accessCount: 0,
                createdAt: new Date(),
              },
            })
            .describe('Link created'),
          409: z.object({ message: z.string() })
            .describe('Validation error'),
        },
      },
    },
    async (request, reply) => {
      const { targetUrl, slug } = request.body
      const foundLink = await getLinkBySlug(slug)

      if (foundLink) {
        return reply.status(409).send({ message: 'Essa URL encurtada já existe.' })
      }

      const result = await createLink({ targetUrl, slug })

      return reply.status(201).send(result)

    }
  )
}
