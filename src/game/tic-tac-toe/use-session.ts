import { useCallback, useState } from "react"
import {
  createInitialSession,
  sessionAfterPlay,
  sessionAfterRedo,
  sessionAfterRestart,
  sessionAfterUndo,
  sessionCurrentState,
  type TicTacToeSession,
} from "./session"

/**
 * Estado de React para una partida: reglas en core + línea temporal aquí
 * (deshacer / rehacer / reiniciar).
 */
export function useTicTacToeSession() {
  const [session, setSession] = useState<TicTacToeSession>(createInitialSession)

  const gameState = sessionCurrentState(session)

  const play = useCallback((row: number, col: number) => {
    setSession((prev) => sessionAfterPlay(prev, row, col) ?? prev)
  }, [])

  const restart = useCallback(() => {
    setSession(sessionAfterRestart())
  }, [])

  const undo = useCallback(() => {
    setSession((prev) => sessionAfterUndo(prev))
  }, [])

  const redo = useCallback(() => {
    setSession((prev) => sessionAfterRedo(prev))
  }, [])

  return {
    gameState,
    play,
    restart,
    undo,
    redo,
    canUndo: session.activeIndex > 0,
    canRedo: session.activeIndex < session.timeline.length - 1,
  }
}
