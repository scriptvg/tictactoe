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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function Page({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  return <div className={cn(className)} {...props} />
}

export function SettingsPage() {
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
          <CardTitle>Ajustes</CardTitle>
          <CardDescription>
            Perfil propio y preferencias. Más opciones próximamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="display-name">Nombre para mostrar</Label>
            <Input
              id="display-name"
              placeholder="Cómo te verán otros jugadores"
              disabled
              aria-describedby="settings-hint"
            />
            <p id="settings-hint" className="text-xs text-muted-foreground">
              Persistencia y cuenta: próxima configuración.
            </p>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}
