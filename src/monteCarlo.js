/*
  Monte Carlo Tic-Tac-Toe Player
*/

import { switchPlayer, empty, draw } from "./board";

const scoreCurrent = 2;
const scoreOther = 1;

const moveMap = {};
moveMap[[0, 0]] = 0;
moveMap[[0, 1]] = 1;
moveMap[[0, 2]] = 2;
moveMap[[1, 0]] = 3;
moveMap[[1, 1]] = 4;
moveMap[[1, 2]] = 5;
moveMap[[2, 0]] = 6;
moveMap[[2, 1]] = 7;
moveMap[[2, 2]] = 8;

const mcTrial = (board, player) => {
  // Plays a random game on a board starting with the given player.
  let emptySquares = board.getEmptySquares();
  while (board.checkWin() === null) {
    const randomSquare =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    emptySquares = emptySquares.filter((square) => square !== randomSquare);
    board.move(randomSquare[0], randomSquare[1], player);
    player = switchPlayer(player);
  }
};

const mcUpdateScores = (scores, board, player) => {
  // Update the scores grid based on the board and player.
  const finalState = board.checkWin();
  if (finalState === draw) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        scores[i][j] += 0;
      }
    }
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board.square(i, j) === player && finalState === player) {
          scores[i][j] += scoreCurrent;
        } else if (
          board.square(i, j) !== player &&
          board.square(i, j) !== empty &&
          finalState === player
        ) {
          scores[i][j] -= scoreOther;
        } else if (board.square(i, j) === player && finalState !== player) {
          scores[i][j] -= scoreCurrent;
        } else if (
          board.square(i, j) !== player &&
          board.square(i, j) !== empty &&
          finalState !== player
        ) {
          scores[i][j] += scoreOther;
        } else if (board.square(i, j) === empty) {
          scores[i][j] += 0;
        }
      }
    }
  }
};

const getBestMove = (board, scores) => {
  // Returns the best possible move based on the scores grid.
  const emptySquares = board.getEmptySquares();
  let maximumScore = -1000;
  const bestMoves = [];
  for (let square of emptySquares) {
    if (scores[square[0]][square[1]] > maximumScore) {
      maximumScore = scores[square[0]][square[1]];
    }
  }
  for (let square of emptySquares) {
    if (scores[square[0]][square[1]] === maximumScore) {
      bestMoves.push([square[0], square[1]]);
    }
  }
  return moveMap[bestMoves[Math.floor(Math.random() * bestMoves.length)]];
};

const mcMove = (board, player, trials) => {
  // Uses monti carlo simulation to run n number of trials using the above methods.
  const scores = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < trials; i++) {
    let clonedBoard = board.clone();
    mcTrial(clonedBoard, player);
    mcUpdateScores(scores, clonedBoard, player);
  }
  return getBestMove(board, scores);
};

export default mcMove;
