"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/cookie-consent";

export function ConsentAnalytics() {
  const consent = useCookieConsent();

  if (consent !== "all") return null;

  return <Analytics />;
}
