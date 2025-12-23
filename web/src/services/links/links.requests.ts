import { createLinkRequest } from "@/services/links/requests/create-link.request";
import { deleteLinkRequest } from "@/services/links/requests/delete-link.request";
import { exportLinksRequest } from "@/services/links/requests/export-links.request";
import { getLinkByIdRequest } from "@/services/links/requests/get-link-by-id.request";
import { getLinkBySlugRequest } from "@/services/links/requests/get-link-by-slug.request";
import { getPaginatedLinksRequest } from "@/services/links/requests/get-paginated-links-request";
import { incrementLinkAccessCountRequest } from "@/services/links/requests/increment-link-access-count.request";

export {
  createLinkRequest,
  deleteLinkRequest,
  exportLinksRequest,
  getLinkByIdRequest,
  getLinkBySlugRequest,
  getPaginatedLinksRequest,
  incrementLinkAccessCountRequest,
};
