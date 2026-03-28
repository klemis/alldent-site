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
4. **Gotowe biblioteki**: Odrzucone — obecny custom component wystarczy przy 2 kategoriach consent i 3 narzędziach.
5. **Jurysdykcja**: Wyłącznie Polska/UE (RODO + Prawo telekomunikacyjne art. 173).

## Zakres zmian

### Plik 1: `components/cookie-consent.tsx`

**Zmiana**: Treść akapitu w bannerze.

**Obecny tekst**:
> Używamy plików cookie, aby zapewnić najlepszą jakość korzystania z naszej strony.

**Nowy tekst**:
> Nasza strona korzysta z plików cookie i podobnych technologii. Niezbędne cookies zapewniają poprawne działanie strony. Opcjonalne (Vercel Analytics, Google Maps) wymagają Twojej zgody. [Polityka prywatności](/polityka-prywatnosci)

**Dodanie**: Link `<Link>` do `/polityka-prywatnosci` (import z `next/link`). Styl: `text-primary hover:underline font-medium` — spójny z istniejącymi linkami na stronie polityki prywatności.

**Uwaga**: Dłuższy tekst może wymagać drobnych korekt spacing/padding na wąskich ekranach mobilnych — dopuszczalne w ramach tej zmiany.

**Bez zmian**: Przyciski, mechanika consent (localStorage, hook `useCookieConsent`, event dispatch), animacje.

### Plik 2: `app/polityka-prywatnosci/page.tsx`

**Zmiana**: Nowa sekcja `<Card>` — "Pliki cookie i technologie śledzenia".

**Umieszczenie**: Po sekcji "Bezpieczeństwo danych", przed sekcją "Pytania dotyczące przetwarzania danych?".

**Ikona w nagłówku**: `Monitor` z `lucide-react` (spójna konwencja z istniejącymi sekcjami: Database, Lock, Eye).

**Zawartość nowej sekcji**:

#### Tabela: Niezbędne (ładowane zawsze)

| Narzędzie | Cel | Dane | Retencja | Podstawa prawna |
|---|---|---|---|---|
| Pliki cookie strony | Zapamiętanie wyboru cookie consent | Poziom zgody (all/essential) w localStorage | Do usunięcia danych przeglądarki | Zwolnione z obowiązku zgody (art. 173 ust. 3 Prawa telekomunikacyjnego — cookie niezbędne) |
| Sentry | Monitoring błędów i stabilności strony | Adres IP, przeglądarka, URL błędu | 90 dni (domyślne ustawienie Sentry) | Uzasadniony interes (art. 6.1.f RODO) |

#### Tabela: Opcjonalne (wymagają zgody)

| Narzędzie | Cel | Dane | Retencja | Podstawa prawna |
|---|---|---|---|---|
| Vercel Analytics | Analiza ruchu na stronie (odsłony, urządzenia, źródła) | Dane o odwiedzinach (odsłony, typ urządzenia, kraj, przeglądarka) | 30 dni | Zgoda (art. 6.1.a RODO) |
| Google Maps | Wyświetlanie mapy z lokalizacją gabinetu | Adres IP, dane połączenia — szczegóły w polityce prywatności Google | Zgodnie z polityką Google | Zgoda (art. 6.1.a RODO) |

#### Akapit: Zarządzanie zgodą

> Swoją zgodę na opcjonalne cookies możesz zmienić w dowolnym momencie, usuwając dane strony w ustawieniach przeglądarki. Przy kolejnej wizycie banner pojawi się ponownie.

#### Akapit: Przekazywanie danych

> Sentry (Functional Software, Inc., USA) i Vercel Inc. (USA) przetwarzają dane na podstawie EU-US Data Privacy Framework. Google Ireland Ltd. przetwarza dane Google Maps.

**Uwaga do weryfikacji prawnej**: Status certyfikacji DPF Sentry i Vercel powinien zostać potwierdzony na dataprivacyframework.gov przed publikacją. Jeśli którekolwiek narzędzie nie posiada certyfikacji DPF, należy wskazać standardowe klauzule umowne (SCC) jako mechanizm transferu. Dodatkowo: czy anonimizacja IP jest włączona w ustawieniach projektu Sentry — do weryfikacji w dashboardzie.

## Co NIE wchodzi w scope

- Żadne zmiany w mechanice consent (localStorage, hook, gating)
- Żadne zmiany w konfiguracji Sentry (zostaje bezwarunkowy — uzasadniony interes)
- Żadne nowe strony (bez dedykowanej `/polityka-cookies`)
- Żadne nowe zależności npm
- Żadne zmiany w `consent-analytics.tsx` ani `conditional-google-map.tsx`

## Po wdrożeniu

1. Zaktualizowana polityka prywatności do wysłania do prawnika w celu weryfikacji.
2. Zweryfikować status DPF Sentry i Vercel na dataprivacyframework.gov.
3. Sprawdzić ustawienia anonimizacji IP w projekcie Sentry.
