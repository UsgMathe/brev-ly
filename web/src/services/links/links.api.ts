import { api } from "@/api";
import {
  getPaginatedLinksRequestSchema,
  type CreateLinkDTO,
  type DeleteLinkRequestResponse,
  type ExportLinksRequestParams,
  type ExportLinksResponse,
  type GetPaginatedLinksRequestParams,
  type Link,
  type PaginatedLinksResponse,
} from "@/services/links/links.schemas";

export const getLinkByIdRequest = (id: Link["id"]) =>
  api.get<Link>(`/links/id/${id}`).then((response) => response.data);

export const getLinkBySlugRequest = (slug: Link["slug"]) =>
  api.get<Link>(`/links/slug/${slug}`).then((response) => response.data);

export const getPaginatedLinksRequest = async (params?: GetPaginatedLinksRequestParams) => {
  const validatedParams = getPaginatedLinksRequestSchema.parse(params);
  return await api.get<PaginatedLinksResponse>("/links", { params: validatedParams }).then((response) => response.data);
};

export const createLinkRequest = (data: CreateLinkDTO) =>
  api.post<Link>("/links", data).then((response) => response.data);

export const exportLinksRequest = (params?: ExportLinksRequestParams) =>
  api.post<ExportLinksResponse>("/links/export", params).then((response) => response.data);

export const deleteLinkRequest = (id: Link["id"]) =>
  api.delete<DeleteLinkRequestResponse>(`/links/${id}`).then((response) => response.data);
