import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuBoard } from '../../shared/sudoku-board';
import { Cell } from '../../shared/cell';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent {

  board: SudokuBoard = new SudokuBoard;
  activeNumber: any = undefined;

  isDone = false;
  isVisible: string = 'none';
  @Output('openNew') openPopup: EventEmitter<any> = new EventEmitter();

  @Input()
  level!: string | null;

  loadedBoard: any;
  solvedBorad: any;
  constructor(private service: SudokuService) { }


  ngOnChanges(changes: SimpleChanges) {
    if (this.level) {
      this.getboard(this.level);
    }
  }


  //Fetch the board with solved values to validate the board on the fly.
  getboard(level: string): void {
    this.isVisible = 'block';
    this.board = new SudokuBoard;
    forkJoin({
      //get the borad based on level
      resp: this.service.getBoard(level),

    }).subscribe({
      next: ({ resp }) => {
        let array1 = resp.board;
        this.loadedBoard = resp.board;
        //get the solved values based on board reponse so algorith will validate the user action on the fly
        this.service.solveBoard(resp).subscribe({
          next: (out) => {
            this.solvedBorad = out.solution;
            let array2 = out.solution
            this.bindCell(array1, array2);
            this.isVisible = 'none';
          },
          error: (error) => {
            console.error('Error in second API call:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error in one of the API calls:', error);
      },
    });
  }


  setActive(button: any, number: number): void {
    if (this.activeNumber == number) {
      this.activeNumber = undefined;
    } else {
      this.activeNumber = number;
    }
  }

  onCellSelect(cell: Cell): void {
    if (this.activeNumber == -1 || cell.guess == this.activeNumber) {
      if (cell.guess == undefined)
        alert("Please select the number from the below and then try to map the cell.")

      cell.makeGuess(undefined);

    } else {
      cell.makeGuess(this.activeNumber);
    }

    if (document.getElementsByClassName('incomplete').length == 0) {
      this.isDone = true;
      alert("Done")
    }
  }

  solvedBoard(): void {
    this.board = new SudokuBoard;
    let array2 = this.solvedBorad
    array2.forEach((row: any[], rowIndex: number) => {
      let cell: Cell[] = [];
      row.forEach((element, colIndex) => {
        cell.push(
          {
            value: array2[rowIndex][colIndex],
            row: rowIndex,
            col: colIndex,
            isVisible: element === 0,
            guess: array2[rowIndex][colIndex],
            makeGuess(guess: any) {
              this.guess = guess;
            },
            highlight() {
              return this.guess == undefined || this.guess === this.value;
            },
            isRight() {
              return this.isVisible || this.guess === this.value;
            }
          })

      });
      this.board.cells.push(cell);
    });
  }

  validateBoard(): void {
    var data = this.getUserData();

    this.service.validateBoard(data).subscribe(resp => {
      alert(resp.status)
    });

  }

  bindCell(array1: any, array2: any): void {
    array1.forEach((row: any[], rowIndex: number) => {
      let cell: Cell[] = [];
      row.forEach((element, colIndex) => {
        cell.push(
          {
            value: array2[rowIndex][colIndex],
            row: rowIndex,
            col: colIndex,
            isVisible: element === 0,
            guess: null,
            makeGuess(guess: any) {
              this.guess = guess;
            },
            highlight() {
              return this.guess == undefined || this.guess === this.value;
            },
            isRight() {
              return this.isVisible || this.guess === this.value;
            }
          })

      });
      this.board.cells.push(cell);
    });
  }

  openNew(): void {
    this.openPopup.emit();
  }

  getUserData(): any[][] {
    let res: any[][] = [];
    this.board.cells.forEach((element, colIndex) => {
      let oneDimensionalArray = element.map(obj => obj.guess);
      res.push(oneDimensionalArray);
    });

    return res;
  }
}
