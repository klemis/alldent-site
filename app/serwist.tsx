"use client";

import { SerwistProvider as BaseSerwistProvider } from "@serwist/turbopack/react";
import type { ComponentProps } from "react";

/**
 * Skip service worker registration on Vercel preview deployments
 * (*.vercel.app). Those URLs sit behind Vercel Deployment Protection, so
 * fetching `/serwist/sw.js` returns 401 and registration fails noisily
 * (reported to Sentry). The production domain registers normally.
 *
 * The host is resolved client-side so the root layout stays statically
 * rendered — using `headers()` here would opt every page into dynamic
 * rendering. `disable` is only read inside SerwistProvider's client-only
 * `useState` initializer, so this does not affect the rendered markup or
 * cause a hydration mismatch.
 */
export function SerwistProvider(
  props: ComponentProps<typeof BaseSerwistProvider>,
) {
  const isPreviewHost =
    typeof window !== "undefined" &&
    window.location.hostname.endsWith(".vercel.app");

  return (
    <BaseSerwistProvider {...props} disable={props.disable || isPreviewHost} />
  );
}
