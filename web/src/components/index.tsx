import { Error404Vector, LogoIconVector, LogoVector } from "@/assets/vectors";
import { CopyIcon, DownloadSimpleIcon, LinkIcon, TrashIcon, WarningIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Components() {
  return (
    <>
      <Session title="Icons">
        <div className="flex gap-2 items-center">
          <CopyIcon size={24} />
          <TrashIcon size={24} />
          <WarningIcon size={24} />
          <DownloadSimpleIcon size={24} />
          <LinkIcon size={24} />
        </div>
      </Session>

      <Session title="Vectors">
        <div className="flex gap-2 items-center">
          <LogoIconVector />
          <LogoVector />
          <Error404Vector />
        </div>
      </Session>

      <Session title="Buttons">
        <Button>
          Label
        </Button>
        <Button disabled>
          Label
        </Button>

        <Button variant="secondary">
          <CopyIcon /> Label
        </Button>
        <Button variant="secondary" disabled>
          <CopyIcon /> Label
        </Button>

        <Button variant="secondary">
          <CopyIcon />
        </Button>
        <Button variant="secondary" disabled>
          <CopyIcon />
        </Button>
      </Session>

      <Session title="Inputs">
        <Input id="teste" placeholder="Placeholder" label="Título" />
        <Input errorMessage="Error message" id="teste" placeholder="Placeholder" label="Título" />
      </Session>

      <Session title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </Session>
    </>
  )
}

export function Session({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl space-y-4">
      <p className="text-xs underline">{title}</p>
      <div className="flex flex-wrap gap-4">
        {children}
      </div>
    </div>
  )
}