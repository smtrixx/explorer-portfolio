"use client";

import { motion } from "framer-motion";

export default function WaterLayer() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-44 z-20 overflow-hidden">
      {/* Base deep water tone underneath the asset */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#04080d] via-[#07111a] to-[#0b1a24]" />

      {/* Repeating cropped water strip */}
      <motion.div
        animate={{ x: [0, -220, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-[200%] h-full opacity-90"
      >
        <div className="flex h-full w-full">
          <img
            src="/backgrounds/water-strip.png"
            alt="water strip"
            className="h-full w-[100vw] object-cover"
          />
          <img
            src="/backgrounds/water-strip.png"
            alt="water strip repeat"
            className="h-full w-[100vw] object-cover"
          />
        </div>
      </motion.div>

      {/* Soft top fade so it blends into scene */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-transparent" />

      {/* Slight darkening to keep palette premium */}
      <div className="absolute inset-0 bg-[#061018]/20" />

      {/* Very soft crest glow */}
      <div className="absolute top-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-100/12 to-transparent" />
    </div>
  );
}