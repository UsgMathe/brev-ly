import { z } from "zod";

export const getLinkSchema = z.object({
  id: z.string().describe('Link ID'),
  targetUrl: z.string().describe('Link target URL'),
  slug: z.string().describe('Link slug'),
  accessCount: z.number().describe('Link accesses count'),
  createdAt: z.date().describe('Link created at'),
})