import styles from "./Grid.module.css"
import GridCell from "./GridCell"

const Grid = ({ states, onCellClick }) => (
  <div
    className={styles.grid}
    style={{
      gridTemplateRows: `repeat(${states.length}, 1fr)`,
      gridTemplateColumns: `repeat(${states.length}, 1fr)`,
    }}
  >
    {states
      .map((row, y) => row.map((el, x) => [el, [y, x]]))
      .flat()
      .map(([state, idx]) => (
        <GridCell
          key={idx}
          state={state}
          onClickHandler={() => onCellClick(idx)}
        />
      ))}
  </div>
)

export default Grid

const isInteger = x => x === Math.floor(x)
const isSquare = arr => {
  for (const col of arr) {
    if (col.length !== arr.length) {
      return false
    }
  }
  return true
}
