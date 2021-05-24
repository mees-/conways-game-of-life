import { useEffect, useReducer, useRef, useState } from "react"
import Grid from "./Grid"

const createGrid = (size, fill = false) =>
  new Array(size).fill(new Array(size).fill(fill))

function Game({ size, speed }) {
  const collectSurroundingIdxs = (y, x) => {
    const cells = []
    cells.push([y, x + 1])
    cells.push([y, x - 1])
    cells.push([y - 1, x])
    cells.push([y - 1, x - 1])
    cells.push([y - 1, x + 1])
    cells.push([y + 1, x])
    cells.push([y + 1, x - 1])
    cells.push([y + 1, x + 1])
    return cells.filter(([y, x]) => x >= 0 && y >= 0 && x < size && y < size)
  }
  const reduceNextState = (states, toggleCellOnClickByIdx) => {
    if (toggleCellOnClickByIdx != null) {
      const [changeY, changeX] = toggleCellOnClickByIdx
      return states.map((col, y) =>
        col.map((el, x) => {
          if (y === changeY && x === changeX) {
            return !el
          } else {
            return el
          }
        }),
      )
    } else {
      console.log("gameTick")
      return states.map((col, y) =>
        col.map((currentCell, x) => {
          const surrounding = collectSurroundingIdxs(y, x).map(
            ([y, x]) => states[y][x],
          )
          const liveNeighbours = surrounding.filter(cell => cell).length
          if (currentCell === false && liveNeighbours === 3) {
            return true // Dead cell with at least three live neighbours comes alive
          } else if (liveNeighbours > 1 && liveNeighbours < 4) {
            return true // Live cell with 2 or 3 live neigbours lives
          } else {
            return false // Live cell with 0, 1 or 4 or more live neighbours dies
          }
        }),
      )
    }
  }
  const [playing, setPlaying] = useState(false)

  const [states, tick] = useReducer(reduceNextState, createGrid(size))

  const handleCellClick = idx => {
    if (!playing) {
      tick(idx)
    }
  }

  const intervalRef = useRef()

  useEffect(() => {
    if (playing) {
      const id = setInterval(tick, speed)
      intervalRef.current = id
    } else {
      clearInterval(intervalRef.current)
    }
  }, [playing])

  return (
    <div>
      <button onClick={() => setPlaying(!playing)}>toggle playing</button>
      <Grid states={states} onCellClick={handleCellClick}></Grid>
    </div>
  )
}

export default Game
