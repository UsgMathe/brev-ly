import { api } from "@/api";
import {
  getPaginatedLinksSchema,
  type CreateLinkDTO,
  type DeleteLinkResponse,
  type ExportLinksParams,
  type ExportLinksResponse,
  type GetPaginatedLinksParams,
  type IncrementLinkAccessCountResponse,
  type Link,
  type PaginatedLinksResponse,
} from "@/services/links/links.schemas";

export const getLinkByIdRequest = (id: Link["id"]) =>
  api.get<Link>(`/links/id/${id}`).then((response) => response.data);

export const getLinkBySlugRequest = (slug: Link["slug"]) =>
  api.get<Link>(`/links/slug/${slug}`).then((response) => response.data);

export const getPaginatedLinksRequest = async (params?: GetPaginatedLinksParams) => {
  const validatedParams = getPaginatedLinksSchema.parse(params);
  return await api.get<PaginatedLinksResponse>("/links", { params: validatedParams }).then((response) => response.data);
};

export const createLinkRequest = (data: CreateLinkDTO) =>
  api.post<Link>("/links", data).then((response) => response.data);

export const incrementLinkAccessCountRequest = (id: Link["id"]) =>
  api.post<IncrementLinkAccessCountResponse>(`/links/${id}/access-count`).then((response) => response.data);

export const exportLinksRequest = (params?: ExportLinksParams) =>
  api.post<ExportLinksResponse>("/links/export", params).then((response) => response.data);

export const deleteLinkRequest = (id: Link["id"]) =>
  api.delete<DeleteLinkResponse>(`/links/${id}`).then((response) => response.data);
