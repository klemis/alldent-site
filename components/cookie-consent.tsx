"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ConsentLevel = "all" | "essential";

const STORAGE_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent-change";

function getSnapshot(): ConsentLevel | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY) as ConsentLevel | null;
}

function getServerSnapshot(): ConsentLevel | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function setConsent(level: ConsentLevel) {
  localStorage.setItem(STORAGE_KEY, level);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

export function useCookieConsent(): ConsentLevel | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function CookieConsent() {
  const consent = useCookieConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent) return;
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [consent]);

  const accept = useCallback((level: ConsentLevel) => {
    setConsent(level);
    setVisible(false);
  }, []);

  if (consent || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Informacja o plikach cookie"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 p-4",
        "animate-in slide-in-from-bottom duration-500 ease-out",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-2xl rounded-xl bg-card p-5 shadow-lg",
          "border border-border text-card-foreground",
        )}
      >
        <p className="mb-4 text-sm leading-relaxed">
          Nasza strona korzysta z plików cookie i podobnych technologii.
          Niezbędne cookies zapewniają jej poprawne działanie. Opcjonalne pliki
          (Vercel Analytics do analizy statystyk, Google Maps do wyświetlania
          map) wymagają Twojej zgody, którą możesz w każdej chwili zmienić w
          ustawieniach.{" "}
          <Link
            href="/polityka-prywatnosci"
            className="text-primary hover:underline font-medium"
          >
            Polityka prywatności
          </Link>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => accept("essential")}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-md px-5",
              "border border-border text-foreground text-sm font-medium",
              "transition-colors hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            onClick={() => accept("all")}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-md px-5",
              "bg-primary text-primary-foreground text-sm font-medium shadow-xs",
              "transition-colors hover:bg-primary/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            Akceptuję wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}
