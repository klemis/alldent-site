"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type ZnanyLekarzWidgetProps = {
  type: "facility-calendar" | "certificate" | "rtg-calendar"
  className?: string
}

type WidgetState = "idle" | "loading" | "loaded" | "error"

const WIDGET_CONFIGS = {
  "facility-calendar": {
    scriptSrc: "https://www.znanylekarz.pl/platform/js/widget.js",
    scriptId: "zl-facility-widget",
    html: `<a href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz" data-zl-widget-facility="alldent-centrum-stomatologiczne-anna-lemisz" rel="nofollow" data-placement="inline" data-zlw-type="facility-calendar">Umów wizytę</a>`,
  },
  certificate: {
    scriptSrc: "//platform.docplanner.com/js/widget.js",
    scriptId: "zl-widget-s",
    html: `<a class="zl-facility-url" href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz" rel="nofollow" data-zlw-facility="alldent-centrum-stomatologiczne-anna-lemisz" data-zlw-type="certificate" data-zlw-saas-only="false" data-zlw-a11y-title="Widget umówienia wizyty lekarskiej">Umów wizytę</a>`,
  },
  "rtg-calendar": {
    scriptSrc: "//platform.docplanner.com/js/widget.js",
    scriptId: "zl-widget-s",
    html: `<a id="zl-url" class="zl-url" href="http://www.znanylekarz.pl/all-dent-rtg/diagnostyk/czestochowa" rel="nofollow" data-zlw-doctor="all-dent-rtg" data-zlw-type="big_with_calendar" data-zlw-opinion="false" data-zlw-hide-branding="true" data-zlw-saas-only="false" data-zlw-a11y-title="Widget umówienia wizyty lekarskiej">Umów wizytę</a>`,
  },
} as const

const loadedScripts = new Map<string, Promise<void>>()

function loadScript(src: string, id: string): Promise<void> {
  const existing = loadedScripts.get(src)
  if (existing) return existing

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = src
    script.id = id
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.body.appendChild(script)
  })

  loadedScripts.set(src, promise)
  return promise
}

export function ZnanyLekarzWidget({ type, className }: ZnanyLekarzWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<WidgetState>("idle")

  const config = WIDGET_CONFIGS[type]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        observer.disconnect()
        setState("loading")

        timeoutId = setTimeout(() => {
          setState((current) => (current === "loading" ? "error" : current))
        }, 10_000)

        if (widgetRef.current) {
          widgetRef.current.innerHTML = config.html
        }

        loadScript(config.scriptSrc, config.scriptId)
          .then(() => {
            clearTimeout(timeoutId)
            setState("loaded")
          })
          .catch(() => {
            clearTimeout(timeoutId)
            setState("error")
          })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [config])

  return (
    <div ref={containerRef} className={cn("min-h-[200px]", className)}>
      {state === "idle" && (
        <div className="flex h-[200px] items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Widget ładuje się po przewinięciu...
          </span>
        </div>
      )}

      {state === "loading" && (
        <div className="flex h-[200px] items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </div>
      )}

      {state === "error" && (
        <div className="flex h-[200px] flex-col items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground">
            Nie udało się załadować widgetu rezerwacji.
          </p>
          <a
            href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            Umów wizytę na ZnanyLekarz
          </a>
        </div>
      )}

      <div
        ref={widgetRef}
        className={cn(
          state !== "loaded" && state !== "loading" && "hidden"
        )}
      />
    </div>
  )
}
