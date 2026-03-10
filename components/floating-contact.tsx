"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"

const contactOptions = [
  {
    label: "Messenger",
    href: "https://m.me/alldent",
    ariaLabel: "Napisz na Messengerze",
    className: "bg-blue-500 hover:bg-blue-600 text-white",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5"
        aria-hidden="true"
      >
        <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2.16.15.26.36.27.58l.05 1.81c.02.56.59.92 1.1.69l2.02-.89c.17-.08.37-.1.55-.06.88.24 1.82.37 2.86.37 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm5.95 7.57-2.91 4.62a1.5 1.5 0 0 1-2.17.45l-2.32-1.74a.6.6 0 0 0-.72 0l-3.13 2.37c-.42.32-.96-.18-.68-.63l2.91-4.62a1.5 1.5 0 0 1 2.17-.45l2.32 1.74a.6.6 0 0 0 .72 0l3.13-2.37c.42-.32.96.18.68.63z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/48663333787",
    ariaLabel: "Napisz na WhatsAppie",
    className: "bg-green-500 hover:bg-green-600 text-white",
    icon: <Phone className="size-5" aria-hidden="true" />,
  },
] as const

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close()
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen, close])

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen &&
          contactOptions.map((option, index) => (
            <motion.div
              key={option.label}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-lg">
                {option.label}
              </span>
              <a
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={option.ariaLabel}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors",
                  option.className
                )}
              >
                {option.icon}
              </a>
            </motion.div>
          ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        aria-label={isOpen ? "Zamknij menu kontaktowe" : "Otwórz menu kontaktowe"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
      >
        {isOpen ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  )
}
