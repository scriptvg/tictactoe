import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

function Page({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  return <div className={cn(className)} {...props} />
}

export function MultiplayerPage() {
  return (
    <Page className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-4 w-full max-w-md">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden />
            Menú
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Multijugador online</CardTitle>
          <CardDescription>
            Partidas en red contra otras personas. Próximamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Aquí podrás emparejar, salas y sincronización en tiempo real cuando
          esté listo el backend.
        </CardContent>
      </Card>
    </Page>
  )
}
