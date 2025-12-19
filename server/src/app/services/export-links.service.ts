import { stringify as stringifyCSV } from 'csv-stringify';
import { ilike } from "drizzle-orm";
import { z } from "zod";

import { db, pg } from "@/db";
import { schema } from "@/db/schemas";
import { buildShortenedUrl } from '@/http/utils/links.utils';
import { uploadFileToStorage } from '@/storage/services/upload-file-to-storage.service';
import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const exportLinksInputSchema = z.object({
  searchQuery: z.string().optional(),
})

type ExportLinksInput = z.input<typeof exportLinksInputSchema>
type GetLinksOutput = { reportUrl: string }

export async function exportLinks(
  input: ExportLinksInput
):
  Promise<GetLinksOutput> {
  const { searchQuery } = exportLinksInputSchema.parse(input)

  const { sql, params } =
    db
      .select({
        id: schema.links.id,
        slug: schema.links.slug,
        target_url: schema.links.targetUrl,
        accesses_count: schema.links.accessesCount,
        created_at: schema.links.createdAt,
      })
      .from(schema.links)
      .where(
        searchQuery ? ilike(schema.links.targetUrl, `%${searchQuery}%`) : undefined,
      ).toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringifyCSV({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'target_url', header: 'Original URL' },
      { key: 'shortened_url', header: 'Shortened URL' },
      { key: 'accesses_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' }
    ]
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: any[], _, callback) {
        for (const chunk of chunks) {
          this.push({
            ...chunk,
            shortened_url: buildShortenedUrl(chunk.slug),
          })
        }
        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'reports',
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: uploadToStorageStream
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return { reportUrl: url }
}