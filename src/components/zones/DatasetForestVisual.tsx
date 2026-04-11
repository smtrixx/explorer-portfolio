"use client";

export default function DatasetForestVisual() {
  return (
    <div
      className="absolute inset-0 z-[2] pointer-events-none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    >
      {/* Forest color wash */}
      <div className="absolute inset-0 bg-emerald-950/16" />

      {/* Mist */}
      <div className="absolute inset-x-0 bottom-20 h-36 bg-gradient-to-t from-emerald-200/10 to-transparent blur-2xl" />

      {/* Tree silhouette band */}
      <div className="absolute inset-x-0 bottom-0 h-48 overflow-hidden">
        <div className="flex h-full w-[140%] -translate-x-[8%]">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="relative h-full w-24 shrink-0">
              <div className="absolute bottom-0 left-1/2 h-20 w-2 -translate-x-1/2 bg-[#0b120e]" />
              <div className="absolute bottom-12 left-1/2 h-24 w-20 -translate-x-1/2 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] bg-[#0a140f]" />
              <div className="absolute bottom-24 left-1/2 h-20 w-16 -translate-x-1/2 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] bg-[#0b160f]" />
              <div className="absolute bottom-34 left-1/2 h-16 w-12 -translate-x-1/2 [clip-path:polygon(50%_0%,0%_100%,100%_100%)] bg-[#0d1811]" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-100/25 blur-[1px]"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${8 + i * 5}%`,
              top: `${18 + (i % 5) * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}