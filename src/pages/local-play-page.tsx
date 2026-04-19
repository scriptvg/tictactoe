import { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { GameBoard, GameCell, GameToolbar } from "@/components/game/tic-tac-toe"
import { ticTacToeStatusLabel, useTicTacToeSession } from "@/game/tic-tac-toe"
import type { Player } from "@/lib/tic-tac-toe/core"
import {
  pickAiMove,
  type TicTacToeAiStrategy,
} from "@/lib/tic-tac-toe/ai"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Page({
  className,
  ...props
}: React.ComponentProps<"div"> & {
  className?: string
}) {
  return <div className={cn(className)} {...props} />
}

type PlayerKind = "human" | "cpu"

type PlayerProfile = {
  name: string
  kind: PlayerKind
  cpuStrategy?: TicTacToeAiStrategy
}

type PlayerProfiles = Record<Player, PlayerProfile>

type GameMode = "pvp" | "pvcpu" | "pvminimax" | "pvminimax_ab"

export function LocalPlayPage() {
  const { gameState, play, restart, undo, redo, canUndo, canRedo } =
    useTicTacToeSession()

  const [started, setStarted] = useState(false)
  const [mode, setMode] = useState<GameMode>("pvp")
  const [players, setPlayers] = useState<PlayerProfiles>({
    X: { name: "", kind: "human" },
    O: { name: "", kind: "human" },
  })

  const winningKeys = useMemo(() => {
    if (!gameState.winningLine) return new Set<string>()
    return new Set(gameState.winningLine.map(([r, c]) => `${r}-${c}`))
  }, [gameState.winningLine])

  const onCellClick = useCallback(
    (row: number, col: number) => {
      play(row, col)
    },
    [play]
  )

  const currentPlayerProfile = players[gameState.currentPlayer]
  const cpuTurn = started && currentPlayerProfile.kind === "cpu"

  useEffect(() => {
    if (!started) return
    if (gameState.winner !== null) return
    const profile = players[gameState.currentPlayer]
    if (profile.kind !== "cpu") return

    const move = pickAiMove(gameState, profile.cpuStrategy ?? "random")
    if (!move) return

    const t = window.setTimeout(() => play(move.row, move.col), 350)
    return () => window.clearTimeout(t)
  }, [
    started,
    gameState.winner,
    gameState.currentPlayer,
    gameState.cells,
    players,
    play,
  ])

  const playerLabels = useMemo(
    () => ({
      X: players.X.name.trim() || "Jugador X",
      O:
        players.O.name.trim() ||
        (players.O.kind === "cpu"
          ? players.O.cpuStrategy === "minimax_ab"
            ? "Minimax (poda alta)"
            : players.O.cpuStrategy === "minimax"
              ? "Minimax"
              : "CPU"
          : "Jugador O"),
    }),
    [players.X.name, players.O.name, players.O.kind, players.O.cpuStrategy]
  )

  if (!started) {
    const startGame = () => {
      const xName = players.X.name
      const oName = players.O.name

      setPlayers((prev) => {
        if (mode === "pvp") {
          return {
            X: { ...prev.X, kind: "human", cpuStrategy: undefined, name: xName },
            O: { ...prev.O, kind: "human", cpuStrategy: undefined, name: oName },
          }
        }

        const cpuStrategy: TicTacToeAiStrategy =
          mode === "pvminimax_ab"
            ? "minimax_ab"
            : mode === "pvminimax"
              ? "minimax"
              : "random"

        return {
          X: { ...prev.X, kind: "human", cpuStrategy: undefined, name: xName },
          O: {
            ...prev.O,
            kind: "cpu",
            cpuStrategy,
            name: "",
          },
        }
      })

      restart()
      setStarted(true)
    }

    return (
      <Page className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="mb-4 w-full max-w-lg">
          <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
            <Link to="/">
              <ArrowLeft className="size-4" aria-hidden />
              Menú
            </Link>
          </Button>
        </div>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Configurar partida</CardTitle>
            <CardDescription>
              Elige el modo y los nombres. El jugador 2 solo aplica en PvP.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="game-mode">Modo</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as GameMode)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un modo" />
                </SelectTrigger>
                <SelectContent position="popper" align="start">
                  <SelectItem value="pvp">Jugador vs Jugador</SelectItem>
                  <SelectItem value="pvcpu">Jugador vs CPU</SelectItem>
                  <SelectItem value="pvminimax">Jugador vs Minimax</SelectItem>
                  <SelectItem value="pvminimax_ab">
                    Jugador vs Minimax (poda alta)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="player-x-name">Jugador 1 (X)</Label>
              <Input
                id="player-x-name"
                value={players.X.name}
                placeholder="Ej: Ana"
                onChange={(e) =>
                  setPlayers((prev) => ({
                    ...prev,
                    X: { ...prev.X, name: e.target.value },
                  }))
                }
              />
            </div>

            {mode === "pvp" && (
              <div className="grid gap-1.5">
                <Label htmlFor="player-o-name">Jugador 2 (O)</Label>
                <Input
                  id="player-o-name"
                  value={players.O.name}
                  placeholder="Ej: Bruno"
                  onChange={(e) =>
                    setPlayers((prev) => ({
                      ...prev,
                      O: { ...prev.O, name: e.target.value },
                    }))
                  }
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t">
            <Button type="button" onClick={startGame}>
              Empezar
            </Button>
          </CardFooter>
        </Card>
      </Page>
    )
  }

  return (
    <Page className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="w-full max-w-fit">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden />
            Menú
          </Link>
        </Button>
      </div>
      <GameBoard
        toolbar={
          <GameToolbar
            onRestart={restart}
            onUndo={undo}
            onRedo={redo}
            undoDisabled={!canUndo}
            redoDisabled={!canRedo}
            status={ticTacToeStatusLabel(gameState, playerLabels)}
          />
        }
        cells={gameState.cells}
        renderCell={({ cell, rowIndex, colIndex }) => (
          <GameCell
            value={cell}
            winning={winningKeys.has(`${rowIndex}-${colIndex}`)}
            disabled={cell !== null || gameState.winner !== null || cpuTurn}
            aria-label={`Celda fila ${rowIndex + 1}, columna ${colIndex + 1}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        )}
      />
    </Page>
  )
}
