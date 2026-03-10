# Alldent — Implementation Plan

**Źródło**: `2026-03-10-alldent-redesign-design.md` (v2)
**Data**: 2026-03-10

---

## Fazy implementacji

Prace podzielone na 7 faz. Każda faza kończy się działającym buildem (`npm run build` musi przejść).

```
Faza 1: Fundament wizualny
  ↓
Faza 2: Komponenty infrastrukturalne (równoległa wewnętrznie)
  ↓
Faza 3: Aktualizacja stron (równoległa wewnętrznie)
  ↓
Faza 4: Blog MDX
  ↓
Faza 5: SEO i AI Discoverability
  ↓
Faza 6: PWA + Monitoring
  ↓
Faza 7: Deployment (Vercel + DNS)
```

---

## Faza 1: Fundament wizualny

Wszystko inne zależy od tej fazy — kolory, spacing, animacje to fundamenty.

### 1.1 Aktualizacja palety kolorów
**Plik**: `app/globals.css`
**Zmiany**:
- `--primary`: oklch(0.55 0.15 210) → cieplejszy teal (~hue 185-190)
- `--cta`: oklch(0.65 0.18 50) → ciepły coral (~hue 40-45)
- `--background`: oklch(1 0 0) → off-white/cream (np. oklch(0.99 0.005 90))
- `--foreground`: oklch(0.145 0 0) → warm gray (np. oklch(0.2 0.01 60))
- Nowy `--accent`: miętowy/sage green
- Weryfikacja kontrastu WCAG 4.5:1 dla każdej pary kolory tekst/tło
- Usunięcie `.dark` theme (nie robimy dark mode)

### 1.2 Typografia i spacing
**Pliki**: `app/globals.css`, `app/layout.tsx`
**Zmiany**:
- Body line-height: 1.7
- Spacing sekcji: py-20 → py-24 lub py-28
- Card border-radius: 0.625rem → 1rem (aktualizacja `--radius`)
- Card shadows: zamiana border na miękkie cienie (box-shadow z warm tone)

### 1.3 Framer Motion setup
**Instalacja**: `npm install framer-motion`
**Nowe pliki**:
- `components/motion.tsx` — reusable animation wrappers:
  - `<FadeInOnScroll>` — fade-in + slide-up (20-30px), duration 0.5s, ease-out
  - `<HoverScale>` — scale(1.02) + shadow na hover, transition 0.2s
  - `<PageTransition>` — crossfade wrapper (200-300ms)
**Zmiany**: `app/layout.tsx` — wrap children w `<PageTransition>`

### 1.4 Aktualizacja gradientów sekcji
**Pliki**: wszystkie `page.tsx` z `bg-gradient-to-br from-blue-50 to-teal-50`
**Zmiana**: nowe gradient values matching cieplejszą paletę

**Weryfikacja**: `npm run build` + wizualny przegląd wszystkich stron

---

## Faza 2: Komponenty infrastrukturalne

Cztery nowe komponenty, niezależne od siebie — mogą być budowane równolegle.

### 2.1 ZnanyLekarz Widget component
**Nowy plik**: `components/znanylekarz-widget.tsx`
**Props**:
```typescript
type ZnanyLekarzWidgetProps = {
  type: 'facility-calendar' | 'certificate' | 'rtg-calendar'
  className?: string
}
```
**Implementacja**:
- Singleton script loader (Map<scriptSrc, Promise> do śledzenia załadowanych skryptów)
- `useEffect` + `IntersectionObserver` do lazy loading
- `useRef` na container div
- Fallback po 10s timeout: link do profilu ZnanyLekarz
- Cleanup w return z useEffect
- Konfiguracja widgetów w obiekcie wewnątrz komponentu (nie w props)

### 2.2 Cookie Consent banner
**Nowy plik**: `components/cookie-consent.tsx`
**Implementacja**:
- Sprawdzenie `localStorage.getItem('cookie-consent')` na mount
- Jeśli brak — wyświetl banner (fixed bottom, z-50)
- "Akceptuję wszystkie" → `localStorage.setItem('cookie-consent', 'all')`
- "Tylko niezbędne" → `localStorage.setItem('cookie-consent', 'essential')`
- Export hook `useCookieConsent()` → zwraca aktualny level
- Google Maps na `/kontakt` conditionally rendered na podstawie consent
**Zmiana**: `app/layout.tsx` — dodać `<CookieConsent />` przed `</body>`

### 2.3 WhatsApp / Messenger floating button
**Nowy plik**: `components/floating-contact.tsx`
**Implementacja**:
- Sticky button: fixed bottom-6 right-6, z-40
- Ikona wiadomości (Lucide: `MessageCircle`)
- Po kliknięciu: expand z dwoma opcjami (WhatsApp, Messenger)
- WhatsApp: `https://wa.me/48663333787`
- Messenger: link do strony FB gabinetu
- Animacja: scale-in na expand, fade-out na collapse
- Click-outside zamyka menu
**Zmiana**: `app/layout.tsx` — dodać `<FloatingContact />` przed `</body>`

