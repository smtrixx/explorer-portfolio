"use client";

export default function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-emerald-400/8 blur-3xl animate-pulse" />
      <div className="absolute right-[12%] top-[22%] h-48 w-48 rounded-full bg-cyan-400/8 blur-3xl animate-pulse [animation-delay:1.5s]" />
      <div className="absolute left-[22%] bottom-[14%] h-36 w-36 rounded-full bg-amber-300/8 blur-3xl animate-pulse [animation-delay:0.8s]" />
      <div className="absolute right-[18%] bottom-[16%] h-44 w-44 rounded-full bg-orange-300/8 blur-3xl animate-pulse [animation-delay:2.2s]" />
    </div>
  );
}