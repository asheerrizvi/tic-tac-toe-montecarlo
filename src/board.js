/*
  Provided Code for Tic-Tac-Toe
*/

import { has } from "lodash-es";

// Constants
export const empty = 1;
export const playerX = 2;
export const playerO = 3;
export const draw = 4;

// Map player constants to letters for printing
const strMap = {
  1: " ",
  2: "X",
  3: "O",
};

export class TTTBoard {
  // Class to represent a Tic-Tac-Toe Board.
  constructor(dim, board = null) {
    /*
      Initialize the TTTBoard object with the given dimension.
    */
    this.dim = dim;
    this.board =
      board !== null
        ? (this.board = Array.from(board))
        : Array(3).fill(Array(3).fill(empty));
  }

  toString() {
    let rep = "";
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        let charAtPosition = this.board[i][j];
        rep += strMap[charAtPosition];
        if (j === this.dim - 1) {
          rep += "\n";
        } else {
          rep += " | ";
        }
      }
      if (i !== this.dim - 1) {
        rep += "----------";
        rep += "\n";
      }
    }
    return rep;
  }

  getDim() {
    // Return the dimension of the board.
    return this.dim;
  }

  getBoard() {
    // Return the current board.
    return [...this.board];
  }

  square(row, col) {
    /*
      Returns one of the three constants EMPTY, PLAYERX or PLAYERO
      that correspond to the contents of the board at position (row, col).
    */
    return this.board[row][col];
  }

  getEmptySquares() {
    // Return a list of (row, col) tuples for all empty squares
    const emptySquares = [];
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        if (this.board[i][j] === empty) {
          emptySquares.push([i, j]);
        }
      }
    }
    return emptySquares;
  }

  move(row, col, player) {
    /*
      Place player on the board at position (row, col).
      player should be either the constant PLAYERX or PLAYERO.
      Does nothing if board square is not empty.
    */
    if (this.board[row][col] === empty) {
      this.board[row][col] = player;
    }
  }

  checkWin() {
    /*
      Returns a constant associated with the state of the game
      If PLAYERX wins, returns PLAYERX.
      If PLAYERO wins, returns PLAYERO.
      If game is drawn, returns DRAW.
      If game is in progress, returns None.
    */
    const board = this.board;
    const lines = [
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
    ];

    // Check all the lines.
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]];
      }
    }

    // Game is either a draw or still in progress.
    return this.getEmptySquares().length === 0 ? draw : null;
  }

  clone() {
    return new TTTBoard(this.dim, has.cloneDeep(this.board));
  }
}

/*
  Convenience function to switch players.
  Returns other player.
*/
export const switchPlayer = (player) =>
  player === playerX ? playerO : playerX;

// Function to play a game with two MC players.
export const playGame = (mcMoveFunction, ntrials) => {
  // Setup game
  const board = new TTTBoard(3);
  let currentPlayer = playerX;
  let winner = null;

  // Run a game
  while (winner === null) {
    // Move
    const [row, col] = mcMoveFunction(board, currentPlayer, ntrials);
    board.move(row, col, currentPlayer);

    // Update state
    winner = board.checkWin();
    currentPlayer = switchPlayer(currentPlayer);

    // Display board
    console.log(board);
    console.log("========================");
  }

  // Print winner
  if (winner === playerX) console.log("X Wins!");
  else if (winner === playerO) console.log("O Wins!");
  else if (winner === draw) console.log("Tie!");
  else console.log("Error: Unknown number!");
};
