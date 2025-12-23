import { exportLinks } from '@/app/services/export-links.service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/export',
    {
      schema: {
        summary: 'Export links',
        tags: ['links'],
        body: z.object({
          host: z.url("Host inválido"),
          searchQuery: z.string().optional(),
        })
          .meta({
            example: {
              host: 'http://localhost:3333',
              searchQuery: 'example'
            }
          }),
        response: {
          200: z.object({
            reportUrl: z.url()
          })
            .meta({
              example: 'https://example.com/report.csv'
            })
            .describe('Exported report URL'),
        },
      },
    },

    async (request, reply) => {
      const { host, searchQuery } = request.body;

      const result = await exportLinks({ host, searchQuery })

      return reply.status(200).send(result)
    }
  )
}
