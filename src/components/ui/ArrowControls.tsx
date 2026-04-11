"use client";

interface ArrowControlsProps {
  onLeftStart: () => void;
  onLeftEnd: () => void;
  onRightStart: () => void;
  onRightEnd: () => void;
}

export default function ArrowControls({
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
}: ArrowControlsProps) {
  return (
    <div className="absolute bottom-6 right-6 z-50 flex gap-3">
      <button
        type="button"
        onMouseDown={onLeftStart}
        onMouseUp={onLeftEnd}
        onMouseLeave={onLeftEnd}
        onTouchStart={onLeftStart}
        onTouchEnd={onLeftEnd}
        onTouchCancel={onLeftEnd}
        onPointerDown={onLeftStart}
        onPointerUp={onLeftEnd}
        onPointerCancel={onLeftEnd}
        className="h-12 w-12 rounded-full border border-white/20 bg-black/40 text-xl text-white backdrop-blur-md transition hover:bg-white hover:text-black"
      >
        ←
      </button>

      <button
        type="button"
        onMouseDown={onRightStart}
        onMouseUp={onRightEnd}
        onMouseLeave={onRightEnd}
        onTouchStart={onRightStart}
        onTouchEnd={onRightEnd}
        onTouchCancel={onRightEnd}
        onPointerDown={onRightStart}
        onPointerUp={onRightEnd}
        onPointerCancel={onRightEnd}
        className="h-12 w-12 rounded-full border border-white/20 bg-black/40 text-xl text-white backdrop-blur-md transition hover:bg-white hover:text-black"
      >
        →
      </button>
    </div>
  );
}