"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function InstagramEasterEgg() {
useEffect(() => {
  posthog.capture("instagram_easter_egg_opened");

  posthog.people.set({
    visited_instagram_easter_egg: true,
  });
}, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-orange-200/70">
          Signal Intercepted
        </p>

        <h1 className="mt-4 text-4xl font-bold text-white">
          Nice try :)
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/70">
          This is a professional portfolio — no personal social links here.
        </p>

        <p className="mt-3 text-sm text-white/50">
          Let’s keep it about the work.
        </p>

        <Link
          href="/connect"
          className="mt-8 inline-block rounded-xl border border-orange-300/20 bg-orange-400/10 px-5 py-2 text-sm text-orange-100 transition hover:bg-orange-400/20"
        >
          ← Back to Signal Beacon
        </Link>
      </div>
    </main>
  );
}