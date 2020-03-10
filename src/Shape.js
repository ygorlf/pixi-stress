// Libs
import React, { Component } from "react";

// Shapes
import RectShape from "./shapes/Rect";

// Types
const shapes = {
  rect: RectShape
};

class Shape extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { shape, slotWidth, slotHeight } = this.props;

    const Component = shapes[shape.type];

    return (
      <Component shape={shape} slotWidth={slotWidth} slotHeight={slotHeight} />
    );
  }
}

export default Shape;
