import { z } from "zod";

import { api } from "@/api";
import type { ApiPaginationMeta } from "@/api/api.types";
import type { Link } from "@/api/requests/links/get/get-link-by-id.request";

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

export const getPaginatedLinksRequest = async (params: GetPaginatedLinksRequestParams) => {
  const validatedParams = getPaginatedLinksRequestSchema.parse(params);
  return await api.get<PaginatedLinksResponse>("/links", { params: validatedParams }).then((response) => response.data);
};
