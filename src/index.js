import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: "X" })}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(squareIndex) {
    const squares = this.state.squares.slice();

    squares[squareIndex] = this.state.xIsNext ? "X" : "O";

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(squareIndex) {
    return (
      <Square
        value={this.state.squares[squareIndex]}
        onClick={() => this.handleClick(squareIndex)}
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

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
