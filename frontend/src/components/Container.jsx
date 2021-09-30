import React from "react";
import Slider from "@mui/material/Slider";

import Board from "./Board";
import "../styles/container.css";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#000000",
      size: "5",
    };
  }
  changeColor(params) {
    this.setState({
      color: params.target.value,
    });
  }
  changeSize(params) {
    this.setState({
      size: params.target.value,
    });
  }

  handleClear = () => {
    this.clearArea();
  };
  clearArea = () => {
    var canvas = document.querySelector("#Board");
    this.ctx = canvas.getContext("2d");
    this.ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  };

  render() {
    return (
      <div className="container">
        <div className="board-container">
          <Board color={this.state.color} size={this.state.size}></Board>
        </div>
        <div className="brushContainer">
          <div className="Brushtop">
            <div className="color-picker-container">
              <input
                type="color"
                className="colorPicker"
                value={this.state.color}
                onChange={this.changeColor.bind(this)}
              />
            </div>
            <div>
              <button className="clear" onClick={this.handleClear}>
                CLEAR
              </button>
            </div>
          </div>
          <div className="brushsize-container">
            <Slider
              color="secondary"
              defaultValue={5}
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={5}
              max={30}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Container;
