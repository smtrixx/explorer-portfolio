"use client";

const particles = [
  { left: "8%", top: "18%", delay: "0s", duration: "7s" },
  { left: "18%", top: "62%", delay: "1s", duration: "9s" },
  { left: "29%", top: "30%", delay: "2s", duration: "8s" },
  { left: "42%", top: "74%", delay: "0.5s", duration: "10s" },
  { left: "57%", top: "22%", delay: "1.5s", duration: "7.5s" },
  { left: "68%", top: "58%", delay: "2.5s", duration: "9.5s" },
  { left: "79%", top: "36%", delay: "0.8s", duration: "8.5s" },
  { left: "89%", top: "70%", delay: "1.8s", duration: "11s" },
];

export default function AmbientParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute h-2 w-2 rounded-full bg-white/20 blur-[1px] animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            boxShadow: "0 0 14px rgba(255,255,255,0.18)",
          }}
        />
      ))}
    </div>
  );
}