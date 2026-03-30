# Content Restructuring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure all content across the alldent-site: new service categories and data, homepage category cards, pricing/team/contact page updates, and global business hours change.

**Architecture:** Data-first approach — update the data layer (`services.ts`, `types.ts`) first, then update all consuming pages. This ensures type safety catches any missed references. Pages are updated in dependency order: services page (primary consumer) → homepage → pricing → team → contact/footer/structured-data.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Lucide React icons, shadcn/ui components

**Spec:** `docs/superpowers/specs/2026-03-29-content-restructuring-design.md`

---

### Task 1: Update Service type — remove `featured` field

**Files:**
- Modify: `lib/types.ts:6-13`

- [ ] **Step 1: Remove `featured` from Service interface**

In `lib/types.ts`, replace the Service interface:

```typescript
export interface Service {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npx next build 2>&1 | head -30`

Expected: Build errors in `lib/data/services.ts` (still has `featured` property) and `app/page.tsx` (imports `featuredServices`). This is expected — we fix these in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add lib/types.ts
git commit -m "refactor: remove featured field from Service type"
```

---

### Task 2: Rewrite services data with new categories

**Files:**
- Modify: `lib/data/services.ts`

- [ ] **Step 1: Replace entire `lib/data/services.ts`**

```typescript
import {
  Shield,
  Sparkles,
  Wrench,
  Stethoscope,
  Heart,
  Crown,
  UserCheck,
  Smile,
  Zap,
  Syringe,
  ScanLine,
  HeartPulse,
  Palette,
  Layers,
} from "lucide-react";
import { Service } from "@/lib/types";

