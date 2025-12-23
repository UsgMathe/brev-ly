import { api } from "@/api";
import type { Link } from "@/services/links/links.schemas";

export const getLinkByIdRequest = (id: Link["id"]) =>
  api.get<Link>(`/links/id/${id}`).then((response) => response.data);
