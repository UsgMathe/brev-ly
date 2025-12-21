import { z } from "zod";

import { api } from "@/api";
import type { Link } from "@/api/requests/links/get/get-link-by-id.request";

export const createLinkRequestSchema = z.object({
  targetUrl: z.url("URL inválida"),
  slug: z
    .string("Link inválido")
    .min(3, "O link deve ter pelo menos 3 caracteres")
    .max(255, "O link deve ter no máximo 255 caracteres"),
});

export type CreateLinkDTO = z.infer<typeof createLinkRequestSchema>;

export const createLinkRequest = (data: CreateLinkDTO) =>
  api.post<Link>("/links", data).then((response) => response.data);
