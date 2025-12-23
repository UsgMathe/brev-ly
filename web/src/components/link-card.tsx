import { Button } from "@/components/ui/button";
import type { Link as LinkType } from "@/services/links/links.schemas";
import { buildShortenedUrl } from "@/utils/links.utils";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Link as LinkRouter } from "react-router";

interface LinkCardProps { link: LinkType; onDelete: (link: LinkType) => void; }
export function LinkCard({ link, onDelete }: LinkCardProps) {
  return (
    <div
      key={link.id}
      className="flex items-center gap-4 w-full"
    >
      <div className="flex flex-col w-0 flex-1 min-w-20">
        <LinkRouter to={buildShortenedUrl(link.slug)} className="truncate text-md text-blue-base">
          {buildShortenedUrl(link.slug)}
        </LinkRouter>
        <p className="truncate text-sm text-gray-500">
          {link.targetUrl}
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <p className="whitespace-nowrap text-sm text-gray-500">
          {link.accessCount} acesso{link.accessCount === 1 ? "" : "s"}
        </p>

        <div className="flex items-center gap-1">
          <Button variant="secondary" onClick={() => navigator.clipboard.writeText(buildShortenedUrl(link.slug))}>
            <CopyIcon />
          </Button>

          <Button variant="secondary" onClick={() => onDelete(link)}>
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}