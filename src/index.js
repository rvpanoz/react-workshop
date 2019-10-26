import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(squareIndex) {
    return (
      <Square
        value={this.props.squares[squareIndex]}
        onClick={() => this.props.onSquareClick(squareIndex)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// TODO: Use lifecycle method componentDidMount to load state from localstorage
// TODO: Use lifecycle method componentDidUpdate to check if a winner exists
// TODO: If a winner exists clear localstorage
class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: '',
      player1: '',
      player2: '',
      squares: Array(9).fill(null),
      xIsNext: true
    };

    this.player1InputRef = React.createRef();
    this.player2InputRef = React.createRef();
  }

  handleClick(squareIndex) {
    const player1 = this.state.player1;
    const player2 = this.state.player2;

    if (!player1 || !player2) {
      alert('Please provide player\'s names');
      return;
    }

    if (this.state.winner || this.state.squares[squareIndex]) {
      return;
    }

    const squares = this.state.squares.slice();

    squares[squareIndex] = this.state.xIsNext ? "X" : "O";

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  addPlayers() {
    const player1 = this.player1InputRef.current.value;
    const player2 = this.player2InputRef.current.value;

    this.setState({
      player1,
      player2
    });

    localStorage.setItem('ticTacToe', JSON.stringify(this.state))
  }

  componentDidMount() {
    const persistState = localStorage.getItem('ticTacToe');

    this.setState(JSON.parse(persistState));
  }

  componentDidUpdate(_, prevState) {
    const xIsNextPrev = prevState.xIsNext;
    const xIsNext = this.state.xIsNext;

    if (this.state.winner) {
      return;
    }

    // update localstorage and state
    if (xIsNextPrev !== xIsNext) {
      const winner = calculateWinner(this.state.squares);

      if (winner) {
        this.setState({
          winner: winner === 'X' ? this.state.player1 : this.state.player2
        })

        localStorage.clear()
      } else {
        localStorage.setItem('ticTacToe', JSON.stringify(this.state))
      }
    }
  }

  render() {
    const status = this.state.winner ? 'Winner: ' + this.state.winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} onSquareClick={(squareIndex) => this.handleClick(squareIndex)} />
        </div>
        <div>{status}</div>
        <form>
          <div className="wrapper">
            <div className="form-row">
              <label htmlFor="player-1">Player 1</label>
              <input type="text" id="player-1" ref={this.player1InputRef} />
            </div>
            <div className="form-row">
              <label htmlFor="player-2">Player 2</label>
              <input type="text" id="player-2" ref={this.player2InputRef} />
            </div>
            <div className="form-row">
              <button type="button" onClick={() => this.addPlayers()}>Add players</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// Game Logic
function calculateWinner(squares) {
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

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}