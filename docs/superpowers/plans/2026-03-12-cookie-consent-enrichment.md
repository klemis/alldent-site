# Cookie Consent Enrichment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich the cookie consent banner text and add a cookies/tracking section to the privacy policy page.

**Architecture:** Two text-content changes — updated banner copy with a privacy policy link in `cookie-consent.tsx`, and a new `<Card>` section in `polityka-prywatnosci/page.tsx` documenting all tracking tools with legal bases and retention periods.

**Tech Stack:** Next.js, React, next/link, lucide-react, shadcn/ui Card components

**Spec:** `docs/superpowers/specs/2026-03-12-cookie-consent-enrichment-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `components/cookie-consent.tsx` | Replace banner paragraph text, add Link import and element |
| Modify | `app/polityka-prywatnosci/page.tsx` | Add Monitor icon import, add new Card section with cookie/tracking tables |

---

## Chunk 1: Implementation

### Task 1: Update cookie consent banner text

**Files:**
- Modify: `components/cookie-consent.tsx:1-103`

- [ ] **Step 1: Add Link import**

Add a new import line after line 4 (`import { cn } from "@/lib/utils"`):

```tsx
import Link from "next/link"
```

- [ ] **Step 2: Replace the banner paragraph**

Replace the existing `<p>` element (lines 70-73):

```tsx
// OLD:
<p className="mb-4 text-sm leading-relaxed">
  Używamy plików cookie, aby zapewnić najlepszą jakość korzystania z
  naszej strony.
</p>
```

With:

```tsx
// NEW:
<p className="mb-4 text-sm leading-relaxed">
  Nasza strona korzysta z plików cookie i podobnych technologii.
  Niezbędne cookies zapewniają poprawne działanie strony. Opcjonalne
  (Vercel Analytics, Google Maps) wymagają Twojej zgody.{" "}
  <Link
    href="/polityka-prywatnosci"
    className="text-primary hover:underline font-medium"
  >
    Polityka prywatności
  </Link>
</p>
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Visual check on dev server**

Run: `npm run dev`

Check in browser at `http://localhost:3000`:
1. Clear localStorage (`localStorage.removeItem('cookie-consent')`) and refresh
2. Banner appears after 1s delay with new text
3. "Polityka prywatności" link is visible, styled in primary color
4. Link navigates to `/polityka-prywatnosci`
5. Both buttons still work (set localStorage, hide banner)
6. Check mobile viewport (375px width) — text wraps cleanly, no overflow

- [ ] **Step 5: Commit**

```bash
git add components/cookie-consent.tsx
git commit -m "feat: enrich cookie consent banner text with tracking details and privacy policy link"
```

---

### Task 2: Add cookies section to privacy policy page

**Files:**
- Modify: `app/polityka-prywatnosci/page.tsx:1-252`

- [ ] **Step 1: Add Monitor icon to import**

At line 4, add `Monitor` to the existing lucide-react import:

```tsx
// OLD:
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";

// NEW:
import { ArrowLeft, Shield, Lock, Eye, Database, Monitor } from "lucide-react";
```

- [ ] **Step 2: Add new Card section**

Insert the following new `<Card>` after the closing `</Card>` of the "Bezpieczeństwo danych" section (after line 209), before the blue "Pytania dotyczące przetwarzania danych?" Card (line 211):

