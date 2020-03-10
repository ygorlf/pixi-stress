import React from "react";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";
import { PixiComponent, useApp } from "@inlet/react-pixi";
import Cull from "pixi-cull";

const BasicViewport = PixiComponent("Viewport", {
  create: props => {
    const viewport = new Viewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: 10000,
      worldHeight: 10000,
      ticker: props.app.ticker,
      divWheel: props.app.renderer.view,
      interaction: props.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    viewport.on("drag-start", () => console.log("drag-start"));
    viewport.on("drag-end", () => console.log("drag-end"));
    viewport.on("zoomed", () => console.log("zooming"));
    viewport.on("zoomed-end", () => console.log("zooming end!!!"));

    viewport
      .drag()
      .wheel({
        percent: 4.5,
        smooth: 3
      })
      .decelerate();

    // cutting offscreen shapes
    const cull = new Cull.Simple({
      dirtyTest: false
    });
    cull.addList(viewport.children);
    cull.cull(viewport.getVisibleBounds());

    // cull whenever the viewport moves
    PIXI.Ticker.shared.add(() => {
      if (viewport.dirty) {
        cull.cull(viewport.getVisibleBounds());
        viewport.dirty = false;
      }
    });

    return viewport;
  },
  applyProps: (instance, oldProps, newProps) => {
    newProps.setCameraRef(instance);
  },
  didMount: (instance, oldProps) => {},
  willUnmount: () => {}
});

const Camera = props => {
  const app = useApp();

  return (
    <BasicViewport app={app} {...props}>
      {props.children}
    </BasicViewport>
  );
};

export default Camera;
