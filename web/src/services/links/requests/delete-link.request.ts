import { api } from "@/api";
import type { DeleteLinkResponse, Link } from "@/services/links/links.schemas";

export const deleteLinkRequest = (id: Link["id"]) =>
  api.delete<DeleteLinkResponse>(`/links/${id}`).then((response) => response.data);