export const services: Service[] = [
  // === Profilaktyka ===
  {
    id: "general-checkup",
    name: "Badanie ogólne",
    description:
      "Kompleksowe badanie stomatologiczne z oceną stanu zdrowia jamy ustnej i planem leczenia",
    benefits: [
      "Konsultacja i indywidualny plan leczenia",
      "Wczesne wykrycie próchnicy",
      "Szczegółowa ocena stanu uzębienia",
    ],
    icon: Shield,
  },
  {
    id: "cleaning",
    name: "Higienizacja zębów",
    description:
      "Profesjonalne czyszczenie zębów przy użyciu najnowocześniejszego sprzętu GBT (Guided Biofilm Therapy) - innowacyjnej metody usuwania biofilmu bakteryjnego i kamienia nazębnego",
    benefits: [
      "Najnowocześniejszy sprzęt GBT",
      "Usunięcie kamienia i płytki bakteryjnej",
      "Polerowanie zębów",
      "Instruktaż higieny i edukacja",
    ],
    icon: Sparkles,
  },
  {
    id: "digital-diagnostics",
    name: "Diagnostyka cyfrowa",
    description:
      "Nowoczesna diagnostyka obrazowa z wykorzystaniem najnowszych technologii cyfrowych",
    benefits: [
      "Kontrolne zdjęcia pantomograficzne",
      "CBCT",
      "Badanie kamerą wewnątrzustną i laserem diagnostycznym",
    ],
    icon: ScanLine,
  },

  // === Stomatologia specjalistyczna ===
  {
    id: "orthodontics",
    name: "Ortodoncja",
    description:
      "Cyfrowa ortodoncja dla dzieci i dorosłych - aparaty stałe, ruchome i nakładki ortodontyczne z wykorzystaniem skanera wewnątrzustnego i cyfrowej mapy okluzji",
    benefits: [
      "Cyfrowy wycisk zamiast tradycyjnych",
      "Bezpłatny przegląd dla pacjentów ortodontycznych",
      "Aparaty stałe, ruchome i nakładki",
      "Leczenie dzieci i dorosłych",
    ],
    icon: Smile,
  },
  {
    id: "periodontology",
    name: "Periodontologia",
    description:
      "Diagnostyka i leczenie chorób przyzębia — od gingivitis po zaawansowaną periodontitis",
    benefits: [
      "Leczenie chorób przyzębia",
      "Wzmocnienie i stabilizacja zębów",
      "Zmniejszenie ryzyka chorób ogólnoustrojowych",
      "Redukcja nadwrażliwości szyjek zębowych",
    ],
    icon: HeartPulse,
  },
  {
    id: "pediatric",
    name: "Stomatologia dziecięca",
    description:
      "Specjalistyczna opieka stomatologiczna dla dzieci w przyjaznej atmosferze",
    benefits: [
      "Wizyty adaptacyjne",
      "Indywidualne podejście",
      "Profilaktyka próchnicy",
    ],
    icon: UserCheck,
  },
  {
    id: "oral-surgery",
    name: "Chirurgia stomatologiczna",
    description:
      "Nowoczesne zabiegi chirurgiczne w obrębie jamy ustnej z zastosowaniem najnowszych metod",
    benefits: [
      "Usuwanie zębów",
      "Podcinanie wędzidełek",
      "Minimalna inwazyjność",
    ],
    icon: Stethoscope,
  },
  {
    id: "laser-therapy",
    name: "Laseroterapia",
    description:
      "Nowoczesna terapia laserowa w leczeniu i wspomaganiu gojenia",
    benefits: [
      "Przyspieszenie gojenia po zabiegach",
      "Modelowanie linii dziąseł",
      "Minimalna inwazyjność",
    ],
    icon: Zap,
  },
  {
    id: "root-canal",
    name: "Leczenie kanałowe",
    description:
      "Endodoncja pod mikroskopem - precyzyjne leczenie zakażonych kanałów korzeniowych i zmian okołowierzchołkowych",
    benefits: [
      "Leczenie pod mikroskopem",
      "Leczenie zmian okołowierzchołkowych",
      "Eliminacja bólu",
    ],
    icon: Heart,
  },

  // === Stomatologia estetyczna ===
  {
    id: "bonding",
    name: "Licówki kompozytowe (Bonding)",
    description: "Odbudowa ubytków zębów materiałem kompozytowym",
    benefits: [
      "Przywrócenie kształtu",
      "Dopasowanie koloru",
      "Jeden zabieg",
      "Oszczędność tkanek",
    ],
    icon: Wrench,
  },
  {
    id: "veneers",
    name: "Licówki porcelanowe",
    description: "Cienkie płatki porcelany nakładane na przednie zęby",
    benefits: [
      "Idealny kształt i kolor",
      "Długotrwałość",
      "Naturalny wygląd",
      "Minimalna inwazyjność",
    ],
    icon: Crown,
  },
  {
    id: "teeth-whitening",
    name: "Wybielanie zębów",
    description: "Profesjonalne wybielanie zębów metodą nakładkową lub lampą",
    benefits: [
      "Zęby jaśniejsze o 2-8 tonów",
      "Bezpieczna metoda",
      "Długotrwały efekt",
      "Naturalny wygląd",
    ],
    icon: Sparkles,
  },
  {
    id: "discoloration-treatment",
    name: "Leczenie przebarwień zębów",
    description:
      "Diagnostyka i leczenie przebarwień zębów pochodzenia wewnętrznego i zewnętrznego — od profesjonalnego czyszczenia po mikroabrazję i wybielanie wewnętrzne",
    benefits: [
      "Indywidualna diagnostyka przyczyn przebarwień",
      "Skuteczne metody dopasowane do rodzaju przebarwienia",
      "Przywrócenie naturalnego koloru zębów",
      "Długotrwały efekt estetyczny",
    ],
    icon: Palette,
  },

  // === Stomatologia odtwórcza ===
  {
    id: "crowns",
    name: "Protetyka",
    description:
      "Kompleksowa odbudowa braków zębowych za pomocą koron, mostów i protez dopasowanych do indywidualnych potrzeb",
    benefits: [
      "Przywrócenie funkcji i estetyki",
      "Odbudowa startych zębów i wysokości zwarcia",
      "Odbudowa zębów po leczeniu kanałowym",
    ],
    icon: Crown,
  },
  {
    id: "dental-implants",
    name: "Implanty stomatologiczne",
    description: "Trwałe zastąpienie utraconych zębów implantami tytanowymi",
    benefits: [
      "Trwałe rozwiązanie",
      "Zachowanie kości",
      "Komfort użytkowania",
      "Naturalny wygląd",
    ],
    icon: Wrench,
  },
  {
    id: "composite-restorations",
    name: "Odbudowy kompozytowe",
    description:
      "Estetyczna odbudowa uszkodzonych i zniszczonych zębów wysokiej jakości materiałami kompozytowymi z precyzyjnym dopasowaniem koloru i kształtu",
    benefits: [
      "Precyzyjne dopasowanie koloru do naturalnych zębów",
      "Odbudowa ubytków i złamań",
      "Zachowanie maksimum własnych tkanek zęba",
      "Natychmiastowy efekt w jednej wizycie",
    ],
    icon: Layers,
  },
  {
    id: "implant-prosthetics",
    name: "Implantoprotetyka",
    description:
      "Kompleksowa odbudowa protetyczna na implantach - od pojedynczych koron po pełne uzupełnienia wspomagane implantami",
    benefits: [
      "Korony na implantach",
      "Mosty wspomagane implantami",
      "Protezy na implantach",
      "Trwałe i stabilne rozwiązanie",
    ],
    icon: Wrench,
  },
  {
    id: "flow-injection",
    name: "Flow injection",
    description:
      "Innowacyjna metoda odbudowy zębów przy użyciu płynnego materiału kompozytowego zapewniającego doskonałą adaptację i estetykę",
    benefits: [
      "Doskonała adaptacja materiału",
      "Wysoka estetyka wypełnień",
      "Minimalna inwazyjność",
      "Długotrwały rezultat",
    ],
    icon: Syringe,
  },
  {
    id: "conservative-dentistry",
    name: "Stomatologia zachowawcza",
    description:
      "Kompleksowa opieka zachowawcza - leczenie próchnicy, odbudowy zębów i profilaktyka chorób jamy ustnej",
    benefits: [
      "Leczenie próchnicy",
      "Wypełnienia kompozytowe",
      "Profilaktyka chorób jamy ustnej",
      "Zachowanie naturalnych zębów",
    ],
    icon: Shield,
  },
];

