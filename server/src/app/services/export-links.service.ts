import { stringify as stringifyCSV } from 'csv-stringify';
import { desc, ilike } from "drizzle-orm";
import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { z } from "zod";

import { db, pg } from "@/db";
import { schema } from "@/db/schemas";
import { Link } from '@/db/schemas/links';
import { uploadFileToStorage } from '@/storage/services/upload-file-to-storage.service';

const exportLinksInputSchema = z.object({
  host: z.url(),
  searchQuery: z.string().optional(),
})

type ExportLinksInput = z.input<typeof exportLinksInputSchema>
type GetLinksOutput = { reportUrl: string }

export async function exportLinks(
  input: ExportLinksInput
):
  Promise<GetLinksOutput> {
  const { host, searchQuery } = exportLinksInputSchema.parse(input)

  const { sql, params } =
    db
      .select({
        id: schema.links.id,
        slug: schema.links.slug,
        target_url: schema.links.targetUrl,
        access_count: schema.links.accessCount,
        created_at: schema.links.createdAt,
      })
      .from(schema.links)
      .orderBy(desc(schema.links.createdAt))
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
      { key: 'slug', header: 'Short URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' }
    ]
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: Link[], _, callback) {
        for (const chunk of chunks) {
          this.push({
            ...chunk,
            slug: `${host}/${chunk.slug}`,
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