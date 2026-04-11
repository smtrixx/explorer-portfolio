"use client";

import InstructionOverlay from "../ui/InstructionOverlay";
import FallbackMenu from "../ui/FallbackMenu";
import ArrowControls from "../ui/ArrowControls";
import ProjectPanel from "../ui/ProjectPanel";
import { useMovementStore } from "../../store/useMovementStore";
import { useState, useEffect, useRef } from "react";

// import AmbientParticles from "../ui/AmbientParticles";
// import AmbientGlow from "../ui/AmbientGlow";

const WORLD_SCREENS = 5;
const SPEED_PX_PER_SEC = 550;

const ZONE_BACKGROUNDS = [
  "/backgrounds/start-bg.png",
  "/backgrounds/dataset-forest.png",
  "/backgrounds/prediction-tower.png",
  "/backgrounds/notebook-cave.png",
  "/backgrounds/signal-beacon.png",
];

export default function WorldMap() {
  const position = useMovementStore((state) => state.position);
  const setPosition = useMovementStore((state) => state.setPosition);

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const smoothPositionRef = useRef(position);
  const leftPressedRef = useRef(false);
  const rightPressedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsMobileView(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        leftPressedRef.current = true;
      }

      if (event.key === "ArrowRight") {
        rightPressedRef.current = true;
      }

      if (screenWidth === null) return;

      const zoneIndex = Math.floor(position / screenWidth);

      if (
        event.key === "Enter" &&
        (zoneIndex === 1 || zoneIndex === 2 || zoneIndex === 3 || zoneIndex === 4)
      ) {
        setSelectedZone(zoneIndex);
        setPanelOpen(true);
      }

      if (event.key === "Escape") {
        setPanelOpen(false);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        leftPressedRef.current = false;
      }

      if (event.key === "ArrowRight") {
        rightPressedRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [position, screenWidth]);

  useEffect(() => {
    if (screenWidth === null) return;

    const maxPosition = screenWidth * (WORLD_SCREENS - 1);

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaSeconds = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      let target = smoothPositionRef.current;

      if (leftPressedRef.current && !rightPressedRef.current) {
        target -= SPEED_PX_PER_SEC * deltaSeconds;
      }

      if (rightPressedRef.current && !leftPressedRef.current) {
        target += SPEED_PX_PER_SEC * deltaSeconds;
      }

      if (target < 0) target = 0;
      if (target > maxPosition) target = maxPosition;

      const smoothFactor = 0.55;
      smoothPositionRef.current =
        smoothPositionRef.current +
        (target - smoothPositionRef.current) * smoothFactor;

      setPosition(smoothPositionRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [screenWidth, setPosition]);

  const handleMenuNavigate = (zoneIndex: number) => {
    if (screenWidth === null) return;

    const nextPosition = window.innerWidth * zoneIndex;
    smoothPositionRef.current = nextPosition;
    setPosition(nextPosition);
    setPanelOpen(false);
  };

  const handleExploreActiveZone = () => {
    if (screenWidth === null) return;

    const zoneIndex = Math.floor(position / screenWidth);

    if (zoneIndex === 1 || zoneIndex === 2 || zoneIndex === 3 || zoneIndex === 4) {
      setSelectedZone(zoneIndex);
      setPanelOpen(true);
    }
  };

  const activeZone =
    screenWidth !== null ? Math.floor(position / screenWidth) : 0;

  const transitionProgress =
    screenWidth !== null ? (position % screenWidth) / screenWidth : 0;

  const currentBg = ZONE_BACKGROUNDS[activeZone] ?? ZONE_BACKGROUNDS[0];
  const nextBg =
    ZONE_BACKGROUNDS[(activeZone + 1) % ZONE_BACKGROUNDS.length] ??
    ZONE_BACKGROUNDS[0];

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentBg})`,
          opacity: 1 - transitionProgress,
          transform: `translate3d(${-transitionProgress * 28}px, 0, 0) scale(1.04)`,
          willChange: "transform, opacity",
        }}
      />

      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${nextBg})`,
          opacity: transitionProgress,
          transform: `translate3d(${18 - transitionProgress * 18}px, 0, 0) scale(1.04)`,
          willChange: "transform, opacity",
        }}
      />

      <div className="absolute inset-0 z-[1] bg-black/20" />
      {/* <AmbientGlow />
      <AmbientParticles /> */}

      <div
        className="absolute z-10 flex h-full items-center"
        style={{
          transform: `translate3d(${-Math.round(position)}px, 0, 0)`,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
<div className="relative flex h-full w-[100vw] flex-col items-center justify-center overflow-hidden px-6 text-center">
  
  {/* 👇 Hover trigger only on heading */}
  <div className="group relative inline-block">
    <h1 className="text-5xl font-bold tracking-[0.16em] text-stone-100 drop-shadow-lg transition duration-300 group-hover:scale-[1.02]">
      Welcome, Explorer!!!
    </h1>

    {/* 👇 About popup (only triggered by heading hover) */}
    <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-6 w-[90vw] max-w-2xl -translate-x-1/2 opacity-0 transition duration-300 group-hover:opacity-100">
      <div className="rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-white">
          Soham Rathi
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/70">
          I am an engineering student currently pursuing my bachelor's degree in
          Electronics and Telecommunication Engineering (2024–2028).
        </p>

        <p className="mt-3 text-sm leading-7 text-white/70">
          I am focused on developing a strong foundation in machine learning and
          algorithmic problem solving, with an emphasis on building practical,
          real-world systems.
        </p>

        <p className="mt-3 text-sm leading-7 text-white/60">
          This website documents my journey,projects, experiments, and learnings
          as I work towards gaining deeper expertise in the field.
        </p>

        <p className="mt-4 text-sm text-white/50">
          Thank you for visiting.
        </p>
      </div>
    </div>
  </div>

  <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/55">
    Start Zone
  </p>
</div>

        <div className="relative flex h-full w-[100vw] flex-col items-center justify-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-[0.16em] text-emerald-100 drop-shadow-lg">
              SIMILARITY FOREST
            </h1>

            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-emerald-50/60">
              Fashion Semantic Search
            </p>

            {screenWidth !== null && activeZone === 1 && (
              <div className="mt-4 flex flex-col items-center gap-3">
                <p className="animate-pulse text-sm uppercase tracking-[0.24em] text-cyan-100/80">
                  {isMobileView ? "Tap below to explore" : "Press Enter to explore"}
                </p>

                {isMobileView && (
                  <button
                    onClick={handleExploreActiveZone}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm text-white/85 transition hover:bg-white hover:text-black"
                  >
                    Explore Zone
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative flex h-full w-[100vw] flex-col items-center justify-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-[0.16em] text-cyan-100 drop-shadow-lg">
              PREDICTION TOWER
            </h1>

            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-cyan-50/70">
              Stock Price Predictor
            </p>

            {screenWidth !== null && activeZone === 2 && (
              <div className="mt-4 flex flex-col items-center gap-3">
                <p className="animate-pulse text-sm uppercase tracking-[0.24em] text-cyan-100/80">
                  {isMobileView ? "Tap below to explore" : "Press Enter to explore"}
                </p>

                {isMobileView && (
                  <button
                    onClick={handleExploreActiveZone}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm text-white/85 transition hover:bg-white hover:text-black"
                  >
                    Explore Zone
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative flex h-full w-[100vw] flex-col items-center justify-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-[0.16em] text-amber-100 drop-shadow-lg">
              NOTEBOOK CAVE
            </h1>

            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-amber-50/70">
              Blog / Research Notes
            </p>

            {screenWidth !== null && activeZone === 3 && (
              <div className="mt-4 flex flex-col items-center gap-3">
                <p className="animate-pulse text-sm uppercase tracking-[0.24em] text-amber-100/80">
                  {isMobileView ? "Tap below to explore" : "Press Enter to explore"}
                </p>

                {isMobileView && (
                  <button
                    onClick={handleExploreActiveZone}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm text-white/85 transition hover:bg-white hover:text-black"
                  >
                    Explore Zone
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative flex h-full w-[100vw] flex-col items-center justify-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold tracking-[0.16em] text-amber-100 drop-shadow-lg">
              SIGNAL BEACON
            </h1>

            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-amber-50/70">
              Contact / Connect
            </p>

            {screenWidth !== null && activeZone === 4 && (
              <div className="mt-4 flex flex-col items-center gap-4">
                <p className="animate-pulse text-sm uppercase tracking-[0.24em] text-amber-100/80">
                  {isMobileView ? "Tap below to connect" : "Press Enter to connect"}
                </p>

                {isMobileView && (
                  <button
                    onClick={handleExploreActiveZone}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm text-white/85 transition hover:bg-white hover:text-black"
                  >
                    Explore Zone
                  </button>
                )}

                <button
                  onClick={() => handleMenuNavigate(0)}
                  className="rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm text-white/85 transition hover:bg-white hover:text-black"
                >
                  Back to Start Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <InstructionOverlay />
      <FallbackMenu onNavigate={handleMenuNavigate} />

      <ArrowControls
        onLeftStart={() => {
          leftPressedRef.current = true;
        }}
        onLeftEnd={() => {
          leftPressedRef.current = false;
        }}
        onRightStart={() => {
          rightPressedRef.current = true;
        }}
        onRightEnd={() => {
          rightPressedRef.current = false;
        }}
      />

      <ProjectPanel
        visible={panelOpen}
        selectedZone={selectedZone}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}