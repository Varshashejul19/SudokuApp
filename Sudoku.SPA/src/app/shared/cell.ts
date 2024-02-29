export class Cell {
  value!: number;
  guess!: number|null; 
  row: number;
  col: number;

  isVisible: boolean;

  constructor (value: number, row: number, col: number, isVisible: boolean) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.isVisible = isVisible;
  }

  makeGuess(guess: any) {
    this.guess = guess;
  }

  highlight() {
    return this.guess == undefined || this.guess === this.value;
  }

  isRight() {
    return this.isVisible || this.guess === this.value;
  }
}
