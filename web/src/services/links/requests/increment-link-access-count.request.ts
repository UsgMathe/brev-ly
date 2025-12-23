import { api } from "@/api";
import type { Link } from "@/services/links/links.schemas";

export const incrementLinkAccessCountRequest = (id: Link["id"]) =>
  api.post<Link>(`/links/${id}/access-count`).then((response) => response.data);
