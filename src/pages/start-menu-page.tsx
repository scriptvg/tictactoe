  import { Link } from "react-router-dom"
  import { Gamepad2, Settings, Users } from "lucide-react"

  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { cn } from "@/lib/utils"
  import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

  function Page({
    className,
    ...props
  }: React.ComponentProps<"div"> & { className?: string }) {
    return <div className={cn(className)} {...props} />
  }

  export function StartMenuPage() {
    return (
      <Page className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Tres en raya
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Elige cómo quieres jugar
          </p>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Menú</CardTitle>
            <CardDescription>
              Partida local, multijugador online o ajustes.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Item asChild variant="muted">
              <Link to="/play/local">
                <ItemMedia variant="image" className="border">
                  <Gamepad2 className="size-5 shrink-0" aria-hidden />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Jugar</ItemTitle>
                  <ItemDescription>Offline · local en este dispositivo</ItemDescription>
                </ItemContent>
              </Link>
            </Item>
            <Item asChild variant="muted">
              <Link to="/multiplayer">
                <ItemMedia variant="image" className="border">
                  <Users className="size-5 shrink-0" aria-hidden />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Multijugador</ItemTitle>
                  <ItemDescription>Online · próximamente</ItemDescription>
                </ItemContent>
              </Link>
            </Item>
            <Item asChild variant="muted">
              <Link to="/settings">
                <ItemMedia variant="image" className="border">
                  <Settings className="size-5 shrink-0" aria-hidden />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Ajustes</ItemTitle>
                  <ItemDescription>Perfil propio · próx. configuración</ItemDescription>
                </ItemContent>
              </Link>
            </Item>
          </CardContent>
        </Card>
      </Page>
    )
  }
