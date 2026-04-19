import type { GameState, Player } from "@/lib/tic-tac-toe/core"

export type TicTacToePlayerLabels = Partial<Record<Player, string>>

/** Texto para la barra de estado (capa game / presentación, no reglas). */
export function ticTacToeStatusLabel(
  state: GameState,
  labels?: TicTacToePlayerLabels
): string {
  const playerLabel = (player: Player) => labels?.[player] ?? player

  if (state.winner === "draw") return "Empate."
  if (state.winner !== null)
    return `Ganador: ${playerLabel(state.winner)} (${state.winner}).`
  return `Turno: ${playerLabel(state.currentPlayer)} (${state.currentPlayer})`
}
