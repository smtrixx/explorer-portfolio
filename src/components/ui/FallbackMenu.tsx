"use client";

import { useState } from "react";

interface FallbackMenuProps {
  onNavigate: (zoneIndex: number) => void;
}

export default function FallbackMenu({ onNavigate }: FallbackMenuProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (zoneIndex: number) => {
    onNavigate(zoneIndex);
    setOpen(false);
  };

  return (
    <>
      <div className="fixed right-6 top-6 z-[99999]">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl border border-white/20 bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-white hover:text-black"
        >
          ☰ MENU
        </button>
      </div>

      {open && (
        <div className="fixed right-6 top-20 z-[99999] w-64 rounded-2xl border border-white/15 bg-slate-950 p-2 text-white shadow-2xl">
          <button
            type="button"
            onClick={() => handleNavigate(0)}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-white/10"
          >
            Start Zone
          </button>

          <button
            type="button"
            onClick={() => handleNavigate(1)}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-emerald-400/10 hover:text-emerald-200"
          >
            Similarity Forest
          </button>

          <button
            type="button"
            onClick={() => handleNavigate(2)}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            Prediction Tower
          </button>

          <button
            type="button"
            onClick={() => handleNavigate(3)}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-amber-400/10 hover:text-amber-200"
          >
            Notebook Cave
          </button>

          <button
            type="button"
            onClick={() => handleNavigate(4)}
            className="block w-full rounded-xl px-4 py-3 text-left text-sm transition hover:bg-orange-400/10 hover:text-orange-200"
          >
            Signal Beacon
          </button>
        </div>
      )}
    </>
  );
}