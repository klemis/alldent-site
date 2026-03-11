"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pl">
      <body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
            Przepraszamy, wystąpił błąd
          </h1>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            Spróbuj odświeżyć stronę lub skontaktuj się z nami telefonicznie.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={reset}
              style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0d9488", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem" }}
            >
              Spróbuj ponownie
            </button>
            <a
              href="tel:+48663333787"
              style={{ padding: "0.75rem 1.5rem", border: "1px solid #ddd", borderRadius: "0.5rem", textDecoration: "none", color: "#333", fontSize: "0.875rem", display: "inline-flex", alignItems: "center" }}
            >
              Zadzwoń: +48 663 333 787
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
