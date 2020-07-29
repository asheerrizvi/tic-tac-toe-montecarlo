/*
  Provided Code for Tic-Tac-Toe
*/

export class TTTBoard {
  // Class to represent a Tic-Tac-Toe Board.
  constructor(dim, board = null) {
    /*
      Initialize the TTTBoard object with the given dimension.
    */
    this.dim = dim;
    this.board = board !== null ? board : Array(this.dim ** 2).fill(null);
  }

  toString() {
    let rep = '';
    let count = 0;
    for (let i = 0; i < this.dim ** 2; i++) {
      rep += this.board[i] ? this.board[i] : ' ';
      if (count === 2) {
        count = 0;
        rep += '\n';
        if (i !== this.dim ** 2 - 1) rep += '---------';
        rep += '\n';
      } else {
        rep += ' | ';
        count++;
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

  square(index) {
    /*
      Returns one of the three constants EMPTY, PLAYERX or PLAYERO
      that correspond to the contents of the board at position (row, col).
    */
    return this.board[index];
  }

  getEmptySquares() {
    // Return a list of (row, col) tuples for all empty squares
    const emptySquares = [];
    for (let i = 0; i < this.dim ** 2; i++) {
      if (this.board[i] === null) {
        emptySquares.push(i);
      }
    }
    return emptySquares;
  }

  move(index, player) {
    /*
      Place player on the board at position (row, col).
      player should be either the constant PLAYERX or PLAYERO.
      Does nothing if board square is not empty.
    */
    if (this.board[index] === null) this.board[index] = player;
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
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    // Game is either a draw or still in progress.
    return this.getEmptySquares().length === 0 ? 'Draw' : null;
  }

  clone() {
    return new TTTBoard(this.dim, [...this.board]);
  }
}

/*
  Convenience function to switch players.
  Returns other player.
*/
export const switchPlayer = (player) => (player === 'X' ? 'O' : 'X');

// Function to play a game with two MC players.
export const playGame = (mcMoveFunction, ntrials) => {
  // Setup game
  const board = new TTTBoard(3);
  let currentPlayer = 'X';
  let winner = null;

  // Run a game
  while (winner === null) {
    // Move
    const [index] = mcMoveFunction(board, currentPlayer, ntrials);
    board.move(index, currentPlayer);

    // Update state
    winner = board.checkWin();
    currentPlayer = switchPlayer(currentPlayer);

    // Display board
    // console.log(board);
    // console.log("========================");
  }

  // Print winner
  // if (winner === playerX) console.log("X Wins!");
  // else if (winner === playerO) console.log("O Wins!");
  // else if (winner === draw) console.log("Tie!");
  // else console.log("Error: Unknown number!");
};
