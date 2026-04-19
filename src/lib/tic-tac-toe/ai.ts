import { tryMove, type GameState, type Player } from "./core"

export type TicTacToeAiStrategy = "random" | "minimax" | "minimax_ab"

export type Move = { row: number; col: number }

function otherPlayer(player: Player): Player {
  return player === "X" ? "O" : "X"
}

function availableMoves(state: GameState): Move[] {
  if (state.winner !== null) return []
  const moves: Move[] = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (state.cells[r][c] === null) moves.push({ row: r, col: c })
    }
  }
  return moves
}

function scoreTerminal(winner: GameState["winner"], maximizing: Player): number {
  if (winner === "draw") return 0
  if (winner === maximizing) return 1
  return -1
}

function minimax(
  state: GameState,
  maximizing: Player,
  toMove: Player
): number {
  if (state.winner !== null) return scoreTerminal(state.winner, maximizing)

  const moves = availableMoves(state)
  if (moves.length === 0) return 0

  const isMax = toMove === maximizing
  let best = isMax ? -Infinity : Infinity

  for (const m of moves) {
    const next = tryMove(state, m.row, m.col)
    if (!next) continue
    const v = minimax(next, maximizing, otherPlayer(toMove))
    best = isMax ? Math.max(best, v) : Math.min(best, v)
  }

  return best
}

function minimaxAlphaBeta(
  state: GameState,
  maximizing: Player,
  toMove: Player,
  alpha: number,
  beta: number
): number {
  if (state.winner !== null) return scoreTerminal(state.winner, maximizing)

  const moves = availableMoves(state)
  if (moves.length === 0) return 0

  const isMax = toMove === maximizing
  let best = isMax ? -Infinity : Infinity

  for (const m of moves) {
    const next = tryMove(state, m.row, m.col)
    if (!next) continue
    const v = minimaxAlphaBeta(
      next,
      maximizing,
      otherPlayer(toMove),
      alpha,
      beta
    )
    if (isMax) {
      best = Math.max(best, v)
      alpha = Math.max(alpha, best)
      if (alpha >= beta) break
    } else {
      best = Math.min(best, v)
      beta = Math.min(beta, best)
      if (alpha >= beta) break
    }
  }

  return best
}

export function pickAiMove(
  state: GameState,
  strategy: TicTacToeAiStrategy
): Move | null {
  const moves = availableMoves(state)
  if (moves.length === 0) return null

  if (strategy === "random") {
    return moves[Math.floor(Math.random() * moves.length)]!
  }

  const maximizing = state.currentPlayer
  let bestMoves: Move[] = []
  let bestScore = -Infinity

  for (const m of moves) {
    const next = tryMove(state, m.row, m.col)
    if (!next) continue
    const score =
      strategy === "minimax_ab"
        ? minimaxAlphaBeta(next, maximizing, otherPlayer(maximizing), -1, 1)
        : minimax(next, maximizing, otherPlayer(maximizing))

    if (score > bestScore) {
      bestScore = score
      bestMoves = [m]
    } else if (score === bestScore) {
      bestMoves.push(m)
    }
  }

  if (bestMoves.length === 0) return moves[0] ?? null
  return bestMoves[Math.floor(Math.random() * bestMoves.length)]!
}

