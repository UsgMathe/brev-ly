import { api } from "@/api";
import { env } from "@/env";
import type { ExportLinksParams, ExportLinksResponse } from "@/services/links/links.schemas";

export const exportLinksRequest = (data?: ExportLinksParams) =>
  api
    .post<ExportLinksResponse>("/links/export", { ...data, host: env.VITE_FRONTEND_URL })
    .then((response) => response.data);
