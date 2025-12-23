import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InView } from "react-intersection-observer";

import { useCreateLink, useDeleteLink, useExportLinks, usePaginatedLinks } from "@/services/links/links.queries";
import { createLinkSchema, type CreateLinkDTO, type Link } from "@/services/links/links.schemas";

import { LogoVector } from "@/assets/vectors";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { LinkCard } from "@/components/link-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { apiErrorToast } from "@/utils/api.utils";
import { DownloadSimpleIcon, LinkIcon, SpinnerIcon } from "@phosphor-icons/react";

export function HomePage() {
  const paginatedLinks = usePaginatedLinks({ perPage: 10 });

  const createLink = useCreateLink({
    onSuccess: () => {
      createLinkForm.reset();
    },
    onError: (error) => {
      const axiosError = apiErrorToast(error, {
        title: "Erro no cadastro",
        description: "Erro no cadastro",
      });

      if (axiosError?.response?.status === 409) {
        createLinkForm.setError("slug", {
          type: "manual",
          message: axiosError?.response?.data.message,
        });
      }
    }
  });

  const deleteLink = useDeleteLink({
    onError: (error) => apiErrorToast(error, {
      title: "Erro na exclusão",
      description: "Erro na exclusão",
    })
  });

  const exportLink = useExportLinks({
    onSuccess: ({ reportUrl }) => {
      const link = document.createElement("a");
      link.href = reportUrl;
      link.click();
      link.remove();
    },
    onError: (error) => apiErrorToast(error, {
      title: "Erro na exportação",
      description: "Erro na exportação",
    })
  });

  const linksList = paginatedLinks.data?.pages.map((page) => page.links).flat();

  const createLinkForm = useForm({
    resolver: zodResolver(createLinkSchema),
    mode: "onChange",
  })

  const submitCreateLink = (data: CreateLinkDTO) => createLink.mutateAsync(data);

  const [linkToDelete, setLinkToDelete] = useState<Link | null>(null);

  const handleDeleteLink = (link: Link) => {
    setLinkToDelete(link);
  }

  const handleDeleteLinkClose = () => {
    setLinkToDelete(null);
  }

  const handleDeleteLinkConfirm = () => {
    linkToDelete && deleteLink.mutateAsync(linkToDelete.id);
    handleDeleteLinkClose();
  }

  return (
    <div className="py-8 px-3 grid">

      <ConfirmationDialog
        open={!!linkToDelete}
        confirmation={{
          label: "Apagar",
          onClick: handleDeleteLinkConfirm,
        }}
        cancellation={{
          label: "Cancelar",
          onClick: () => handleDeleteLinkClose(),
        }}
        title="Apagar link?"
        description={`Você realmente quer apagar o link "${linkToDelete?.slug}"?`}
      />


      <LogoVector className="w-28 mb-5 mx-auto" />

      <div className="flex flex-col gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Novo link</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={createLinkForm.handleSubmit(submitCreateLink)}>
              <Input
                id="targetUrl"
                label="Link original"
                placeholder="https://exemplo.com.br"
                errorMessage={createLinkForm.formState.errors.targetUrl?.message}
                disabled={createLinkForm.formState.isSubmitting}
                {...createLinkForm.register("targetUrl")}
              />

              <Input
                id="slug"
                label="Link encurtado"
                errorMessage={createLinkForm.formState.errors.slug?.message}
                disabled={createLinkForm.formState.isSubmitting}
                prefix={`${env.VITE_FRONTEND_URL}/`}
                {...createLinkForm.register("slug")}
              />

              <Button
                type="submit"
                className="w-full mt-1"
                disabled={createLinkForm.formState.isSubmitting}
              >
                {
                  createLinkForm.formState.isSubmitting ? (
                    <>
                      <SpinnerIcon className="animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <span>Salvar link</span>
                    </>
                  )
                }
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-full flex justify-between items-center gap-2">
              <CardTitle>Meus links</CardTitle>
              <Button
                variant="secondary"
                disabled={paginatedLinks.isLoading || linksList?.length === 0 || exportLink.isPending}
                onClick={() => exportLink.mutateAsync()}
              >
                {
                  exportLink.isPending ? (
                    <>
                      <SpinnerIcon className="animate-spin" />
                      <span>Baixando...</span>
                    </>
                  ) : (
                    <>
                      <DownloadSimpleIcon />
                      <span>Baixar CSV</span>
                    </>
                  )
                }
              </Button>
            </div>
          </CardHeader>

          <CardContent >
            <div className="space-y-4">
              <Separator />

              <div className="space-y-3">
                {
                  paginatedLinks.isLoading ? (
                    <div className="px-4 py-6 flex flex-col items-center gap-3 animate-pulse">
                      <SpinnerIcon className="size-8 text-gray-400 animate-spin" />
                      <p className="text-center text-xs text-gray-500">Carregando links...</p>
                    </div>
                  ) :
                    linksList?.length === 0 ? (
                      <div className="px-4 py-6 flex flex-col items-center gap-3">
                        <LinkIcon className="size-8 text-gray-400" />
                        <p className="text-center text-xs text-gray-500">Ainda não existem links cadastrados</p>
                      </div>
                    ) :
                      (
                        <>
                          {linksList?.map((link, index) => (
                            <React.Fragment key={link.id}>
                              <LinkCard link={link} onDelete={handleDeleteLink} />

                              {
                                index !== linksList?.length - 1 && (
                                  <Separator aria-hidden={index === linksList?.length - 1} className="aria-hidden:hidden" />
                                )
                              }
                            </React.Fragment>
                          ))}

                          {
                            paginatedLinks.isFetchingNextPage && (
                              <div className="px-4 py-6 flex flex-col items-center gap-3 animate-pulse">
                                <SpinnerIcon className="size-8 text-gray-400 animate-spin" />
                                <p className="text-center text-xs text-gray-500">Carregando links...</p>
                              </div>
                            )
                          }

                          {
                            !paginatedLinks.isFetchingNextPage && paginatedLinks.hasNextPage && (
                              <InView onChange={(inView) => inView && paginatedLinks.fetchNextPage()} />
                            )
                          }
                        </>
                      )
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div >
    </div >
  );
}
