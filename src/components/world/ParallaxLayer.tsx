"use client";

import type { ReactNode } from "react";

interface Props {
  position: number;
  speed: number;
  className?: string;
  children?: ReactNode;
}

export default function ParallaxLayer({
  position,
  speed,
  className = "",
  children,
}: Props) {
  return (
    <div
      className={className}
      style={{
        transform: `translate3d(${-position * speed}px, 0, 0)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}