```tsx
<Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Monitor className="w-5 h-5 text-primary" />
      Pliki cookie i technologie śledzenia
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    <div>
      <h4 className="font-semibold mb-3">
        Niezbędne (ładowane zawsze)
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2 pr-4 font-semibold">Narzędzie</th>
              <th className="pb-2 pr-4 font-semibold">Cel</th>
              <th className="pb-2 pr-4 font-semibold">Dane</th>
              <th className="pb-2 pr-4 font-semibold">Retencja</th>
              <th className="pb-2 font-semibold">Podstawa prawna</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-2 pr-4">Pliki cookie strony</td>
              <td className="py-2 pr-4">
                Zapamiętanie wyboru cookie consent
              </td>
              <td className="py-2 pr-4">
                Poziom zgody w localStorage
              </td>
              <td className="py-2 pr-4">
                Do usunięcia danych przeglądarki
              </td>
              <td className="py-2">
                Art. 173 ust. 3 Prawa telekomunikacyjnego
                (cookie niezbędne)
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Sentry</td>
              <td className="py-2 pr-4">
                Monitoring błędów i stabilności strony
              </td>
              <td className="py-2 pr-4">
                Adres IP, przeglądarka, URL błędu
              </td>
              <td className="py-2 pr-4">90 dni</td>
              <td className="py-2">
                Uzasadniony interes (art. 6 ust. 1 lit. f RODO)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h4 className="font-semibold mb-3">
        Opcjonalne (wymagają zgody)
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2 pr-4 font-semibold">Narzędzie</th>
              <th className="pb-2 pr-4 font-semibold">Cel</th>
              <th className="pb-2 pr-4 font-semibold">Dane</th>
              <th className="pb-2 pr-4 font-semibold">Retencja</th>
              <th className="pb-2 font-semibold">Podstawa prawna</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-2 pr-4">Vercel Analytics</td>
              <td className="py-2 pr-4">
                Analiza ruchu na stronie
              </td>
              <td className="py-2 pr-4">
                Odsłony, typ urządzenia, kraj, przeglądarka
              </td>
              <td className="py-2 pr-4">30 dni</td>
              <td className="py-2">
                Zgoda (art. 6 ust. 1 lit. a RODO)
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Google Maps</td>
              <td className="py-2 pr-4">
                Wyświetlanie mapy z lokalizacją gabinetu
              </td>
              <td className="py-2 pr-4">
                Adres IP, dane połączenia (szczegóły w
                polityce prywatności Google)
              </td>
              <td className="py-2 pr-4">
                Zgodnie z polityką Google
              </td>
              <td className="py-2">
                Zgoda (art. 6 ust. 1 lit. a RODO)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="space-y-3 text-sm text-muted-foreground">
      <p>
        Swoją zgodę na opcjonalne cookies możesz zmienić w dowolnym
        momencie, usuwając dane strony w ustawieniach przeglądarki.
        Przy kolejnej wizycie banner pojawi się ponownie.
      </p>
      <p>
        Sentry (Functional Software, Inc., USA) i Vercel Inc. (USA)
        przetwarzają dane na podstawie EU-US Data Privacy Framework.
        Google Ireland Ltd. przetwarza dane Google Maps.
      </p>
    </div>
  </CardContent>
</Card>
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Visual check on dev server**

Run: `npm run dev`

Check in browser at `http://localhost:3000/polityka-prywatnosci`:
1. New "Pliki cookie i technologie śledzenia" section appears between "Bezpieczeństwo danych" and the blue CTA card
2. Monitor icon visible in section header
3. Both tables render correctly
4. Tables scroll horizontally on mobile (375px width) without breaking layout
5. Text styling consistent with other sections (muted-foreground)

- [ ] **Step 5: Commit**

```bash
git add app/polityka-prywatnosci/page.tsx
git commit -m "feat: add cookies and tracking technologies section to privacy policy"
```

---

### Task 3: Final verification

- [ ] **Step 1: Run linter**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds. No type errors, no warnings related to changed files.

- [ ] **Step 3: End-to-end flow check**

On dev server (`npm run dev`):
1. Open `http://localhost:3000` in incognito/private window
2. Cookie banner appears with new text after 1s
3. Click "Polityka prywatności" link — navigates to privacy policy page
4. Scroll to "Pliki cookie i technologie śledzenia" — section present with both tables
5. Go back, click "Akceptuję wszystkie" — banner disappears
6. Refresh — banner does not reappear (consent persisted)
7. Clear localStorage, refresh — banner reappears
8. Click "Tylko niezbędne" — banner disappears, consent persisted

---

## Post-implementation checklist

- [ ] Send updated privacy policy page to lawyer for review
- [ ] Verify Sentry and Vercel DPF certification at dataprivacyframework.gov
- [ ] Check Sentry dashboard for IP anonymization settings
