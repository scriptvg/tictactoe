/**
 * Reglas puras del tres en raya: tipos y transiciones sin React, sin texto de UI.
 */

export type Player = "X" | "O"
export type CellValue = Player | null

export type Row = [CellValue, CellValue, CellValue]
export type Board = [Row, Row, Row]

export type GameOutcome = Player | "draw" | null

export type GameState = {
  cells: Board
  /** Who is allowed to move next; unchanged after game ends. */
  currentPlayer: Player
  winner: GameOutcome
  /** Positions that form the winning line, if any. */
  winningLine: [number, number][] | null
}

const WIN_LINES: [number, number][][] = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
]

export function emptyBoard(): Board {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
}

export function initialGameState(): GameState {
  return {
    cells: emptyBoard(),
    currentPlayer: "X",
    winner: null,
    winningLine: null,
  }
}

function evaluateBoard(
  board: Board
): Pick<GameState, "winner" | "winningLine"> {
  for (const line of WIN_LINES) {
    const [a, b, c] = line.map(([r, col]) => board[r][col])
    if (a !== null && a === b && b === c) {
      return { winner: a, winningLine: line }
    }
  }
  const full = board.every((row) => row.every((cell) => cell !== null))
  if (full) return { winner: "draw", winningLine: null }
  return { winner: null, winningLine: null }
}

export function tryMove(
  state: GameState,
  row: number,
  col: number
): GameState | null {
  if (state.winner !== null) return null
  if (row < 0 || row > 2 || col < 0 || col > 2) return null
  if (state.cells[row][col] !== null) return null

  const { cells, currentPlayer } = state
  const nextCells: Board = [
    [...cells[0]] as Row,
    [...cells[1]] as Row,
    [...cells[2]] as Row,
  ]
  nextCells[row][col] = currentPlayer

  const { winner, winningLine } = evaluateBoard(nextCells)

  return {
    cells: nextCells,
    currentPlayer:
      winner === null ? (currentPlayer === "X" ? "O" : "X") : currentPlayer,
    winner,
    winningLine,
  }
}
