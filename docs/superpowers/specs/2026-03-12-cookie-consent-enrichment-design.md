# Cookie Consent Enrichment — Design Spec

**Data**: 2026-03-12
**Podejście**: Minimalne uzupełnienie (opcja 1)
**Status**: Do weryfikacji prawnej po wdrożeniu

---

## Problem

Obecny cookie consent banner zawiera jednozdaniowy, generyczny tekst bez informacji o konkretnych narzędziach. Strona polityki prywatności (`/polityka-prywatnosci`) nie wspomina o cookies, analytics ani error monitoringu. Sentry ładuje się bezwarunkowo — co jest poprawne (uzasadniony interes), ale wymaga udokumentowania.

## Decyzje podjęte podczas brainstormingu

1. **Zestaw narzędzi**: Zostawiamy Vercel Analytics + Sentry. Bez GA4 ani Meta Pixel — zbyt duża złożoność RODO przy minimalnej wartości dla gabinetu stomatologicznego z lokalnym ruchem.
2. **Sentry a consent**: Sentry nie wymaga gatowania za consent. Klasyfikacja: monitoring błędów = uzasadniony interes administratora (art. 6.1.f RODO). Analogia do logów serwera. Wymaga jedynie wzmianki w polityce prywatności.
3. **Podejście do bannera**: Minimalne uzupełnienie treści, bez zmian w mechanice i UI.
4. **Gotowe biblioteki**: Odrzucone — obecny custom component (103 linie) wystarczy przy 2 kategoriach consent i 3 narzędziach.
5. **Jurysdykcja**: Wyłącznie Polska/UE (RODO + Prawo telekomunikacyjne art. 173).

## Zakres zmian

### Plik 1: `components/cookie-consent.tsx`

**Zmiana**: Treść akapitu w bannerze.

**Obecny tekst**:
> Używamy plików cookie, aby zapewnić najlepszą jakość korzystania z naszej strony.

**Nowy tekst**:
> Nasza strona korzysta z plików cookie i podobnych technologii. Niezbędne cookies zapewniają poprawne działanie strony. Opcjonalne cookies (Vercel Analytics) pomagają nam analizować ruch na stronie — wymagają Twojej zgody. [Polityka prywatności](/polityka-prywatnosci)

**Dodanie**: Link `<Link>` do `/polityka-prywatnosci` (import z `next/link`).

**Bez zmian**: Przyciski, mechanika consent (localStorage, hook `useCookieConsent`, event dispatch), UI/layout, animacje.

### Plik 2: `app/polityka-prywatnosci/page.tsx`

**Zmiana**: Nowa sekcja `<Card>` — "Pliki cookie i technologie śledzenia".

**Umieszczenie**: Po sekcji "Bezpieczeństwo danych", przed sekcją "Pytania dotyczące przetwarzania danych?".

**Zawartość nowej sekcji**:

#### Tabela: Niezbędne (ładowane zawsze)

| Narzędzie | Cel | Dane | Podstawa prawna |
|---|---|---|---|
| Pliki cookie strony | Zapamiętanie wyboru cookie consent | Identyfikator zgody w localStorage | Uzasadniony interes (art. 6.1.f RODO) |
| Sentry | Monitoring błędów i stabilności strony | Adres IP, przeglądarka, URL błędu | Uzasadniony interes (art. 6.1.f RODO) |

#### Tabela: Opcjonalne (wymagają zgody)

| Narzędzie | Cel | Dane | Podstawa prawna |
|---|---|---|---|
| Vercel Analytics | Analiza ruchu na stronie (odsłony, urządzenia, źródła) | Zanonimizowane dane o odwiedzinach | Zgoda (art. 6.1.a RODO) |
| Google Maps | Wyświetlanie mapy z lokalizacją gabinetu | Adres IP, dane połączenia (Google) | Zgoda (art. 6.1.a RODO) |

#### Akapit: Zarządzanie zgodą

> Swoją zgodę na opcjonalne cookies możesz zmienić w dowolnym momencie, usuwając dane strony w ustawieniach przeglądarki. Przy kolejnej wizycie banner pojawi się ponownie.

#### Akapit: Przekazywanie danych

> Sentry (Functional Software Inc., USA) i Vercel Inc. (USA) przetwarzają dane na podstawie EU-US Data Privacy Framework. Google Ireland Ltd. przetwarza dane Google Maps.

## Co NIE wchodzi w scope

- Żadne zmiany w mechanice consent (localStorage, hook, gating)
- Żadne zmiany w konfiguracji Sentry (zostaje bezwarunkowy — uzasadniony interes)
- Żadne nowe strony (bez dedykowanej `/polityka-cookies`)
- Żadne nowe zależności npm
- Żadne zmiany w `consent-analytics.tsx` ani `conditional-google-map.tsx`

## Po wdrożeniu

Zaktualizowana polityka prywatności do wysłania do prawnika w celu weryfikacji.
