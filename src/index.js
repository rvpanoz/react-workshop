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
// TODO: Use lifecycle method componentDidUpdate to check if a winner exists and update localstorage
class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };

    this.player1InputRef = React.createRef();
    this.player2InputRef = React.createRef();
  }

  handleClick(squareIndex) {
    const squares = this.state.squares.slice();

    squares[squareIndex] = this.state.xIsNext ? "X" : "O";

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  addPlayers() {
    const player1 = this.player1InputRef.current.value;
    const player2 = this.player1InputRef.current.value;

    this.setState({
      player1,
      player2
    });
  }

  componentDidMount() {
    // TODO: implementation
  }

  componentDidUpdate() {
    // TODO: implementation
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

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
