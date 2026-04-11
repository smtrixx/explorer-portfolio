"use client";

import { useEffect, useRef, useState } from "react";
import { useMovementStore } from "../../store/useMovementStore";

const FRAME_WIDTH = 384;
const FRAME_HEIGHT = 384;
const FRAME_COUNT = 4;
const DISPLAY_SCALE = 0.42;
const STEP_MS = 250;

export default function Explorer() {
  const position = useMovementStore((state) => state.position);

  const previousX = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [frame, setFrame] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isMoving, setIsMoving] = useState(false);
  const [displayX, setDisplayX] = useState(0);

  useEffect(() => {
    setMounted(true);
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mounted || screenWidth === 0) return;

    const wrappedX = position % screenWidth;
    const roundedX = Math.round(wrappedX);
    const delta = roundedX - previousX.current;

    if (Math.abs(delta) > 0.5) {
      setIsMoving(true);

      if (Math.abs(delta) < screenWidth / 2) {
        if (delta > 0) setDirection("right");
        if (delta < 0) setDirection("left");
      }
    } else {
      setIsMoving(false);
    }

    setDisplayX(roundedX);
    previousX.current = roundedX;
  }, [position, mounted, screenWidth]);

  useEffect(() => {
    if (!isMoving) {
      setFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % FRAME_COUNT);
    }, STEP_MS);

    return () => clearInterval(interval);
  }, [isMoving]);

  if (!mounted || screenWidth === 0) {
    return null;
  }

  return (
    <div
      className="absolute bottom-0 z-20 pointer-events-none"
      style={{
        transform: `translate3d(${displayX}px, 0, 0)`,
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: FRAME_WIDTH * DISPLAY_SCALE,
          height: FRAME_HEIGHT * DISPLAY_SCALE,
          overflow: "hidden",
          position: "relative",
          transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
          transformOrigin: "center bottom",
        }}
      >
        <img
          src="/characters/walk-clean.png"
          alt="Walking explorer"
          draggable={false}
          style={{
            position: "absolute",
            left: `${-(frame * FRAME_WIDTH) * DISPLAY_SCALE}px`,
            top: `${-92 * DISPLAY_SCALE}px`,
            width: FRAME_WIDTH * FRAME_COUNT * DISPLAY_SCALE,
            height: FRAME_HEIGHT * DISPLAY_SCALE,
            maxWidth: "none",
            userSelect: "none",
            imageRendering: "auto",
          }}
        />
      </div>
    </div>
  );
}