import styles from "./GridCell.module.css"

// state is boolean, true is alive, false is dead
const GridCell = ({ state, onClickHandler }) => (
  <div
    className={styles.gridCell}
    style={{
      backgroundColor: state ? "black" : "grey",
    }}
    onClick={onClickHandler}
  ></div>
)

export default GridCell
