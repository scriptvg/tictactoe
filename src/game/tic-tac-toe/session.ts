import {
  initialGameState,
  tryMove,
  type GameState,
} from "@/lib/tic-tac-toe/core"

/**
 * Una sesión es una partida con línea temporal: cada jugada válida añade
 * un `GameState` al final; deshacer/rehacer solo mueven el índice activo.
 */
export type TicTacToeSession = {
  timeline: GameState[]
  activeIndex: number
}

export function createInitialSession(): TicTacToeSession {
  return { timeline: [initialGameState()], activeIndex: 0 }
}

export function sessionCurrentState(session: TicTacToeSession): GameState {
  return session.timeline[session.activeIndex]!
}

export function sessionAfterPlay(
  session: TicTacToeSession,
  row: number,
  col: number
): TicTacToeSession | null {
  const present = session.timeline[session.activeIndex]!
  const next = tryMove(present, row, col)
  if (!next) return null
  const prefix = session.timeline.slice(0, session.activeIndex + 1)
  return {
    timeline: [...prefix, next],
    activeIndex: prefix.length,
  }
}

export function sessionAfterRestart(): TicTacToeSession {
  return createInitialSession()
}

export function sessionAfterUndo(session: TicTacToeSession): TicTacToeSession {
  if (session.activeIndex <= 0) return session
  return { ...session, activeIndex: session.activeIndex - 1 }
}

export function sessionAfterRedo(session: TicTacToeSession): TicTacToeSession {
  if (session.activeIndex >= session.timeline.length - 1) return session
  return { ...session, activeIndex: session.activeIndex + 1 }
}
