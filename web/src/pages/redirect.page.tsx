import { useParams } from "react-router";

import { Error404Vector, LogoIconVector } from "@/assets/vectors";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env";
import { useIncrementLinkAccessCount, useLinkBySlug } from "@/services/links/links.queries";

export function RedirectPage() {
  const { slug } = useParams();
  if (!slug) return <div>Slug not found</div>

  const link = useLinkBySlug(slug, {
    onSuccess: (data) => incrementAccessCount.mutateAsync(data.id),
  });

  const incrementAccessCount = useIncrementLinkAccessCount({
    onSuccess: (data) => window.location.replace(data.targetUrl)
  });


  if (link.isError || incrementAccessCount.isError) return (
    <div className="px-3 h-dvh flex items-center justify-center">
      <Card className="w-full max-w-md py-12">
        <CardContent className="flex flex-col items-center gap-6 text-center">
          <Error404Vector className="w-40" />
          <h1 className="text-xl">Link não encontrado</h1>

          <p className="text-md text-gray-500">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em{' '}
            <a href={"/"} className="text-blue-base underline">brev.ly</a>.</p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="px-3 h-dvh flex items-center justify-center">
      <Card className="w-full max-w-md py-12">
        <CardContent className="flex flex-col items-center gap-6 text-center">
          <LogoIconVector className="w-16" />
          <h1 className="text-xl">Redirecionando...</h1>

          <div className="text-md text-gray-500 space-y-1">
            <p>O link será aberto automaticamente em alguns instantes.</p>
            <p>Não foi redirecionado?{' '}
              <a href={link.data?.targetUrl} className="text-blue-base underline">Acesse aqui</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}