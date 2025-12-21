import type { ApiPaginationMeta } from "@/api/api.types";
import z from "zod";

export const createLinkRequestSchema = z.object({
  targetUrl: z.url("URL inválida"),
  slug: z
    .string("Link inválido")
    .min(3, "O link deve ter pelo menos 3 caracteres")
    .max(255, "O link deve ter no máximo 255 caracteres"),
});

export type CreateLinkDTO = z.infer<typeof createLinkRequestSchema>;

export const linkSchema = z.object({
  id: z.number(),
  slug: z.string(),
  targetUrl: z.url(),
  shortenedUrl: z.url(),
  accessCount: z.number(),
  createdAt: z.date(),
});

export type Link = z.infer<typeof linkSchema>;

export const getPaginatedLinksRequestSchema = z
  .object({
    page: z.number().min(1, "Página inválida"),
    perPage: z.number().min(1, "Página inválida").max(100, "Página inválida"),
  })
  .partial();

export type GetPaginatedLinksRequestParams = z.infer<typeof getPaginatedLinksRequestSchema>;

export type PaginatedLinksResponse = {
  links: Link[];
  meta: ApiPaginationMeta;
};

export type DeleteLinkRequestResponse = {
  message: string;
};

export type ExportLinksRequestParams = { searchQuery?: string };

export type ExportLinksResponse = {
  reportUrl: string;
};
