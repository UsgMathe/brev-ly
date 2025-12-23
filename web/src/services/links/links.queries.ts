import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";

import {
  createLinkRequest,
  deleteLinkRequest,
  exportLinksRequest,
  getLinkByIdRequest,
  getLinkBySlugRequest,
  getPaginatedLinksRequest,
  incrementLinkAccessCountRequest,
} from "@/services/links/links.api";
import type {
  DeleteLinkResponse,
  ExportLinksParams,
  ExportLinksResponse,
  GetPaginatedLinksParams,
  Link,
} from "@/services/links/links.schemas";

export const linksKey = "links";

export const linksKeys = {
  byId: (id: Link["id"]) => [linksKey, id],
  bySlug: (slug: Link["slug"]) => [linksKey, slug],
  paginated: (params?: GetPaginatedLinksParams) => [linksKey, params],
};

interface UseCreateLinkOptions {
  onSuccess?: (response: Link) => any;
  onError?: (error: unknown) => any;
}
export function useCreateLink({ onSuccess, onError }: UseCreateLinkOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLinkRequest,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: [linksKey], exact: false });
      await onSuccess?.(response);
    },
    onError: (error) => onError?.(error),
  });
}

export function useLinkById(id: Link["id"]) {
  return useQuery({
    queryKey: linksKeys.byId(id),
    queryFn: () => getLinkByIdRequest(id),
    enabled: !!id,
  });
}

interface UseLinkBySlugOptions {
  onSuccess?: (response: Link) => any;
  onError?: (error: unknown) => any;
}
export function useLinkBySlug(slug: Link["slug"], { onSuccess, onError }: UseLinkBySlugOptions = {}) {
  return useQuery({
    queryKey: linksKeys.bySlug(slug),
    queryFn: () =>
      getLinkBySlugRequest(slug)
        .then((response) => {
          onSuccess?.(response);
          return response;
        })
        .catch((error) => {
          onError?.(error);
          throw error;
        }),
    enabled: !!slug,
    retry: false,
  });
}

export function usePaginatedLinks(params?: GetPaginatedLinksParams) {
  return useInfiniteQuery({
    queryKey: linksKeys.paginated(params),
    queryFn: ({ pageParam }) => getPaginatedLinksRequest({ ...params, page: pageParam }),
    getNextPageParam: ({ meta }) => {
      if (!meta) return undefined;
      return meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    getPreviousPageParam: ({ meta }) => {
      if (!meta) return undefined;
      return meta.page > 1 ? meta.page - 1 : undefined;
    },
    initialPageParam: params?.page,
  });
}

export function useIncrementLinkAccessCount(options?: UseMutationOptions<Link, unknown, Link["id"]>) {
  return useMutation({
    mutationFn: incrementLinkAccessCountRequest,
    ...options,
  });
}

interface UseExportLinksOptions extends ExportLinksParams {
  onSuccess?: (response: ExportLinksResponse) => any;
  onError?: (error: unknown) => any;
}
export function useExportLinks({ onSuccess, onError, ...params }: UseExportLinksOptions = {}) {
  return useMutation({
    mutationFn: () => exportLinksRequest(params),
    onSuccess: async (response) => await onSuccess?.(response),
    onError: (error) => onError?.(error),
  });
}

interface UseDeleteLinkOptions {
  onSuccess?: (response: DeleteLinkResponse) => any;
  onError?: (error: unknown) => any;
}
export function useDeleteLink({ onSuccess, onError }: UseDeleteLinkOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLinkRequest,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: [linksKey], exact: false });
      await onSuccess?.(response);
    },
    onError: (error) => onError?.(error),
  });
}
