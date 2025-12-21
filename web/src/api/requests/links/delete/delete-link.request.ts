import { api } from "@/api";
import type { Link } from "@/api/requests/links/get/get-link-by-id.request";

export type DeleteLinkRequestResponse = {
  message: string;
};

export const deleteLinkRequest = (id: Link["id"]) =>
  api.delete<DeleteLinkRequestResponse>(`/links/${id}`).then((response) => response.data);
