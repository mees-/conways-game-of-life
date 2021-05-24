export default class SquareGrid {
  constructor(size, fill) {
    this.data = new Array(size).fill(new Array(size).fill(fill))
  }
}
