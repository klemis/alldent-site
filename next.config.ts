import { withSentryConfig } from "@sentry/nextjs";
import { withSerwist } from "@serwist/turbopack";

const nextConfig = withSerwist({
  trailingSlash: false,
  turbopack: {},
});

export default withSentryConfig(nextConfig, {
  // Suppress warnings when no auth token is set
  silent: !process.env.SENTRY_AUTH_TOKEN,

  // Only upload source maps when auth token is configured
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
});
