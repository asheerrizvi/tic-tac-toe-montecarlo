import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/normalize.css";
import "./styles/skeleton.css";

import { TTTBoard } from "./board";
import mcMove from "./monteCarlo";

const Square = (props) => {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      xIsUser: true,
    };
    this.state = this.initialState;
  }

  updateHistory(history, squares, xIsNext) {
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: xIsNext,
    });
  }

  getMachineMove(squares) {
    const machinePlayer = this.state.xIsUser ? "O" : "X";
    const tttBoard = new TTTBoard(3, squares);
    const bestMove = mcMove(tttBoard, machinePlayer, 100);
    squares[bestMove] = machinePlayer;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsUser ? "X" : "O";
    this.getMachineMove(squares);
    this.updateHistory(history, squares, !!this.state.xIsNext);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  changeUser(event) {
    const xIsUser = event.target.value === "X" ? true : false;
    this.setState({ xIsUser: xIsUser });
    if (xIsUser === "X") {
      this.setState({ xIsNext: true });
    } else {
      this.setState({ xIsNext: false });
    }
  }

  newGame(event) {
    event.preventDefault();
    this.setState((state) => ({
      ...this.initialState,
      xIsNext: state.xIsNext,
      xIsUser: state.xIsUser,
    }));
    if (!this.state.xIsUser) {
      const history = this.initialState.history.slice(
        0,
        this.state.stepNumber + 1
      );
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      this.getMachineMove(squares);
      this.updateHistory(history, squares, false);
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status = "Click 'New Game' to play";
    if (winner) {
      status =
        winner === "Draw"
          ? "Game Status: " + winner
          : "Game Status: " + winner + " wins!";
    }

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move} className='history-item'>
          <button className='history-button' onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className='game'>
        <div className='player-select'>
          <form onSubmit={(event) => this.newGame(event)}>
            <label style={{ fontWeight: "400" }}>
              Go as 'X' or 'O'?
              <select
                className='player-selector'
                value={this.state.user}
                onChange={(event) => this.changeUser(event)}
              >
                <option value='X'>X</option>
                <option value='O'>O</option>
              </select>
            </label>
            <input className='game-button' type='submit' value='New Game' />
          </form>
        </div>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const tttBoard = new TTTBoard(3, squares);
  return tttBoard.checkWin();
}
