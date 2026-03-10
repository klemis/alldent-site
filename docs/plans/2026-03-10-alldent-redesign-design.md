# Alldent — Design Document: Ewolucja strony

**Data**: 2026-03-10
**Podejście**: Polish & Extend (ewolucja obecnej strony)
**Deployment**: Vercel (darmowy Hobby plan)
**Rewizja**: v2 — po przeglądzie panelu ekspertów

---

## 1. Struktura stron

### Zachowane (z ulepszeniami)

| Strona | Zmiany |
|--------|--------|
| **/ (Home)** | Micro-animacje, widgety ZnanyLekarz (kalendarz + certyfikat/opinie), cieplejsze kolory |
| **/uslugi** | Animacje wejścia kart, lepsze ikony |
| **/cennik** | Dane do uzupełnienia przez klienta |
| **/zespol** | Dane i zdjęcia do uzupełnienia przez klienta |
| **/kontakt** | Formularz kontaktowy (email), rozszerzona mapa z instrukcjami dojazdu |
| **/umow-wizyte** | Pełna integracja ZnanyLekarz: kalendarz placówki + kalendarz RTG jako osobne sekcje |
| Strony prawne (3) | Bez zmian |

### Nowe strony

| Strona | Opis |
|--------|------|
| **/blog** | Lista artykułów MDX, statycznie generowane |
| **/blog/[slug]** | Pojedynczy artykuł z Schema.org Article markup |

### Usunięte z pierwotnego planu
- Galeria / before-after
- Testimonials (opinie z widgetu ZnanyLekarz zamiast tego)
- FAQ jako osobna strona

---

## 2. Integracja ZnanyLekarz

### Architektura komponentu

Dedykowany React component `<ZnanyLekarzWidget />` zamiast surowego `dangerouslySetInnerHTML`:

- **Singleton script loader** — skrypt ładowany raz, niezależnie od liczby widgetów
- **Dwa źródła skryptów** rozróżnione:
  - `https://www.znanylekarz.pl/platform/js/widget.js` (facility calendar)
  - `//platform.docplanner.com/js/widget.js` (certificate, RTG calendar)
- **Lazy loading** — `useEffect` + `IntersectionObserver`, widget ładuje się gdy wchodzi w viewport
- **Cleanup** — poprawny unmount przy nawigacji
- **Fallback** — jeśli widget nie załaduje się w 10s, wyświetl link do profilu ZnanyLekarz
- **Cookie consent** — widget NIE jest blokowany (klasyfikacja: niezbędny/funkcjonalny)

### Rozmieszczenie widgetów

| Widget | Typ | Lokalizacja |
|--------|-----|-------------|
| **Kalendarz placówki** | `facility-calendar` (inline) | `/umow-wizyte` — główna sekcja bookingu |
| **Certyfikat/opinie** | `certificate` | Homepage (trust section) + Footer (globalnie) |
| **Kalendarz RTG** | `big_with_calendar` | `/umow-wizyte` — sekcja "Badanie RTG" |

### Kody embed

Kalendarz placówki:
```html
<a href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz"
   data-zl-widget-facility="alldent-centrum-stomatologiczne-anna-lemisz"
   rel="nofollow" data-placement="inline" data-zlw-type="facility-calendar">
   Umów wizytę
</a>
<script id="zl-facility-widget" src="https://www.znanylekarz.pl/platform/js/widget.js"></script>
```

Certyfikat/opinie:
```html
<a class="zl-facility-url"
   href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz"
   rel="nofollow"
   data-zlw-facility="alldent-centrum-stomatologiczne-anna-lemisz"
   data-zlw-type="certificate"
   data-zlw-saas-only="false"
   data-zlw-a11y-title="Widget umówienia wizyty lekarskiej">
   Umów wizytę
</a>
<script>!function($_x,_s,id){var js,fjs=$_x.getElementsByTagName(_s)[0];if(!$_x.getElementById(id)){js=$_x.createElement(_s);js.id=id;js.src="//platform.docplanner.com/js/widget.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","zl-widget-s");</script>
```

Kalendarz RTG:
```html
<a id="zl-url" class="zl-url"
   href="http://www.znanylekarz.pl/all-dent-rtg/diagnostyk/czestochowa"
   rel="nofollow"
   data-zlw-doctor="all-dent-rtg"
   data-zlw-type="big_with_calendar"
   data-zlw-opinion="false"
   data-zlw-hide-branding="true"
   data-zlw-saas-only="false"
   data-zlw-a11y-title="Widget umówienia wizyty lekarskiej">
   Umów wizytę
</a>
<script>!function($_x,_s,id){var js,fjs=$_x.getElementsByTagName(_s)[0];if(!$_x.getElementById(id)){js=$_x.createElement(_s);js.id=id;js.src="//platform.docplanner.com/js/widget.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","zl-widget-s");</script>
```

