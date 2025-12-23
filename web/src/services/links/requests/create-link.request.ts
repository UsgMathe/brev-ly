import { api } from "@/api";
import type { CreateLinkDTO, Link } from "@/services/links/links.schemas";

export const createLinkRequest = (data: CreateLinkDTO) =>
  api.post<Link>("/links", data).then((response) => response.data);
