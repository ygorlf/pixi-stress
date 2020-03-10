// Libs
import React, { Component } from "react";
import { Container } from "@inlet/react-pixi";

// Components
import Shape from "./Shape";
import Square from "./Square";

class Slot extends Component {
  state = {
    squares: []
  };

  componentDidMount() {
    const squares = [];

    for (let i = 0; i <= 10; i += 1) {
      const id = Math.floor(Math.random() * 999) + 1;
      const item = {
        id: id,
        width: 0.09,
        height: 0.09,
        positionX: Math.random(),
        positionY: Math.random()
      };

      squares.push(item);
    }

    this.setState({
      squares
    });
  }

  renderShapes = () => {
    const { shapes, slotWidth, slotHeight } = this.props;

    return shapes.map((shape, index) => {
      return (
        <Shape
          key={index}
          shape={shape}
          slotWidth={slotWidth}
          slotHeight={slotHeight}
        />
      );
    });
  };

  renderSquares = () => {
    const { slotX, id, slotY, slotWidth, slotHeight } = this.props;
    const { squares } = this.state;

    return squares.map(item => {
      return (
        <Square
          key={`${item.id}-${id}`}
          id={item.id}
          info={item}
          slotX={slotX}
          slotY={slotY}
          slotWidth={slotWidth * 0.99}
          slotHeight={slotHeight * 0.99}
        />
      );
    });
  };

  render() {
    const { slotX, slotY, slotWidth, slotHeight } = this.props;

    return (
      <Container x={slotX} y={slotY}>
        <Container x={slotWidth * 0.005} y={slotHeight * 0.005}>
          {this.renderShapes()}
          {this.renderSquares()}
        </Container>
      </Container>
    );
  }
}

export default Slot;
