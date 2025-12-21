import { z } from "zod";

import { api } from "@/api";

export const linkSchema = z.object({
  id: z.number(),
  slug: z.string(),
  targetUrl: z.url(),
  shortenedUrl: z.url(),
  accessCount: z.number(),
  createdAt: z.date(),
});

export type Link = z.infer<typeof linkSchema>;

export const getLinkByIdRequest = (id: string) => api.get<Link>(`/links/id/${id}`).then((response) => response.data);
