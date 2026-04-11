"use client";

import { motion } from "framer-motion";

export default function Ship() {
  return (
    <motion.div
      animate={{
        y: [0, -3, 0, 3, 0],
        rotate: [0, -0.7, 0, 0.7, 0],
      }}
      transition={{
        duration: 3.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-24 left-10 z-30 w-36 h-24"
    >
      {/* Mast */}
      <div className="absolute left-[70px] bottom-10 w-[2px] h-14 bg-stone-200/90" />

      {/* Sail */}
      <div className="absolute left-[42px] bottom-[42px] w-12 h-10 bg-stone-100/95 shadow-md [clip-path:polygon(0_0,100%_50%,0_100%)]" />

      {/* Flag */}
      <div className="absolute left-[42px] bottom-[74px] w-5 h-3 bg-amber-400 [clip-path:polygon(0_0,100%_50%,0_100%)]" />

      {/* Hull */}
      <div className="absolute bottom-0 left-0 w-36 h-10 rounded-t-[10px] rounded-b-[28px] border border-[#2a160d] bg-gradient-to-b from-[#7a4b27] via-[#5b341c] to-[#2f1a10] shadow-xl" />

      {/* Cabin / explorer marker */}
      <div className="absolute left-7 bottom-9 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-200/60 bg-slate-900 text-[8px] font-semibold text-white">
        R
      </div>
    </motion.div>
  );
}