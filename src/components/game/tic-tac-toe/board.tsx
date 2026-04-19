import { Fragment } from "react"

import { type GameState } from "@/lib/tic-tac-toe/core"

export type GameBoardRenderCellProps = {
  cell: GameState["cells"][number][number]
  rowIndex: number
  colIndex: number
}

type GameBoardProps = {
  cells: GameState["cells"]
  toolbar?: React.ReactNode
  renderCell: (props: GameBoardRenderCellProps) => React.ReactNode
}

function GameBoard({ cells, renderCell, toolbar }: GameBoardProps) {
  return (
    <div className="relative">
      {toolbar}
      <div className="mx-auto grid max-w-fit grid-cols-3 gap-4 rounded-lg border border-border bg-card p-2 shadow-sm">
        {cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Fragment key={`${rowIndex}-${colIndex}`}>
              {renderCell({ cell, rowIndex, colIndex })}
            </Fragment>
          ))
        )}
      </div>
    </div>
  )
}

export { GameBoard }
