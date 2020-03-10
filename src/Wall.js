// Libs
import React, { Component } from "react";
import { Stage } from "@inlet/react-pixi";
import { values } from "lodash";

import Camera from "./Camera";
import Slot from "./Slot";

class Wall extends Component {
  state = {
    bunnys: [],
    selectedSticker: null,
    cameraRef: null,
    slots: {
      1: {
        id: "bc72ab88",
        slotX: window.innerWidth * 0.12,
        slotY: 5,
        slotWidth: window.innerWidth * 0.4,
        slotHeight: window.innerHeight * 0.5 - 10,
        fill: 0xeaff00,
        label: "Slot 1"
      },
      2: {
        id: "30e8bc1d",
        slotX: window.innerWidth * 0.12 + window.innerWidth * 0.42,
        slotY: 5,
        slotWidth: window.innerWidth * 0.4,
        slotHeight: window.innerHeight * 0.5 - 10,
        fill: 0x00abff,
        label: "Slot 2"
      },
      3: {
        id: "17246f65",
        slotX: window.innerWidth * 0.12,
        slotY: window.innerHeight * 0.5 + 7,
        slotWidth: window.innerWidth * 0.4,
        slotHeight: window.innerHeight * 0.5 - 10,
        fill: 0xff006c,
        label: "Slot 3"
      },
      4: {
        id: "b31db5ee",
        slotX: window.innerWidth * 0.12 + window.innerWidth * 0.42,
        slotY: window.innerHeight * 0.5 + 7,
        slotWidth: window.innerWidth * 0.4,
        slotHeight: window.innerHeight * 0.5 - 10,
        fill: 0x00ffd3,
        label: "Slot 4"
      }
    },
    shapes: [
      {
        type: "rect",
        x: 0,
        y: 0,
        width: 0.33,
        height: 1
      },
      {
        type: "rect",
        x: 0.33,
        y: 0,
        width: 0.33,
        height: 1
      },
      {
        type: "rect",
        x: 0.66,
        y: 0,
        width: 0.33,
        height: 1
      }
    ]
  };

  componentDidMount() {
    window.addEventListener(
      "wheel",
      e => {
        e.preventDefault();
      },
      { passive: false }
    );
  }

  setCameraRef = cameraRef => {
    this.setState({
      cameraRef
    });
  };

  renderSlots = () => {
    return values(this.state.slots).map(slot => (
      <Slot
        key={slot.id}
        id={slot.id}
        shapes={this.state.shapes}
        slotX={slot.slotX}
        slotY={slot.slotY}
        slotWidth={slot.slotWidth}
        slotHeight={slot.slotHeight}
        fill={slot.fill}
      />
    ));
  };

  render() {
    const { shapes } = this.state;
    return (
      <div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={node => {
            this.stage = node;
          }}
          options={{
            backgroundColor: 0xb2b2ff,
            antialias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio,
            autoStart: false,
            sharedTicker: true
          }}
        >
          <Camera
            width={window.innerWidth}
            height={window.innerHeight}
            setCameraRef={this.setCameraRef}
          >
            {shapes.length > 0 && this.renderSlots()}
          </Camera>
        </Stage>
      </div>
    );
  }
}

export default Wall;
