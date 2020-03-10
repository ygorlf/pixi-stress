// Libs
import React from "react";
import { Graphics, Texture } from "pixi.js";
import { PixiComponent, Container, Sprite } from "@inlet/react-pixi";

const Stroke = PixiComponent("Stroke", {
  create: props => new Graphics(),
  applyProps: (instance, _, props) => {
    const { x, y, width, height, fill } = props;

    instance.clear();
    instance.lineStyle(0.5, fill);
    instance.moveTo(x, y);
    instance.lineTo(x + width, y);
    instance.lineTo(x + width, y + height);
    instance.lineTo(x, y + height);
    instance.lineTo(x, y);
    instance.endFill();
  }
});

const RectShape = ({ shape, slotWidth, slotHeight }) => {
  return (
    <Container>
      <Sprite
        x={shape.x * slotWidth}
        y={shape.y * slotHeight}
        width={shape.width * slotWidth}
        height={shape.height * slotHeight}
        texture={Texture.WHITE}
      />
      <Stroke
        x={shape.x * slotWidth}
        y={shape.y * slotHeight}
        width={shape.width * slotWidth}
        height={shape.height * slotHeight}
        fill={0x000000}
      />
    </Container>
  );
};

export default RectShape;