---

## 3. Nowe funkcjonalności

### 3.1 Formularz kontaktowy

- Strona `/kontakt` obok danych kontaktowych
- Backend: Vercel API Route (`/api/contact`) → Resend → `alldent@onet.eu`
- Walidacja client-side + server-side
- Honeypot anti-spam (bez CAPTCHA)
- **Fallback**: jeśli API nie odpowiada, wyświetl dane kontaktowe (telefon, email)

**Pola formularza**:

| Pole | Typ | Wymagane | Walidacja |
|------|-----|----------|-----------|
| Imię | text | Tak | Min 2 znaki, max 50 |
| Email | email | Tak | Format email (regex) |
| Telefon | tel | Nie | Format PL: 9 cyfr |
| Temat | select | Tak | Jedna z opcji poniżej |
| Wiadomość | textarea | Tak | Min 10 znaków, max 1000 |

**Tematy dropdown**: Rezerwacja wizyty, Pytanie o usługę, Pytanie o cennik, Zmiana/odwołanie wizyty, Inne

**Komunikaty**:
- Sukces: "Dziękujemy! Odpowiemy najszybciej jak to możliwe."
- Błąd: "Przepraszamy, coś poszło nie tak. Zadzwoń do nas: +48 663 333 787"

### 3.2 Cookie consent banner

- GDPR-compliant banner na dole strony
- Dwa przyciski: "Akceptuję wszystkie" / "Tylko niezbędne"
- localStorage persistence
- **Niezbędne (zawsze ładowane)**: ZnanyLekarz widgety, fonty, core CSS/JS
- **Opcjonalne (blokowane do akceptacji)**: Google Maps embed, analytics (jeśli dodamy)

### 3.3 WhatsApp / Messenger floating button

- Sticky button prawy dolny róg
- Po kliknięciu: wybór WhatsApp lub Facebook Messenger
- WhatsApp: +48 663 333 787
- Messenger: link do FB gabinetu

### 3.4 Blog (MDX)

- Biblioteka: `next-mdx-remote`
- Katalog: `/content/blog/` z plikami `.mdx`
- Statycznie generowane (`generateStaticParams`)
- `/blog` — lista artykułów (bez paginacji na start)
- `/blog/[slug]` — pełny artykuł
- Schema.org `Article` markup
- Gotowe pod AI-generowaną treść

**Frontmatter schema**:
```yaml
title: "Tytuł artykułu"
description: "Krótki opis (max 160 znaków, używany w meta description)"
date: "2026-03-10"
author: "Dr Anna Kowalska"
image: "/images/blog/nazwa-obrazka.jpg"  # opcjonalne
tags: ["higiena", "profilaktyka"]        # opcjonalne
```

### 3.5 PWA

- `next-pwa` z domyślną strategią cache (stale-while-revalidate)
- `manifest.json` z ikoną Alldent, kolorami, nazwą
- Cachowane: strony, CSS/JS, fonty, obrazki
- NIE cachowane: widgety ZnanyLekarz, Google Maps
- Instalowalna na telefonie

### 3.6 Micro-animacje (Framer Motion)

- Scroll-triggered fade-in + slide-up (20-30px), duration 0.5s, ease-out
- Hover na kartach: cień + scale(1.02), transition 0.2s
- Smooth page transitions: crossfade 200-300ms
- Hero: delikatny parallax lub gradient shift
- Styl: ciepły, płynny, subtelny — żadnych bounce, rotate, neon

---

## 4. Kolorystyka i styl wizualny

### Ewolucja palety

| Element | Obecny | Nowy | Uzasadnienie |
|---------|--------|------|-------------|
| **Primary** | Chłodny teal (hue 210) | Cieplejszy teal (hue 185-190) | Przyjazny, mniej korporacyjny |
| **CTA** | Pomarańczowy (hue 50) | Ciepły coral (hue 40-45) | Lepszy kontrast, cieplejszy |
| **Tło** | Czysty biały | Off-white / cream | Mniej kliniczny |
| **Tekst** | Czarny/szary | Ciemny warm gray | Miękkość, czytelność |
| **Akcenty** | Brak | Miętowy / sage green | Zdrowie, spokój |

Dokładne wartości oklch do ustalenia podczas implementacji z weryfikacją kontrastu WCAG.

### Typografia
- Geist Sans — zostaje
- Line-height body: 1.7 (z 1.5)
- Weights: 400 (body), 500 (podtytuły), 600-700 (nagłówki)

### Spacing i layout
- Więcej white space: py-24/28 między sekcjami
- Zaokrąglone rogi: karty 1rem
- Miękkie ciepłe cienie zamiast border
- Content max-width 4xl dla tekstu

### Accessibility (WCAG 2.1 AA)
- Kontrast ≥ 4.5:1 (tekst), ≥ 3:1 (duże elementy)
- Touch targets ≥ 44px
- Widoczne focus indicators
- Skip-to-content link
- Alt-texty na obrazkach
- Semantyczny HTML

