import { api } from "@/api";
import type { Link } from "@/api/requests/links/get/get-link-by-id.request";

export const getLinkBySlugRequest = (slug: string) =>
  api.get<Link>(`/links/slug/${slug}`).then((response) => response.data);
