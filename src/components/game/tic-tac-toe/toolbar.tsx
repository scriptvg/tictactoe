import { Button } from "@/components/ui/button"
import { RefreshCcw, Redo2, Undo2 } from "lucide-react"

type GameToolbarProps = {
  onRestart: () => void
  onUndo: () => void
  onRedo: () => void
  undoDisabled: boolean
  redoDisabled: boolean
  status: string
}

function GameToolbar({
  onRestart,
  onUndo,
  onRedo,
  undoDisabled,
  redoDisabled,
  status,
}: GameToolbarProps) {
  return (
    <div className="mx-auto mb-4 flex w-full flex-col items-center gap-3 border">
      <p className="text-center text-sm text-muted-foreground tabular-nums">
        {status}
      </p>
      <div className="flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-lg border border-border bg-card p-2 shadow-sm">
        <Button type="button" variant="outline" onClick={onRestart}>
          <RefreshCcw className="size-4" />
          Reiniciar
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={undoDisabled}
          onClick={onUndo}
        >
          <Undo2 className="size-4" />
          Deshacer
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={redoDisabled}
          onClick={onRedo}
        >
          <Redo2 className="size-4" />
          Rehacer
        </Button>
      </div>
    </div>
  )
}

export { GameToolbar }
