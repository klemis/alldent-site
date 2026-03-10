# Alldent — Design Document: Ewolucja strony

**Data**: 2026-03-10
**Podejście**: Polish & Extend (ewolucja obecnej strony)
**Deployment**: Vercel (darmowy Hobby plan)

---

## 1. Struktura stron

### Zachowane (z ulepszeniami)

| Strona | Zmiany |
|--------|--------|
| **/ (Home)** | Micro-animacje, widgety ZnanyLekarz (kalendarz + certyfikat/opinie), cieplejsze kolory |
| **/uslugi** | Animacje wejścia kart, lepsze ikony |
| **/cennik** | Oznaczenie placeholder do czasu uzupełnienia prawdziwych cen |
| **/zespol** | Placeholder zdjęć z komunikatem, ulepszone karty profili |
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

Trzy widgety, lazy-loaded (Intersection Observer):

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
- Pola: imię, email, telefon (opcjonalny), temat (dropdown), wiadomość
- Backend: Vercel API Route (`/api/contact`) → Resend → `alldent@onet.eu`
- Walidacja client-side + server-side
- Honeypot anti-spam (bez CAPTCHA)

### 3.2 Cookie consent banner
- GDPR-compliant banner na dole strony
- Dwa przyciski: "Akceptuję" / "Tylko niezbędne"
- localStorage persistence
- Blokowanie opcjonalnych skryptów do akceptacji

### 3.3 WhatsApp / Messenger floating button
- Sticky button prawy dolny róg
- Po kliknięciu: wybór WhatsApp lub Facebook Messenger
- WhatsApp: numer gabinetu (ten sam co kontaktowy)
- Messenger: link do FB gabinetu

### 3.4 Blog (MDX)
- Katalog `/content/blog/` z plikami `.mdx`
- Statycznie generowane (`generateStaticParams`)
- `/blog` — lista artykułów (data, tytuł, opis)
- `/blog/[slug]` — pełny artykuł
- Schema.org `Article` markup
- Gotowe pod AI-generowaną treść

### 3.5 PWA
- `manifest.json` z ikoną Alldent, kolorami, nazwą
- Service worker dla offline cache
- Instalowalna na telefonie

### 3.6 Micro-animacje (Framer Motion)
- Scroll-triggered fade-in + slide-up (20-30px)
- Hover: miękki cień + scale(1.02) na kartach
- Smooth page transitions (crossfade 200-300ms)
- Hero: delikatny parallax lub gradient shift
- Styl: ciepły, płynny, subtelny

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
- Next.js Metadata API — dynamiczne meta tagi

### AI Discoverability
- `public/llms.txt` — opis gabinetu dla LLM crawlerów
- Bogate Schema.org
- Semantyczny HTML (H1-H3, landmark roles)
- Treści w formie pytanie-odpowiedź
- Blog z artykułami edukacyjnymi

### Performance
- Lighthouse ≥ 95 (mobile + desktop)
- Next.js Image (WebP/AVIF, lazy loading)
- `next/font` z preload Geist
- Lazy loading widgetów ZnanyLekarz
- Vercel Edge Network CDN

---

## 6. Deployment i migracja

### Vercel
- GitHub repo → Vercel auto-deploy na push do `main`
- Preview deployments na PR/branch (darmowe)
- Hobby plan (darmowy) — wystarczający dla strony gabinetu
- Environment variables: Resend API key

### Migracja z WordPress (Zenbox)

**Krok 1 — Przygotowanie:**
- Backup WordPress (pliki + baza) przez panel Zenbox
- Nowa strona przetestowana na Vercel preview URL

**Krok 2 — DNS:**
- Zmiana rekordów w panelu Zenbox/registrar:
  - `A` record → `76.76.21.21`
  - `CNAME` www → `cname.vercel-dns.com`
- Propagacja: 1-48h (typowo 1-2h)

**Krok 3 — Po migracji:**
- WordPress na Zenbox jako backup (nie usuwamy)
- Monitoring 2 tygodnie
- Decyzja o rezygnacji z Zenbox

### Email
- Resend (darmowy: 3000 emaili/mies)
- API Route `/api/contact` → Resend → `alldent@onet.eu`

---

## 7. Dane kontaktowe

- **Email**: alldent@onet.eu
- **WhatsApp**: numer gabinetu (ten sam co kontaktowy)
- **Domena**: alldent-stomatologia.pl
- **Nazwa**: Alldent
- **ZnanyLekarz**: https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz

---

## 8. Czego NIE robimy

- Galeria / before-after
- Testimonials (opinie z widgetu ZnanyLekarz)
- FAQ osobna strona
- Multi-language (EN)
- Chatbot AI
- Dark mode
- Przebudowa od zera

## 9. Elementy do uzupełnienia przez klienta

- Prawdziwe zdjęcia zespołu
- Prawdziwy cennik
- Prawdziwe bio lekarzy
- Treści blogowe (mogą być generowane AI po wdrożeniu)
