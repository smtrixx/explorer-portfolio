import { create } from "zustand";

interface MovementState {
  position: number;
  setPosition: (value: number) => void;
}

export const useMovementStore = create<MovementState>((set) => ({
  position: 0,
  setPosition: (value) => set({ position: value }),
}));