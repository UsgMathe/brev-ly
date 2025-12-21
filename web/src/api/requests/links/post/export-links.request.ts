import { api } from "@/api";

export type ExportLinksRequestParams = { searchQuery?: string };

export type ExportLinksResponse = {
  reportUrl: string;
};

export const exportLinksRequest = (params: ExportLinksRequestParams) =>
  api.post<ExportLinksResponse>("/links/export", params).then((response) => response.data);
