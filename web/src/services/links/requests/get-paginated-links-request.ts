import { api } from "@/api";
import type { GetPaginatedLinksParams, PaginatedLinksResponse } from "@/services/links/links.schemas";
import { getPaginatedLinksSchema } from "@/services/links/links.schemas";

export const getPaginatedLinksRequest = async (params?: GetPaginatedLinksParams) => {
  const validatedParams = getPaginatedLinksSchema.parse(params);
  return await api.get<PaginatedLinksResponse>("/links", { params: validatedParams }).then((response) => response.data);
};
