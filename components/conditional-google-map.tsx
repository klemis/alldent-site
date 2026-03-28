"use client";

import { useCookieConsent } from "@/components/cookie-consent";
import { MapPin } from "lucide-react";

export function ConditionalGoogleMap({
  className,
}: {
  className?: string;
}) {
  const consent = useCookieConsent();

  if (consent !== "all") {
    return (
      <div
        className={`bg-stone-100 rounded-lg flex flex-col items-center justify-center gap-3 p-6 text-center ${className ?? ""}`}
      >
        <MapPin className="w-8 h-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Mapa Google wymaga zgody na pliki cookie.
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=ul.+Sabinowska+8+Częstochowa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          Otwórz w Google Maps
        </a>
      </div>
    );
  }

  return (
    <iframe
      src="https://maps.google.com/maps?q=ul.+Sabinowska+8,+Częstochowa,+Poland&t=&z=16&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Interaktywna mapa pokazująca lokalizację gabinetu Alldent przy ulicy Sabinowskiej 8 w Częstochowie"
      className={`w-full h-full rounded-lg ${className ?? ""}`}
      aria-label="Mapa z lokalizacją gabinetu stomatologicznego Alldent"
    />
  );
}
