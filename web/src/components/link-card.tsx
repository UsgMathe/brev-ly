import { Button } from "@/components/ui/button";
import type { Link as LinkType } from "@/services/links/links.schemas";
import { buildShortenedUrl } from "@/utils/links.utils";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { toast } from "sonner";

interface LinkCardProps { link: LinkType; onDelete: (link: LinkType) => void; }
export function LinkCard({ link, onDelete }: LinkCardProps) {
  const [isCopying, setIsCopying] = useState(false);

  const copyLink = () => {
    try {
      navigator.clipboard.writeText(buildShortenedUrl(link.slug));
      setIsCopying(true);
      toast.info("Link copiado com sucesso", {
        description: `O link ${link.slug} foi copiado para a área de transferência`,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Erro ao copiar link", {
        description: `Não foi possível copiar o link ${link.slug} para a área de transferência`,
      });
      console.error(error);
    }

    setTimeout(() => setIsCopying(false), 3000);
  }

  return (
    <div
      key={link.id}
      className="flex items-center gap-4 w-full"
    >
      <div className="flex flex-col w-0 flex-1 min-w-20">
        <a
          href={`/${link.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-md text-blue-base"
        >
          {buildShortenedUrl(link.slug)}
        </a>
        <p className="truncate text-sm text-gray-500">
          {link.targetUrl}
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <p className="whitespace-nowrap text-sm text-gray-500">
          {link.accessCount} acesso{link.accessCount === 1 ? "" : "s"}
        </p>

        <div className="flex items-center gap-1">
          <Button variant="secondary" onClick={copyLink}>
            {
              isCopying ? (
                <CheckIcon />
              ) : (
                <CopyIcon />
              )
            }
          </Button>

          <Button variant="secondary" onClick={() => onDelete(link)}>
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}