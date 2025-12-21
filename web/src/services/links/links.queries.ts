import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createLinkRequest,
  deleteLinkRequest,
  exportLinksRequest,
  getLinkByIdRequest,
  getLinkBySlugRequest,
  getPaginatedLinksRequest,
} from "@/services/links/links.api";
import type {
  CreateLinkDTO,
  ExportLinksRequestParams,
  GetPaginatedLinksRequestParams,
  Link,
} from "@/services/links/links.schemas";

export const linksKey = "links";

export const linksKeys = {
  byId: (id: Link["id"]) => [linksKey, id],
  bySlug: (slug: Link["slug"]) => [linksKey, slug],
  paginated: (params?: GetPaginatedLinksRequestParams) => [linksKey, params],
};

export async function useCreateLink(data: CreateLinkDTO) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createLinkRequest(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [linksKey], exact: false }),
  });
}

export async function useLinkById(id: Link["id"]) {
  return useQuery({
    queryKey: linksKeys.byId(id),
    queryFn: () => getLinkByIdRequest(id),
    enabled: !!id,
  });
}

export async function useLinkBySlug(slug: Link["slug"]) {
  return useQuery({
    queryKey: linksKeys.bySlug(slug),
    queryFn: () => getLinkBySlugRequest(slug),
    enabled: !!slug,
  });
}

export async function usePaginatedLinks(params: GetPaginatedLinksRequestParams) {
  return useInfiniteQuery({
    queryKey: linksKeys.paginated(params),
    queryFn: () => getPaginatedLinksRequest(params),
    getNextPageParam: ({ meta }) => {
      if (!meta) return undefined;
      return meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    getPreviousPageParam: ({ meta }) => {
      if (!meta) return undefined;
      return meta.page > 1 ? meta.page - 1 : undefined;
    },
    initialPageParam: params.page,
  });
}

export async function useExportLinks(params: ExportLinksRequestParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => exportLinksRequest(params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [linksKey], exact: false }),
  });
}

export async function useDeleteLink(id: Link["id"]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLinkRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [linksKey], exact: false }),
  });
}
