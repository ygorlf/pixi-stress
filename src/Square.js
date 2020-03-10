// Libs
import React, { Component } from "react";
import { Container, Sprite } from "@inlet/react-pixi";
import { Texture } from "pixi.js";

// Components
import Drag from "./Drag";

class Square extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isResizing: false
    };

    this.data = {
      pointerDown: false,
      resizeDown: false,
      pointerDownPos: {
        x: 0,
        y: 0
      },
      dragging: false,
      resizing: false
    };
  }

  render() {
    const { info, slotWidth, slotHeight } = this.props;

    return (
      <Drag
        x={info.positionX * slotWidth}
        y={info.positionY * slotHeight}
        width={info.width * slotWidth}
        height={info.height * slotHeight}
      >
        <Container
          ref={node => {
            this.container = node;
          }}
          position={[0, 0]}
        >
          <Sprite
            ref={node => {
              this.background = node;
            }}
            width={info.width * slotWidth}
            height={info.height * slotHeight}
            texture={Texture.WHITE}
            tint={0xffff00}
            anchor={[0, 0]}
            cacheAsBitmap={true}
          />
        </Container>
      </Drag>
    );
  }
}

export default Square;
