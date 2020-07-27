/*
  Monte Carlo Tic-Tac-Toe Player
*/

import { switchPlayer } from './board';

const scoreCurrent = 2;
const scoreOther = 1;

const mcTrial = (board, player) => {
  // Plays a random game on a board starting with the given player.
  let emptySquares = board.getEmptySquares();
  while (board.checkWin() === null) {
    const randomSquare =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    emptySquares = emptySquares.filter((square) => square !== randomSquare);
    board.move(randomSquare, player);
    player = switchPlayer(player);
  }
};

const mcUpdateScores = (scores, board, player) => {
  // Update the scores grid based on the board and player.
  const finalState = board.checkWin();
  if (finalState === 'Draw') {
    for (let i = 0; i < board.getDim() ** 2; i++) {
      scores[i] += 0;
    }
  } else {
    for (let i = 0; i < board.getDim() ** 2; i++) {
      if (board.square(i) === player && finalState === player) {
        scores[i] += scoreCurrent;
      } else if (
        board.square(i) !== player &&
        board.square(i) !== null &&
        finalState === player
      ) {
        scores[i] -= scoreOther;
      } else if (board.square(i) === player && finalState !== player) {
        scores[i] -= scoreCurrent;
      } else if (
        board.square(i) !== player &&
        board.square(i) !== null &&
        finalState !== player
      ) {
        scores[i] += scoreOther;
      } else if (board.square(i) === null) {
        scores[i] += 0;
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
    if (scores[square] > maximumScore) {
      maximumScore = scores[square];
    }
  }
  for (let square of emptySquares) {
    if (scores[square] === maximumScore) {
      bestMoves.push(square);
    }
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
};

const mcMove = (board, player, trials) => {
  // Uses monti carlo simulation to run n number of trials using the above methods.
  const scores = Array(9).fill(0);
  for (let i = 0; i < trials; i++) {
    let clonedBoard = board.clone();
    mcTrial(clonedBoard, player);
    mcUpdateScores(scores, clonedBoard, player);
  }
  return getBestMove(board, scores);
};

export default mcMove;