### 2.4 Contact Form component
**Nowe pliki**:
- `components/contact-form.tsx` — formularz React
- `app/api/contact/route.ts` — Vercel API Route
**Instalacja**: `npm install resend`
**Formularz**:
- Pola: imię, email, telefon (opcja), temat (select), wiadomość
- Tematy: Rezerwacja wizyty | Pytanie o usługę | Pytanie o cennik | Zmiana/odwołanie wizyty | Inne
- Client-side validation (native HTML5 + custom)
- Honeypot: ukryte pole `website` — jeśli wypełnione = bot
- States: idle → submitting → success → error
- Fallback na error: "Zadzwoń: +48 663 333 787"
**API Route**:
- Walidacja server-side (powtórzenie reguł)
- Honeypot check
- Rate limit: prosty in-memory counter (max 5 req/min per IP)
- Resend API: from `noreply@alldent-stomatologia.pl` lub Resend default, to `alldent@onet.eu`
- Response: 200 OK | 400 validation | 429 rate limit | 500 error

**Weryfikacja**: `npm run build` + każdy komponent renderuje się poprawnie

---

## Faza 3: Aktualizacja stron

Zastosowanie nowych komponentów i animacji na istniejących stronach.

### 3.1 Homepage (`app/page.tsx`)
- Wrap sekcji w `<FadeInOnScroll>`
- Karty usług i sprzętu w `<HoverScale>`
- Zamiana obecnego ZnanyLekarz embed na `<ZnanyLekarzWidget type="certificate" />`
- Hero: dodać delikatny parallax lub animowany gradient
- Trust section: dodać widget certyfikat/opinie ZnanyLekarz
- Aktualizacja gradientów na cieplejszą paletę

### 3.2 Strona Umów wizytę (`app/umow-wizyte/page.tsx`)
- Zamiana obecnego ZnanyLekarz embed na `<ZnanyLekarzWidget type="facility-calendar" />`
- Dodanie nowej sekcji "Badanie RTG" z `<ZnanyLekarzWidget type="rtg-calendar" />`
- Animacje wejścia sekcji

### 3.3 Strona Kontakt (`app/kontakt/page.tsx`)
- Dodanie `<ContactForm />` w kolumnie obok danych kontaktowych
- Google Maps: conditional rendering na podstawie `useCookieConsent()`
- Placeholder gdy Maps zablokowane: statyczna mapa/obrazek + link "Otwórz w Google Maps"
- Animacje wejścia kart

### 3.4 Strona Usługi (`app/uslugi/page.tsx`)
- Wrap kart w `<FadeInOnScroll>` z staggered delay
- Karty w `<HoverScale>`
- Aktualizacja gradientów

### 3.5 Strona Cennik (`app/cennik/page.tsx`)
- Animacje wejścia
- Aktualizacja gradientów

### 3.6 Strona Zespół (`app/zespol/page.tsx`)
- Animacje wejścia kart
- `<HoverScale>` na profilach
- Aktualizacja gradientów

### 3.7 Footer (`components/footer.tsx`)
- Dodanie `<ZnanyLekarzWidget type="certificate" />` w footerze (globalnie)

**Weryfikacja**: `npm run build` + przegląd wizualny każdej strony

---

## Faza 4: Blog MDX

### 4.1 Setup MDX
**Instalacja**: `npm install next-mdx-remote gray-matter`
**Nowe pliki**:
- `lib/blog.ts` — funkcje do czytania MDX:
  - `getAllPosts()` → lista postów (frontmatter + slug), sortowana po dacie
  - `getPostBySlug(slug)` → pełny post (frontmatter + MDX source)
- `content/blog/` — katalog na pliki `.mdx`

### 4.2 Blog listing page
**Nowy plik**: `app/blog/page.tsx`
- Lista artykułów: tytuł, data, opis, opcjonalny obrazek
- Karty z `<FadeInOnScroll>` + `<HoverScale>`
- Metadata: title, description, OG tags
- Brak paginacji (na start)

### 4.3 Blog post page
**Nowy plik**: `app/blog/[slug]/page.tsx`
- `generateStaticParams()` — prerender wszystkich postów
- `generateMetadata()` — dynamiczne meta z frontmatter
- MDX rendering z `next-mdx-remote`
- Schema.org `Article` JSON-LD
- Nawigacja: powrót do listy
- Typografia: prose styling (max-width 4xl, line-height 1.7)

### 4.4 Przykładowy artykuł
**Nowy plik**: `content/blog/higiena-jamy-ustnej.mdx`
- Krótki artykuł demonstracyjny (300-500 słów)
- Poprawny frontmatter
- Weryfikacja że cały pipeline działa

### 4.5 Nawigacja
- Dodanie linku "Blog" do `components/navigation.tsx`

**Weryfikacja**: `npm run build` + `/blog` wyświetla listę + `/blog/higiena-jamy-ustnej` renderuje artykuł

