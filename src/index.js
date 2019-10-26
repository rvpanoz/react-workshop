import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

// TODO: Change component so when clicked it updates its state and draws an 'X'
class Square extends React.Component {
  render() {
    return <button className="square">{/* TODO */}</button>;
  }
}

// ========================================

ReactDOM.render(<Square />, document.getElementById("root"));
