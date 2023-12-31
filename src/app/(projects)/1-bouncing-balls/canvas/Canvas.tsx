import React, { forwardRef, useEffect, useRef } from "react";
import { Effect } from "./Effect";

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref) => {
  const canvasRef = ref as React.RefObject<HTMLCanvasElement>;
  const effectRef = useRef<Effect | null>(null);
  const animationFrameSet = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Only create the Effect instance if it doesn't already exist
    if (!effectRef.current) {
      effectRef.current = new Effect(canvas, context);
    }

    if (!animationFrameSet.current) {
      function animate() {
        if (!context) return;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw particles
        effectRef.current.draw(context);

        requestAnimationFrame(animate);
      }

      animate();
    }

    animationFrameSet.current = true;

    return () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      {...props}
      height={window.innerHeight}
      width={window.innerWidth}
    />
  );
});

Canvas.displayName = "Canvas";

export default Canvas;
