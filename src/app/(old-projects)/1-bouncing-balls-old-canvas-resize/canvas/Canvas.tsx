import React, { forwardRef, useEffect, useRef } from "react";
import { Effect } from "./Effect";
import useWindowSize from "@/hooks/useWindowResize";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref) => {
  const canvasRef = ref as React.RefObject<HTMLCanvasElement>;
  const { height, width } = useWindowSize();
  const sizeRef = useRef({ height, width });
  const effectRef = useRef<Effect | null>(null);
  const animationFrameSet = useRef(false);

  useEffect(() => {
    if (!effectRef.current) return;
    sizeRef.current = { height, width };
    // effectRef.current.setCanvasSize(width, height);
    effectRef.current.setCanvas(canvasRef.current);
  }, [height, width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Only create the Effect instance if it doesn't already exist
    if (!effectRef.current) {
      effectRef.current = new Effect(canvas);
    }

    if (!animationFrameSet.current) {
      function animate() {
        if (!context) return;
        context.clearRect(0, 0, sizeRef.current.width, sizeRef.current.height);

        // Draw particles
        effectRef.current.draw(context);

        requestAnimationFrame(animate);
      }

      animate();
    }

    animationFrameSet.current = true;

    return () => {
      context.clearRect(0, 0, width, height);
    };
  }, [canvasRef, height, width]);

  return <canvas ref={canvasRef} {...props} height={height} width={width} />;
});

Canvas.displayName = "Canvas";

export default Canvas;