export const serviceCategories = {
  preventive: {
    name: "Profilaktyka",
    anchor: "profilaktyka",
    description: "Profilaktyka i podstawowa opieka stomatologiczna",
    services: services.filter((s) =>
      ["general-checkup", "cleaning", "digital-diagnostics"].includes(s.id),
    ),
  },
  specialized: {
    name: "Stomatologia specjalistyczna",
    anchor: "specjalistyczna",
    description: "Specjalistyczna opieka dla różnych grup pacjentów",
    services: services.filter((s) =>
      [
        "orthodontics",
        "periodontology",
        "pediatric",
        "oral-surgery",
        "laser-therapy",
        "root-canal",
      ].includes(s.id),
    ),
  },
  cosmetic: {
    name: "Stomatologia estetyczna",
    anchor: "estetyczna",
    description: "Zabiegi poprawiające wygląd uśmiechu",
    services: services.filter((s) =>
      [
        "bonding",
        "veneers",
        "teeth-whitening",
        "discoloration-treatment",
      ].includes(s.id),
    ),
  },
  restorative: {
    name: "Stomatologia odtwórcza",
    anchor: "odtworcza",
    description: "Odbudowa i zastępowanie utraconych zębów",
    services: services.filter((s) =>
      [
        "crowns",
        "dental-implants",
        "composite-restorations",
        "implant-prosthetics",
        "flow-injection",
        "conservative-dentistry",
      ].includes(s.id),
    ),
  },
};
```

- [ ] **Step 2: Verify TypeScript compiles for this file**

Run: `npx tsc --noEmit lib/data/services.ts 2>&1 | head -20`

If this doesn't work due to path aliases, run: `npx next build 2>&1 | tail -20`

Expected: Service data compiles. Remaining errors only from pages still importing `featuredServices`.

- [ ] **Step 3: Commit**

```bash
git add lib/data/services.ts
git commit -m "feat: restructure services data with new categories and content"
```

---

### Task 3: Update homepage — replace featured services with category cards

**Files:**
- Modify: `app/page.tsx:1-220` (Featured Services section and imports)

- [ ] **Step 1: Update imports**

In `app/page.tsx`, replace the import line:

```typescript
import { featuredServices } from "@/lib/data/services";
```

with:

```typescript
import { serviceCategories } from "@/lib/data/services";
import {
  Shield,
  Stethoscope,
  Sparkles,
  Wrench,
} from "lucide-react";
```

Note: `Shield` is already imported — just add the missing ones. Remove duplicate imports. Also remove `CheckCircle` from the lucide import since it won't be needed in the services section (keep it if used elsewhere on the page — check: it IS used in Equipment section, so keep it).

The final lucide import should be:

```typescript
import {
  Calendar,
  Phone,
  Clock,
  MapPin,
  Shield,
  Heart,
  CheckCircle,
  Users,
  Award,
  Stethoscope,
  Sparkles,
  Wrench,
} from "lucide-react";
```

- [ ] **Step 2: Replace the Featured Services section**

Replace everything from `{/* Featured Services */}` to the closing `</section>` (lines 160-220) with:

```tsx
        {/* Service Categories */}
        <section id="featured-services" className="py-16 md:py-24">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <FadeInOnScroll>
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Czym się zajmujemy
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Kompleksowa opieka stomatologiczna dla całej rodziny - od
                    profilaktyki po zaawansowane zabiegi estetyczne
                  </p>
                </div>
              </FadeInOnScroll>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {[
                  {
                    name: "Profilaktyka",
                    icon: Shield,
                    subtitle: "Badania, higienizacja, diagnostyka cyfrowa",
                    href: "/uslugi#profilaktyka",
                  },
                  {
                    name: "Stomatologia specjalistyczna",
                    icon: Stethoscope,
                    subtitle: "Ortodoncja, periodontologia, chirurgia",
                    href: "/uslugi#specjalistyczna",
                  },
                  {
                    name: "Stomatologia estetyczna",
                    icon: Sparkles,
                    subtitle: "Licówki, wybielanie, przebarwienia",
                    href: "/uslugi#estetyczna",
                  },
                  {
                    name: "Stomatologia odtwórcza",
                    icon: Wrench,
                    subtitle: "Protetyka, implanty, odbudowy",
                    href: "/uslugi#odtworcza",
                  },
                ].map((category) => (
                  <HoverScale key={category.name}>
                    <Link href={category.href}>
                      <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <category.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {category.name}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                {category.subtitle}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </Link>
                  </HoverScale>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link href="/uslugi">Zobacz wszystkie usługi</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 3: Update business hours in Contact section**

In the same file, replace the hours block (lines 454-458):

```tsx
                        <div className="text-muted-foreground space-y-1">
                          <p>Poniedziałek: 10:00 - 19:00</p>
                          <p>Wtorek: 11:00 - 19:00</p>
                          <p>Środa: 9:00 - 19:00</p>
                          <p>Czwartek: 8:00 - 18:00</p>
                          <p>Piątek: 9:00 - 15:00</p>
                        </div>
```

- [ ] **Step 4: Verify build**

Run: `npx next build 2>&1 | tail -20`

Expected: Homepage compiles without errors.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace featured services with category cards on homepage"
```

---

### Task 4: Update services page — new categories, anchors, remove PriceInfo

**Files:**
- Modify: `app/uslugi/page.tsx`

- [ ] **Step 1: Remove PriceInfo import and usage**

Remove the import line:
```typescript
import { PriceInfo } from "@/components/price-info";
```

Remove the PriceInfo usage at the bottom (line 183):
```tsx
        {/* Price Information */}
        <PriceInfo />
```

- [ ] **Step 2: Add anchor IDs to category sections**

In the services-by-category rendering, add an `id` attribute to each category div. Replace:

```tsx
                  <div key={categoryKey} className="space-y-8">
```

with:

```tsx
                  <div key={categoryKey} id={category.anchor} className="space-y-8 scroll-mt-24">
```

The `scroll-mt-24` class adds scroll margin so the heading isn't hidden behind the sticky navigation when scrolling to the anchor.

- [ ] **Step 3: Verify build**

Run: `npx next build 2>&1 | tail -20`

Expected: Services page compiles. No PriceInfo references remain.

- [ ] **Step 4: Commit**

```bash
git add app/uslugi/page.tsx
git commit -m "feat: add anchor IDs to service categories, remove PriceInfo"
```

---

### Task 5: Update pricing page — remove PriceInfo, update header, add new service prices

**Files:**
- Modify: `app/cennik/page.tsx`

- [ ] **Step 1: Remove PriceInfo import and usage**

Remove the import:
```typescript
import { PriceInfo } from "@/components/price-info";
```

Remove the usage at bottom (line 197-198):
```tsx
        {/* Price Information */}
        <PriceInfo />
```

- [ ] **Step 2: Update header description**

Replace lines 72-76:

```tsx
                <p className="text-lg text-muted-foreground">
                  Przejrzyste ceny naszych usług stomatologicznych. Podane ceny
                  są cenami orientacyjnymi - dokładna kwota ustalana jest po
                  konsultacji.
                </p>
```

with:

```tsx
                <p className="text-lg text-muted-foreground">
                  Podane ceny są cenami orientacyjnymi - dokładna kwota ustalana
                  jest po konsultacji.
                </p>
```

- [ ] **Step 3: Add pricing for new services**

In the `servicePricing` record, add entries for new services and remove the old `cleaning` key (now maps to same id, no change needed):

```typescript
const servicePricing: Record<string, string> = {
  "general-checkup": "od 120 zł",
  cleaning: "od 180 zł",
  "digital-diagnostics": "od --- zł",
  "teeth-whitening": "od 800 zł",
  veneers: "od 1200 zł/ząb",
  bonding: "od 300 zł",
  "dental-implants": "od 3500 zł",
  "root-canal": "od 600 zł",
  crowns: "od 1000 zł",
  pediatric: "od 150 zł",
  "oral-surgery": "od 400 zł",
  orthodontics: "od 3000 zł",
  "laser-therapy": "od 200 zł",
  "flow-injection": "od 400 zł",
  "implant-prosthetics": "od 5000 zł",
  "conservative-dentistry": "od 200 zł",
  periodontology: "od --- zł",
  "discoloration-treatment": "od --- zł",
  "composite-restorations": "od --- zł",
};
```

- [ ] **Step 4: Verify build**

Run: `npx next build 2>&1 | tail -20`

Expected: Pricing page compiles. No PriceInfo references remain.

- [ ] **Step 5: Commit**

```bash
git add app/cennik/page.tsx
git commit -m "feat: update pricing page - remove PriceInfo, add new services"
```

---

### Task 6: Delete PriceInfo component

**Files:**
- Delete: `components/price-info.tsx`

- [ ] **Step 1: Verify no remaining imports**

Run: `grep -r "price-info\|PriceInfo" app/ components/ lib/ --include="*.tsx" --include="*.ts"`

Expected: No matches (only the file itself and docs).

- [ ] **Step 2: Delete the file**

```bash
rm components/price-info.tsx
```

- [ ] **Step 3: Verify build**

Run: `npx next build 2>&1 | tail -20`

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/price-info.tsx
git commit -m "refactor: remove unused PriceInfo component"
```

---

### Task 7: Update team page — smaller cards, remove fields, add team photo placeholder

**Files:**
- Modify: `app/zespol/page.tsx`

- [ ] **Step 1: Add team photo placeholder after header section**

After the closing `</section>` of the Header section (line 88) and before `{/* Team Members */}`, add:

```tsx
        {/* Team Photo */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[21/9] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center space-y-2">
                  <Users className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-slate-500 font-medium">Zdjęcie zespołu</p>
                  <p className="text-sm text-slate-400">/images/team/zespol.jpg</p>
                </div>
              </div>
            </div>
          </div>
        </section>
```

Add `Users` to the lucide-react imports (it may not be imported yet — check). Current imports:

```typescript
import {
  ArrowLeft,
  Calendar,
  Phone,
  GraduationCap,
  Award,
  Languages,
  Heart,
  Users,
} from "lucide-react";
```

- [ ] **Step 2: Replace team member cards with smaller version**

Replace the Team Members section (lines 90-195) with:

```tsx
        {/* Team Members */}
        <section className="py-12 md:py-16">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2">
                {teamMembers.map((member, index) => (
                  <FadeInOnScroll key={index} delay={index * 0.1}>
                    <Card className="overflow-hidden">
                      <div className="flex gap-4 p-4">
                        {/* Photo */}
                        <div className="flex-shrink-0">
                          <Avatar className="w-20 h-20">
                            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg leading-tight">
                              {member.name}
                            </h3>
                            <p className="text-sm font-medium text-primary">
                              {member.title}
                            </p>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {member.bio}
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {member.specialties.map((specialty, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 3: Clean up unused imports**

Remove these from the lucide-react import since they're no longer used in the team cards:
- `GraduationCap` (was for "Wykształcenie" section — check if used elsewhere on page: NOT used in Values section, safe to remove)
- `Languages` (was for languages display — safe to remove)

Wait — `GraduationCap` IS used in the Values section at line 232. Keep it. Only remove `Languages`.

Updated imports:

```typescript
import {
  ArrowLeft,
  Calendar,
  Phone,
  GraduationCap,
  Award,
  Heart,
  Users,
} from "lucide-react";
```

- [ ] **Step 4: Verify build**

Run: `npx next build 2>&1 | tail -20`

Expected: Team page compiles successfully.

- [ ] **Step 5: Commit**

```bash
git add app/zespol/page.tsx
git commit -m "feat: update team page - smaller cards, team photo placeholder"
```

---

### Task 8: Update business hours globally — contact, footer, structured data

**Files:**
- Modify: `app/kontakt/page.tsx:146-165`
- Modify: `components/footer.tsx:161-165`
- Modify: `components/structured-data.tsx:35-66`

- [ ] **Step 1: Update contact page hours**

In `app/kontakt/page.tsx`, replace the hours table (lines 147-172):

```tsx
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Poniedziałek</span>
                              <span className="font-medium">10:00 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Wtorek</span>
                              <span className="font-medium">11:00 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Środa</span>
                              <span className="font-medium">9:00 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Czwartek</span>
                              <span className="font-medium">8:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Piątek</span>
                              <span className="font-medium">9:00 - 15:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sobota - Niedziela</span>
                              <span className="text-muted-foreground">
                                zamknięte
                              </span>
                            </div>
                          </div>
```

- [ ] **Step 2: Update footer hours**

In `components/footer.tsx`, replace the hours block (lines 161-165):

```tsx
                  <div className="text-slate-300 text-sm">
                    <p>Poniedziałek: 10:00 - 19:00</p>
                    <p>Wtorek: 11:00 - 19:00</p>
                    <p>Środa: 9:00 - 19:00</p>
                    <p>Czwartek: 8:00 - 18:00</p>
                    <p>Piątek: 9:00 - 15:00</p>
                  </div>
```

- [ ] **Step 3: Update structured data hours**

In `components/structured-data.tsx`, replace the `openingHoursSpecification` array (lines 35-66):

```typescript
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "11:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
```

- [ ] **Step 4: Verify no old hours remain**

Run: `grep -rn "8:00 - 19:00\|12:00 - 19:00\|8:00 - 15:00" app/ components/ lib/ --include="*.tsx" --include="*.ts"`

Expected: No matches.

Run: `grep -rn 'opens.*"08:00"' components/structured-data.tsx`

Expected: Only Thursday (which is correct — 08:00).

- [ ] **Step 5: Verify build**

Run: `npx next build 2>&1 | tail -20`

Expected: Full build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add app/kontakt/page.tsx components/footer.tsx components/structured-data.tsx app/page.tsx
git commit -m "feat: update business hours globally"
```

Note: `app/page.tsx` is included because Step 3 of Task 3 updated hours there too.

---

### Task 9: Final verification — full build and visual check

**Files:** None (verification only)

- [ ] **Step 1: Run full build**

Run: `npx next build 2>&1`

Expected: Build succeeds with no errors. All pages compile.

- [ ] **Step 2: Run linter**

Run: `npm run lint 2>&1`

Expected: No linting errors.

- [ ] **Step 3: Start dev server and visually verify**

Run: `npm run dev`

Check these pages manually:
- `/` — verify 4 category cards display, correct hours in contact section
- `/uslugi` — verify new category order, anchors work (`/uslugi#profilaktyka`), no PriceInfo
- `/cennik` — verify no "Przejrzyste ceny..." text, no PriceInfo, new services in table
- `/zespol` — verify team photo placeholder, smaller cards, no education/experience/language
- `/kontakt` — verify new hours
- Check footer hours on any page

- [ ] **Step 4: Verify anchor links from homepage**

Click each of the 4 category cards on homepage. They should scroll to the correct category on `/uslugi`.

- [ ] **Step 5: Final commit if any fixes needed**

If fixes were needed during visual verification:

```bash
git add -A
git commit -m "fix: address visual issues found during verification"
```
