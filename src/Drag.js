// Libs
import React from "react";
import { Container } from "@inlet/react-pixi";

const useDrag = ({ x, y, width, height }) => {
  const position = {
    x,
    y
  };

  const container = React.useRef();
  const [isDragging, setIsDragging] = React.useState(false);
  // const [setPosition] = React.useState({ x, y });

  const onDown = React.useCallback(ev => {
    ev.stopPropagation();
    setIsDragging(true);
  }, []);

  const onMove = React.useCallback(
    e => {
      if (isDragging && container.current) {
        const pos = e.data.getLocalPosition(container.current.parent);

        /* setPosition({
        x: pos.x - (width / 2),
        y: pos.y - (height / 2)
      }); */

        position.x = pos.x - width / 2;
        position.y = pos.y - height / 2;

        container.current.x = pos.x - width / 2;
        container.current.y = pos.y - height / 2;
      }
    },
    [isDragging, position, width, height]
  );

  const onUp = React.useCallback(() => setIsDragging(false), []);

  return {
    ref: container,
    interactive: true,
    pointerdown: onDown,
    pointerup: onUp,
    pointerupoutside: onUp,
    pointermove: onMove,
    alpha: isDragging ? 0.5 : 1,
    anchor: 0,
    position
  };
};

const Drag = ({ x, y, width, height, ...props }) => {
  const bind = useDrag({ x, y, width, height });

  return (
    <Container {...bind} {...props}>
      {props.children}
    </Container>
  );
};

export default Drag;
