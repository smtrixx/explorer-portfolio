"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { initPostHog } from "../lib/posthog";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!(posthog as any).__loaded) {
      initPostHog();
      (posthog as any).__loaded = true;
    }
  }, []);

  return <>{children}</>;
}