import type { ApiPaginationMeta } from "@/api/api.types";
import z from "zod";

export const createLinkSchema = z.object({
  targetUrl: z.url("Informe uma URL válida."),
  slug: z
    .string("Informe uma URL minúscula e sem espaços/caracteres especiais.")
    .min(1, "Informe uma URL minúscula e sem espaços/caracteres especiais.")
    .max(255, "A URL deve ter no máximo 255 caracteres."),
});

export type CreateLinkDTO = z.infer<typeof createLinkSchema>;

export const linkSchema = z.object({
  id: z.string(),
  slug: z.string(),
  targetUrl: z.url(),
  accessCount: z.number(),
  createdAt: z.date(),
});

export type Link = z.infer<typeof linkSchema>;

export const getPaginatedLinksSchema = z
  .object({
    page: z.number().min(1, "Página inválida."),
    perPage: z.number().min(1, "Página inválida.").max(100, "Página inválida."),
  })
  .partial();

export type GetPaginatedLinksParams = z.infer<typeof getPaginatedLinksSchema>;

export type PaginatedLinksResponse = {
  links: Link[];
  meta: ApiPaginationMeta;
};

export type DeleteLinkResponse = {
  message: string;
};

export type ExportLinksParams = { searchQuery?: string };

export type ExportLinksResponse = {
  reportUrl: string;
};