---

## 5. SEO i AI Discoverability

### Schema.org Structured Data

| Schema | Gdzie | Zawartość |
|--------|-------|-----------|
| `Dentist` + `MedicalBusiness` | Layout (globalnie) | Nazwa, adres, telefon, godziny, geo, logo |
| `LocalBusiness` | Homepage | Usługi, recenzje, lokalizacja |
| `MedicalService` | `/uslugi`, `/cennik` | Nazwa, opis, cena, kategoria per usługa |
| `Person` + `Dentist` | `/zespol` | Imię, kwalifikacje, specjalizacje per lekarz |
| `Article` | `/blog/[slug]` | Tytuł, autor, data, opis |
| `BreadcrumbList` | Wszystkie strony | Ścieżka nawigacji |

### Techniczne SEO
- `app/sitemap.ts` — automatyczny sitemap.xml
- `app/robots.ts` — robots.txt
- Canonical URLs per strona
- Open Graph + Twitter Cards z obrazkami
- Next.js Metadata API — dynamiczne meta tagi per strona

### AI Discoverability
- `public/llms.txt` — opis gabinetu dla LLM crawlerów
- Bogate Schema.org
- Semantyczny HTML (H1-H3, landmark roles)
- Treści w formie pytanie-odpowiedź
- Blog z artykułami edukacyjnymi

### Performance targets
- **Lighthouse** ≥ 95 (mobile + desktop)
- **LCP** < 2.5s
- **FID** < 100ms
- **CLS** < 0.1
- Next.js Image (WebP/AVIF, lazy loading)
- `next/font` z preload Geist
- Lazy loading widgetów ZnanyLekarz
- Vercel Edge Network CDN

---

## 6. Monitoring

- **Vercel Analytics** (darmowe, wbudowane) — traffic, Core Web Vitals
- **Sentry** free tier (10K events/mies) — error tracking, alerting
- **Google Search Console** — indeksacja, SEO monitoring, po wdrożeniu submit sitemap

---

## 7. Deployment i migracja

### Vercel
- GitHub repo → Vercel auto-deploy na push do `main`
- Preview deployments na PR/branch (darmowe)
- Hobby plan (darmowy) — wystarczający dla strony gabinetu
- Environment variables: Resend API key, Sentry DSN

### Migracja z WordPress (Zenbox)

Stara strona ma niski ruch i tylko 4 zaindeksowane strony w Google. Pomijamy redirect mapping — nowa strona z lepszym SEO szybko zbuduje świeżą indeksację.

**MX records**: Weryfikacja OK — MX wskazuje na Zenbox (`mx1/mx2/mx3.zenbox.pl`). Zmiana A/CNAME na Vercel nie wpłynie na email.

**Krok 1 — Przygotowanie:**
- Backup WordPress (pliki + baza) przez panel Zenbox
- Nowa strona przetestowana na Vercel preview URL

**Krok 2 — DNS:**
- Zmiana rekordów w panelu Zenbox/registrar:
  - `A` record → `76.76.21.21`
  - `CNAME` www → `cname.vercel-dns.com`
  - MX records — NIE RUSZAĆ (email zostaje na Zenbox)
- Propagacja: 1-48h (typowo 1-2h)

**Krok 3 — Po migracji:**
- WordPress na Zenbox jako backup (nie usuwamy)
- Submit sitemap.xml do Google Search Console
- Monitoring Vercel Analytics + Sentry

### Email (formularz kontaktowy)
- Resend (darmowy: 3000 emaili/mies)
- API Route `/api/contact` → Resend → `alldent@onet.eu`

---

## 8. Dane kontaktowe

- **Email**: alldent@onet.eu
- **Telefon/WhatsApp**: +48 663 333 787
- **Domena**: alldent-stomatologia.pl
- **Nazwa**: Alldent
- **Adres**: ul. Sabinowska 8, 42-200 Częstochowa
- **ZnanyLekarz**: https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz
- **ZnanyLekarz RTG**: http://www.znanylekarz.pl/all-dent-rtg/diagnostyk/czestochowa

---

## 9. Czego NIE robimy

- Galeria / before-after
- Testimonials (opinie z widgetu ZnanyLekarz)
- FAQ osobna strona
- Multi-language (EN)
- Chatbot AI
- Dark mode
- Przebudowa od zera
- Redirect mapping ze starego WordPressa (nowe SEO od zera)
- Strategia testowania (pomijamy)
- Strategia placeholderów (dane uzupełni klient)

## 10. Elementy do uzupełnienia przez klienta

- Prawdziwe zdjęcia zespołu
- Prawdziwy cennik
- Prawdziwe bio lekarzy
- Treści blogowe (mogą być generowane AI po wdrożeniu)