---

## Faza 5: SEO i AI Discoverability

### 5.1 Schema.org Structured Data
**Nowy plik**: `components/structured-data.tsx` — komponent `<JsonLd data={...} />`
**Zmiany na stronach**:
- `app/layout.tsx`: `Dentist` + `MedicalBusiness` (globalnie)
- `app/page.tsx`: `LocalBusiness`
- `app/uslugi/page.tsx`: `MedicalService` per usługa
- `app/cennik/page.tsx`: `MedicalService` z cenami
- `app/zespol/page.tsx`: `Person` + `Dentist` per lekarz
- `app/blog/[slug]/page.tsx`: `Article` (już w fazie 4)
- Wszystkie strony: `BreadcrumbList`

### 5.2 Techniczne SEO
**Nowe pliki**:
- `app/sitemap.ts` — dynamiczny sitemap.xml (wszystkie strony + blog posts)
- `app/robots.ts` — robots.txt (Allow: /, Sitemap URL)
**Zmiany**:
- Każda strona: unikalne `generateMetadata()` z title, description, OG, Twitter Cards
- `app/layout.tsx`: canonical URL base, OG defaults

### 5.3 AI Discoverability
**Nowy plik**: `public/llms.txt`
**Zawartość**: Opis gabinetu w formacie zrozumiałym dla LLM crawlerów:
- Nazwa, specjalizacja, lokalizacja
- Lista usług
- Dane kontaktowe
- Godziny otwarcia
- Sposób rezerwacji

**Weryfikacja**: `npm run build` + sprawdzenie `/sitemap.xml`, `/robots.txt`, `/llms.txt` + walidacja Schema.org

---

## Faza 6: PWA + Monitoring

### 6.1 PWA
**Instalacja**: `npm install next-pwa`
**Zmiany**:
- `next.config.ts`: dodanie konfiguracji next-pwa
- `public/manifest.json`: nazwa "Alldent", ikony, kolory (primary + background)
- Ikony PWA: wygenerować z logo (192x192, 512x512)
- Domyślna strategia cache: stale-while-revalidate

### 6.2 Vercel Analytics
**Instalacja**: `npm install @vercel/analytics`
**Zmiana**: `app/layout.tsx` — dodanie `<Analytics />` component

### 6.3 Sentry
**Instalacja**: `npx @sentry/wizard@latest -i nextjs`
**Konfiguracja**: Sentry DSN w env variable, basic error tracking
**Uwaga**: Sentry setup to interaktywny wizard — może wymagać ręcznej interwencji

**Weryfikacja**: `npm run build` + PWA manifest dostępny + Analytics tag present

---

## Faza 7: Deployment

### 7.1 Vercel setup
- Połączenie repo GitHub z Vercel (przez vercel.com dashboard)
- Environment variables:
  - `RESEND_API_KEY`
  - `SENTRY_DSN`
  - `NEXT_PUBLIC_SENTRY_DSN`
- Weryfikacja preview deployment na branchu

### 7.2 Przygotowanie migracji
- Backup WordPress na Zenbox (pliki + baza)
- Test nowej strony na Vercel preview URL
- Weryfikacja wszystkich stron, formularza, widgetów

### 7.3 DNS migration
- W panelu Zenbox/registrar:
  - `A` record → `76.76.21.21`
  - `CNAME` www → `cname.vercel-dns.com`
  - **MX records — NIE RUSZAĆ**
- Czekanie na propagację DNS

### 7.4 Post-launch
- Weryfikacja strony na produkcyjnej domenie
- Submit sitemap.xml do Google Search Console
- Weryfikacja Vercel Analytics + Sentry działają
- WordPress na Zenbox zostaje jako backup

---

## Zależności między fazami

```
Faza 1 ──→ Faza 2 ──→ Faza 3 ──→ Faza 4
                                     ↓
                                   Faza 5 ──→ Faza 6 ──→ Faza 7
```

- **Faza 1** musi być pierwsza (fundament wizualny)
- **Faza 2** zależy od Fazy 1 (komponenty używają nowych kolorów/animacji)
- **Faza 3** zależy od Fazy 2 (strony używają nowych komponentów)
- **Faza 4** zależy od Fazy 1 (blog używa nowych styli), może być równoległa z Fazą 3
- **Faza 5** może zacząć się po Fazie 3 (potrzebuje finalnych stron)
- **Faza 6** niezależna od 5, ale logicznie po niej
- **Faza 7** ostatnia — wymaga gotowej, przetestowanej strony

## Nowe zależności (npm)

| Pakiet | Faza | Cel |
|--------|------|-----|
| `framer-motion` | 1 | Animacje |
| `resend` | 2 | Email API |
| `next-mdx-remote` | 4 | Blog MDX rendering |
| `gray-matter` | 4 | Blog frontmatter parsing |
| `next-pwa` | 6 | Progressive Web App |
| `@vercel/analytics` | 6 | Analytics |
| `@sentry/nextjs` | 6 | Error tracking |
