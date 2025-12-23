import { api } from "@/api";
import type { Link } from "@/services/links/links.schemas";

export const getLinkBySlugRequest = (slug: Link["slug"]) =>
  api.get<Link>(`/links/slug/${slug}`).then((response) => response.data);
