import { exportLinks } from '@/app/services/export-links.service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/exports',
    {
      schema: {
        summary: 'Export links',
        tags: ['links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        })
          .meta({
            example: {
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
      const { searchQuery } = request.query

      const result = await exportLinks({ searchQuery })

      return reply.status(200).send(result)
    }
  )
}
