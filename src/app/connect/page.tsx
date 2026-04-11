"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function ConnectPage() {
useEffect(() => {
  posthog.capture("connect_opened");

  posthog.people.set({
    visited_connect: true,
  });
}, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.10),_transparent_30%),linear-gradient(to_bottom,_#0c0a09,_#111827)] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-orange-200/70">
              Signal Beacon
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-wide text-orange-100">
              Connect
            </h1>

            <p className="mt-3 max-w-3xl text-white/70">
              A professional contact hub for projects, collaborations, and technical work.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            ← Back to World
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <a
            href="https://github.com/smtrixx"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-300/30 hover:bg-white/10"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-orange-200/70">
              GitHub
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Code & Projects
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Explore repositories, implementations, and project source code.
            </p>
          </a>

          <a
            href="mailto:sohamrathi1709@gmail.com"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-300/30 hover:bg-white/10"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-orange-200/70">
              Email
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Reach Out
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Contact me for opportunities, collaborations, and technical discussions.
            </p>
          </a>

          <Link
            href="/connect/instagram"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-300/30 hover:bg-white/10"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-orange-200/70">
              Instagram
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Personal Profile
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Connect with me.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}