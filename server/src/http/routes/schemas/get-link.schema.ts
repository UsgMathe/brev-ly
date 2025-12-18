import { z } from "zod";

export const getLinkSchema = z.object({
  id: z.number().describe('Link ID'),
  targetUrl: z.string().describe('Link target URL'),
  slug: z.string().describe('Link slug'),
  shortenedUrl: z.string().describe('Link shortened URL'),
  accessesCount: z.number().describe('Link accesses count'),
  createdAt: z.date().describe('Link created at'),
})