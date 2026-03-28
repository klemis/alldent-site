import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only enable in production
  enabled: process.env.NODE_ENV === "production",

  // Performance monitoring sample rate (10% of transactions)
  tracesSampleRate: 0.1,

  // Disable debug in production
  debug: false,

  // Filter out noisy errors from third-party widgets
  beforeSend(event) {
    // Ignore errors from ZnanyLekarz widget scripts
    if (
      event.exception?.values?.some((e) =>
        e.stacktrace?.frames?.some(
          (f) =>
            f.filename?.includes("znanylekarz.pl") ||
            f.filename?.includes("docplanner.com")
        )
      )
    ) {
      return null;
    }
    return event;
  },
});
