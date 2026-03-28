# Alldent Redesign — Technical Design Specification

**Date**: 2026-03-10
**Based on**: `2026-03-10-alldent-redesign-design.md` (v2)
**Scope**: Polish & Extend — evolution of existing Next.js 15 site
**Stack**: Next.js 15.5 · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Component Design](#2-component-design)
3. [Page-Level Changes](#3-page-level-changes)
4. [New Features — Detailed Design](#4-new-features--detailed-design)
5. [Color System & Theming](#5-color-system--theming)
6. [SEO & Structured Data](#6-seo--structured-data)
7. [API Design](#7-api-design)
8. [New Dependencies](#8-new-dependencies)
9. [File Structure Changes](#9-file-structure-changes)
10. [Implementation Phases](#10-implementation-phases)

---

## 1. Architecture Overview

### Current State → Target State

```
CURRENT                              TARGET
─────────────────────────────────    ─────────────────────────────────
9 static pages                       11 pages (+ dynamic /blog/[slug])
3 custom components                  ~15 custom components
8 shadcn/ui components               ~10 shadcn/ui components
No API routes                        1 API route (/api/contact)
dangerouslySetInnerHTML widgets       Dedicated <ZnanyLekarzWidget />
No animations                        Framer Motion micro-animations
No PWA                               next-pwa with SW
No blog                              MDX blog with SSG
No cookie consent                    GDPR cookie banner
No contact form                      Server-validated email form
```

### Rendering Strategy

| Route | Strategy | Rationale |
|-------|----------|-----------|
| `/` | SSG | Static homepage, rebuilt on deploy |
| `/uslugi` | SSG | Static service catalog |
| `/cennik` | SSG | Static pricing |
| `/zespol` | SSG | Static team profiles |
| `/kontakt` | SSG | Static contact + client-side form |
| `/umow-wizyte` | SSG | Static shell, widgets load client-side |
| `/blog` | SSG | List generated from MDX files |
| `/blog/[slug]` | SSG | `generateStaticParams` from content dir |
| `/api/contact` | Serverless | Vercel serverless function |
| Legal pages (3) | SSG | Static content |

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        BUILD TIME (SSG)                         │
│                                                                 │
│  lib/data/services.ts ──→ /uslugi, /cennik, / (homepage)       │
│  lib/data/team.ts     ──→ /zespol, / (homepage)                │
│  content/blog/*.mdx   ──→ /blog, /blog/[slug]                  │
│  lib/data/contact.ts  ──→ /kontakt, layout (Schema.org)        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT-SIDE (Runtime)                        │
│                                                                 │
│  ZnanyLekarz scripts  ──→ Widget hydration (IntersectionObserver)│
│  Contact form submit  ──→ /api/contact ──→ Resend ──→ email    │
│  Cookie consent       ──→ localStorage read/write               │
│  Google Maps iframe   ──→ Conditional load (cookie consent)     │
│  WhatsApp/Messenger   ──→ External links (new tab)              │
│  Service Worker       ──→ Cache API (stale-while-revalidate)    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Design

### 2.1 New Components

#### `<ZnanyLekarzWidget />` — Widget Loader

**Location**: `components/znanylekarz-widget.tsx`
**Type**: Client Component (`'use client'`)

```typescript
interface ZnanyLekarzWidgetProps {
  type: 'facility-calendar' | 'certificate' | 'big_with_calendar';
  /** Lazy-load via IntersectionObserver. Default: true */
  lazy?: boolean;
  /** Fallback timeout in ms. Default: 10000 */
  fallbackTimeout?: number;
  /** CSS class for container */
  className?: string;
}
```

**Architecture**:
- Singleton pattern for script loading (two script sources tracked separately)
- `useEffect` + `IntersectionObserver` for lazy loading
- `useRef` for DOM container reference
- State machine: `idle → loading → loaded | error`
- Cleanup on unmount: remove widget DOM nodes
- Fallback: after `fallbackTimeout`, show direct link to ZnanyLekarz profile

**Script Sources**:
```
facility-calendar  → https://www.znanylekarz.pl/platform/js/widget.js
certificate        → //platform.docplanner.com/js/widget.js
big_with_calendar  → //platform.docplanner.com/js/widget.js
```

**Singleton Script Loader** (module-level):
```typescript
// components/znanylekarz-widget.tsx (module scope)
const scriptStatus: Record<string, 'idle' | 'loading' | 'loaded' | 'error'> = {};

function loadScript(src: string): Promise<void> {
  if (scriptStatus[src] === 'loaded') return Promise.resolve();
  if (scriptStatus[src] === 'loading') {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      existing?.addEventListener('load', () => resolve());
      existing?.addEventListener('error', () => reject());
    });
  }
  scriptStatus[src] = 'loading';
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => { scriptStatus[src] = 'loaded'; resolve(); };
    script.onerror = () => { scriptStatus[src] = 'error'; reject(); };
    document.body.appendChild(script);
  });
}
```

**Widget Config** (static data, not props):
```typescript
const WIDGET_CONFIG = {
  'facility-calendar': {
    scriptSrc: 'https://www.znanylekarz.pl/platform/js/widget.js',
    href: 'https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz',
    dataAttributes: {
      'data-zl-widget-facility': 'alldent-centrum-stomatologiczne-anna-lemisz',
      'data-placement': 'inline',
      'data-zlw-type': 'facility-calendar',
    },
  },
  'certificate': {
    scriptSrc: '//platform.docplanner.com/js/widget.js',
    href: 'https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz',
    dataAttributes: {
      'data-zlw-facility': 'alldent-centrum-stomatologiczne-anna-lemisz',
      'data-zlw-type': 'certificate',
      'data-zlw-saas-only': 'false',
      'data-zlw-a11y-title': 'Widget umówienia wizyty lekarskiej',
    },
  },
  'big_with_calendar': {
    scriptSrc: '//platform.docplanner.com/js/widget.js',
    href: 'http://www.znanylekarz.pl/all-dent-rtg/diagnostyk/czestochowa',
    dataAttributes: {
      'data-zlw-doctor': 'all-dent-rtg',
      'data-zlw-type': 'big_with_calendar',
      'data-zlw-opinion': 'false',
      'data-zlw-hide-branding': 'true',
      'data-zlw-saas-only': 'false',
      'data-zlw-a11y-title': 'Widget umówienia wizyty lekarskiej',
    },
  },
} as const;
```

---

#### `<ContactForm />` — Email Contact Form

**Location**: `components/contact-form.tsx`
**Type**: Client Component (`'use client'`)

```typescript
interface ContactFormProps {
  className?: string;
}

// Internal form state
interface ContactFormData {
  name: string;       // required, 2-50 chars
  email: string;      // required, email format
  phone: string;      // optional, 9 digits (PL)
  subject: string;    // required, one of SUBJECT_OPTIONS
  message: string;    // required, 10-1000 chars
  honeypot: string;   // hidden field, must be empty
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SUBJECT_OPTIONS = [
  'Rezerwacja wizyty',
  'Pytanie o usługę',
  'Pytanie o cennik',
  'Zmiana/odwołanie wizyty',
  'Inne',
] as const;
```

**Validation** (shared between client and server):
```typescript
// lib/validation/contact.ts
import { z } from 'zod'; // or manual validation to avoid dep

export const contactSchema = {
  name: { min: 2, max: 50 },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { pattern: /^\d{9}$/, optional: true },
  subject: { oneOf: SUBJECT_OPTIONS },
  message: { min: 10, max: 1000 },
};
```

**Decision — No Zod**: To avoid adding a dependency for 5 simple fields, use manual validation functions shared between client and API route. If form complexity grows later, Zod can be added.

**Behavior**:
1. Client-side validation on blur + submit
2. Honeypot field (hidden, `tabIndex: -1`, `autocomplete: off`)
3. POST to `/api/contact` with JSON body
4. Success → green banner with success message
5. Error → red banner with phone number fallback
6. Disable submit button during `submitting` state

---

#### `<CookieConsent />` — GDPR Cookie Banner

**Location**: `components/cookie-consent.tsx`
**Type**: Client Component (`'use client'`)

```typescript
interface CookieConsentProps {
  className?: string;
}

type ConsentLevel = 'all' | 'essential' | null; // null = not yet decided
```

**Architecture**:
- Reads `localStorage.getItem('cookie-consent')` on mount
- If `null`, shows bottom-fixed banner
- Two buttons: "Akceptuję wszystkie" (`all`) / "Tylko niezbędne" (`essential`)
- Stores choice in `localStorage`
- Exposes `useCookieConsent()` hook for other components

**Hook** (`lib/hooks/use-cookie-consent.ts`):
```typescript
export function useCookieConsent(): {
  consent: ConsentLevel;
  hasConsented: boolean;
  acceptAll: () => void;
  acceptEssential: () => void;
}
```

**Consent-Gated Components**:
- Google Maps iframe → only loads when `consent === 'all'`
- Future analytics → only loads when `consent === 'all'`
- ZnanyLekarz widgets → always loaded (essential/functional)

---

#### `<FloatingContact />` — WhatsApp / Messenger Button

**Location**: `components/floating-contact.tsx`
**Type**: Client Component (`'use client'`)

```typescript
interface FloatingContactProps {
  whatsappNumber: string;  // "+48663333787"
  messengerUrl: string;    // FB Messenger link
}
```

**Behavior**:
- Fixed position: bottom-right (right-6 bottom-6)
- Main button: message icon, 56px circle
- On click: expand to show WhatsApp + Messenger options (small pills above)
- Click outside or second click: collapse
- Mobile: 48px circle (still ≥ 44px touch target)
- Z-index: 40 (below modals/sheets, above content)
- Animate with Framer Motion: scale + fade for expand/collapse

---

#### `<AnimatedSection />` — Scroll-Triggered Animation Wrapper

**Location**: `components/animated-section.tsx`
**Type**: Client Component (`'use client'`)

```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  /** Animation variant. Default: 'fadeSlideUp' */
  variant?: 'fadeSlideUp' | 'fadeIn' | 'slideLeft' | 'slideRight';
  /** Delay in seconds. Default: 0 */
  delay?: number;
  className?: string;
}
```

**Implementation**:
- Uses `framer-motion` `motion.div` with `whileInView`
- `viewport={{ once: true, margin: '-50px' }}` — trigger once, 50px before visible
- Variants:
  - `fadeSlideUp`: opacity 0→1, y 20→0, duration 0.5s, ease-out
  - `fadeIn`: opacity 0→1, duration 0.4s
  - `slideLeft/Right`: opacity 0→1, x ±30→0, duration 0.5s
- `prefers-reduced-motion`: Framer Motion respects this automatically

---

#### `<SchemaOrg />` — Structured Data Injector

**Location**: `components/schema-org.tsx`
**Type**: Server Component

```typescript
interface SchemaOrgProps {
  type: 'dentist' | 'localBusiness' | 'medicalService' | 'person' | 'article' | 'breadcrumb';
  data: Record<string, unknown>;
}
```

**Implementation**:
- Renders `<script type="application/ld+json">` with JSON-LD
- Data assembled from typed helper functions per schema type
- Placed in page components (not layout) for page-specific schemas
- Global `Dentist` + `MedicalBusiness` schema in `layout.tsx`

**Schema Helpers** (`lib/schema.ts`):
```typescript
export function buildDentistSchema(contact: ContactInfo): WithContext<Dentist>;
export function buildLocalBusinessSchema(contact: ContactInfo, services: Service[]): WithContext<LocalBusiness>;
export function buildMedicalServiceSchema(service: Service): WithContext<MedicalProcedure>;
export function buildPersonSchema(member: TeamMember): WithContext<Person>;
export function buildArticleSchema(post: BlogPost): WithContext<Article>;
export function buildBreadcrumbSchema(items: {name: string; url: string}[]): WithContext<BreadcrumbList>;
```

---

#### `<BlogCard />` — Blog Post Preview Card

**Location**: `components/blog-card.tsx`
**Type**: Server Component

```typescript
interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags?: string[];
}
```

---

### 2.2 Modified Existing Components

#### `navigation.tsx` — Changes

- Add blog link to nav items: `{ label: 'Blog', href: '/blog' }`
- No structural changes needed

#### `footer.tsx` — Changes

- Add `<ZnanyLekarzWidget type="certificate" />` in footer (replaces any existing trust badge)
- Add blog link to footer navigation
- No major structural changes

#### `app/layout.tsx` — Changes

- Add `<CookieConsent />` component
- Add `<FloatingContact />` component
- Add global `Dentist` + `MedicalBusiness` Schema.org JSON-LD
- Add PWA manifest link: `<link rel="manifest" href="/manifest.json" />`
- Add theme-color meta tag

---

### 2.3 New shadcn/ui Components Needed

| Component | Usage |
|-----------|-------|
| `input.tsx` | Contact form text inputs |
| `textarea.tsx` | Contact form message field |
| `select.tsx` | Contact form subject dropdown |
| `label.tsx` | Form field labels |

Install via: `npx shadcn@latest add input textarea select label`

---

## 3. Page-Level Changes

### 3.1 Homepage (`app/page.tsx`)

**Current sections** (in order):
1. Hero with background image
2. Featured services grid
3. Equipment highlights
4. "Why choose us" grid
5. Trust signal bar (ZnanyLekarz widget)
6. Contact & location

**Changes**:
- Wrap each section in `<AnimatedSection />` with staggered delays
- Replace `dangerouslySetInnerHTML` ZnanyLekarz embed with `<ZnanyLekarzWidget type="certificate" />`
- Apply updated color tokens (warm teal, off-white backgrounds)
- Increase section spacing to `py-24` / `py-28`
- Add subtle hover animations to service cards: shadow + scale(1.02)
- Hero: add subtle parallax or gradient shift animation

**No structural changes** — same sections, same layout, better polish.

### 3.2 Services (`app/uslugi/page.tsx`)

- Wrap service cards in `<AnimatedSection variant="fadeSlideUp" />` with stagger
- Add hover effect to cards (shadow + scale)
- Apply warmer color tokens
- No data model changes

### 3.3 Pricing (`app/cennik/page.tsx`)

- Apply animation wrappers
- Apply warmer color tokens
- Content: placeholder data for client to fill

### 3.4 Team (`app/zespol/page.tsx`)

- Apply animation wrappers
- Apply warmer color tokens
- Add `<SchemaOrg type="person" />` per team member
- Content: placeholder for real photos/bios

### 3.5 Contact (`app/kontakt/page.tsx`)

**Major changes**:
- Add `<ContactForm />` component alongside existing contact info
- Wrap Google Maps in consent gate (`useCookieConsent` hook)
- Show placeholder/static map when consent not given
- Add driving directions section (text-based)
- Apply animation wrappers

### 3.6 Booking (`app/umow-wizyte/page.tsx`)

**Major changes**:
- Replace any existing widget embed with:
  - `<ZnanyLekarzWidget type="facility-calendar" />` — main booking section
  - `<ZnanyLekarzWidget type="big_with_calendar" />` — RTG booking section
- Two distinct sections with headings
- Apply warmer color tokens and animations

### 3.7 Blog — NEW (`app/blog/page.tsx`)

```typescript
// app/blog/page.tsx (Server Component)
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog-card';

export const metadata = { title: 'Blog | Alldent', ... };

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main>
      <h1>Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => <BlogCard key={post.slug} {...post} />)}
      </div>
    </main>
  );
}
```

### 3.8 Blog Post — NEW (`app/blog/[slug]/page.tsx`)

```typescript
// app/blog/[slug]/page.tsx (Server Component)
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SchemaOrg } from '@/components/schema-org';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  return (
    <article className="prose mx-auto max-w-4xl">
      <SchemaOrg type="article" data={buildArticleSchema(post)} />
      <h1>{post.title}</h1>
      <MDXRemote source={post.content} />
    </article>
  );
}
```

---

## 4. New Features — Detailed Design

### 4.1 Contact Form — Full Flow

```
┌─────────────┐     POST /api/contact     ┌──────────────┐     Resend API     ┌─────────────┐
│  Browser     │ ──────────────────────── → │  API Route   │ ────────────────── → │  alldent@    │
│  (React)     │ ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ── │  (Vercel)    │                     │  onet.eu     │
│              │    { success: true }       │              │                     │              │
└─────────────┘                            └──────────────┘                     └─────────────┘
```

**API Route** (`app/api/contact/route.ts`):

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 1. Honeypot check
  if (body.honeypot) {
    return NextResponse.json({ success: true }); // silent discard
  }

  // 2. Server-side validation (same rules as client)
  const errors = validateContactForm(body);
  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // 3. Send email via Resend
  try {
    await resend.emails.send({
      from: 'Alldent Formularz <kontakt@alldent-stomatologia.pl>',
      to: 'alldent@onet.eu',
      subject: `[Formularz] ${body.subject} — ${body.name}`,
      text: formatEmailText(body),
      replyTo: body.email,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, errors: ['EMAIL_SEND_FAILED'] },
      { status: 500 }
    );
  }
}
```

**Rate limiting**: Not implemented in v1. Resend's free tier (3000/month) is sufficient. Honeypot handles spam. If abuse occurs, add IP-based rate limiting via Vercel Edge middleware.

**Resend domain**: Requires DNS verification of `alldent-stomatologia.pl` in Resend dashboard. Until then, use Resend's default `onboarding@resend.dev` as `from` address.

---

### 4.2 Cookie Consent — State Machine

```
                    ┌──────────┐
                    │   null   │ (no localStorage entry)
                    └────┬─────┘
                         │ mount: show banner
                         ▼
                    ┌──────────┐
              ┌─────│  shown   │─────┐
              │     └──────────┘     │
    click     │                      │  click
   "all"      ▼                      ▼  "essential"
         ┌──────────┐          ┌──────────┐
         │   all    │          │ essential │
         └──────────┘          └──────────┘
              │                      │
              └──────┬───────────────┘
                     │ localStorage.setItem('cookie-consent', value)
                     │ hide banner
                     ▼
                ┌──────────┐
                │  stored  │ (subsequent visits: read from localStorage)
                └──────────┘
```

**Gated resources by consent level**:

| Resource | `essential` | `all` |
|----------|:-----------:|:-----:|
| ZnanyLekarz widgets | Loaded | Loaded |
| Core CSS/JS/fonts | Loaded | Loaded |
| Google Maps embed | Blocked | Loaded |
| Vercel Analytics | Blocked | Loaded |
| Future analytics | Blocked | Loaded |

---

### 4.3 Blog — MDX Pipeline

**Content directory**: `/content/blog/`

```
content/
└── blog/
    ├── higiena-jamy-ustnej.mdx
    ├── kiedy-do-dentysty.mdx
    └── ...
```

**Blog utility** (`lib/blog.ts`):

```typescript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags?: string[];
  content: string; // raw MDX content (without frontmatter)
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files.filter(f => f.endsWith('.mdx')).map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      return { slug: file.replace('.mdx', ''), ...data, content } as BlogPost;
    })
  );
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), 'utf-8');
  const { data, content } = matter(raw);
  return { slug, ...data, content } as BlogPost;
}
```

**Dependencies**: `next-mdx-remote`, `gray-matter`

---

### 4.4 PWA Configuration

**Approach**: Two-layer setup:
1. **Next.js built-in** `app/manifest.ts` for manifest + installability (zero deps)
2. **Serwist** (`@serwist/next`) for service worker + offline caching (Turbopack-compatible)

> **Why not `next-pwa` or `@ducanh2912/next-pwa`?** Both require webpack, conflicting with this project's Turbopack setup. `@ducanh2912/next-pwa` is unmaintained (last publish 2024) and its author recommends migrating to Serwist. Serwist is the actively maintained successor, works with Turbopack, and is recommended in the official Next.js PWA docs.

**`app/manifest.ts`** (built-in Next.js — no dependency):
```typescript
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alldent Centrum Stomatologiczne',
    short_name: 'Alldent',
    description: 'Gabinet stomatologiczny w Częstochowie',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFBF5',
    theme_color: '#2A9D8F',
    icons: [
      { src: '/images/logo/alldent-logo-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/logo/alldent-logo-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
```

**Serwist setup** (`@serwist/next`):

`next.config.ts`:
```typescript
import withSerwist from '@serwist/next';

const nextConfig = withSerwist({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
})({
  // existing next config
});
```

`app/sw.ts` (service worker source):
```typescript
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  // ZnanyLekarz and Google Maps excluded by default
  // (external origins not in precache manifest)
});

serwist.addEventListeners();
```

**Excluded from cache** (external origins not precached by default):
- `https://www.znanylekarz.pl/*`
- `//platform.docplanner.com/*`
- `https://maps.googleapis.com/*`

---

### 4.5 Micro-Animations — Specification

**Library**: `framer-motion` (tree-shakeable, ~15KB gzipped for used features)

| Element | Animation | Trigger | Duration | Easing |
|---------|-----------|---------|----------|--------|
| Sections | fade-in + slide-up 20px | Scroll into view (once) | 0.5s | ease-out |
| Service cards | shadow increase + scale(1.02) | Hover | 0.2s | ease-in-out |
| Page transitions | Cross-fade | Route change | 0.2-0.3s | ease-in-out |
| Hero | Subtle parallax or gradient shift | Scroll position | continuous | linear |
| Floating button | Scale + fade | Click expand/collapse | 0.2s | spring |
| Cookie banner | Slide-up from bottom | Mount | 0.3s | ease-out |

**`prefers-reduced-motion`**: Framer Motion automatically disables animations when the user has this OS preference set. No additional code needed.

**Page transitions** (`app/template.tsx`):
```typescript
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 5. Color System & Theming

### Current → New Color Tokens

Update in `app/globals.css` within the `:root` / `@theme` block:

| Token | Current (oklch) | New (oklch) | Visual Change |
|-------|-----------------|-------------|---------------|
| `--primary` | `0.55 0.15 210` | `0.50 0.12 187` | Warmer teal (hue 210→187) |
| `--primary-foreground` | `0.98 0 0` | `0.98 0.005 90` | Slightly warm white |
| `--cta` | `0.65 0.18 50` | `0.62 0.16 42` | Warmer coral (hue 50→42) |
| `--background` | `1 0 0` (white) | `0.985 0.005 85` | Off-white / cream |
| `--foreground` | (current black) | `0.25 0.01 60` | Dark warm gray |
| `--accent` | (current) | `0.85 0.06 160` | Mint / sage green (NEW) |
| `--accent-foreground` | (current) | `0.30 0.04 160` | Dark sage |

**Exact values to be verified** during implementation with WCAG contrast checker. The hue shifts are directional — final values must pass:
- Body text on background: ≥ 4.5:1
- Large headings on background: ≥ 3:1
- CTA text on CTA background: ≥ 4.5:1
- Primary text on primary background: ≥ 4.5:1

### Spacing Updates

| Current | New | Where |
|---------|-----|-------|
| `py-16` / `py-20` | `py-24` / `py-28` | Between major sections |
| `rounded-lg` | `rounded-xl` (1rem) | Card components |
| `border` on cards | `shadow-sm` warm shadow | Card styling |
| `max-w-6xl` for text | `max-w-4xl` for prose text | Blog, legal pages |

### Typography Updates

| Property | Current | New |
|----------|---------|-----|
| Body line-height | 1.5 | 1.7 |
| Font weights | mixed | 400 body / 500 subtitles / 600-700 headings |

---

## 6. SEO & Structured Data

### Schema.org Implementation Map

| Schema Type | Location | Data Source |
|-------------|----------|-------------|
| `Dentist` + `MedicalBusiness` | `app/layout.tsx` (global) | `lib/data/contact.ts` |
| `LocalBusiness` | `app/page.tsx` (homepage) | `lib/data/contact.ts` + `services.ts` |
| `MedicalProcedure` | `app/uslugi/page.tsx`, `app/cennik/page.tsx` | Per service from `services.ts` |
| `Person` (Dentist) | `app/zespol/page.tsx` | Per member from `team.ts` |
| `Article` | `app/blog/[slug]/page.tsx` | Blog post frontmatter |
| `BreadcrumbList` | All pages | Navigation path |

### Global Dentist Schema (layout.tsx)

```json
{
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness"],
  "name": "Alldent Centrum Stomatologiczne",
  "description": "Gabinet stomatologiczny w Częstochowie...",
  "url": "https://alldent-stomatologia.pl",
  "telephone": "+48663333787",
  "email": "alldent@onet.eu",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Sabinowska 8",
    "addressLocality": "Częstochowa",
    "postalCode": "42-200",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.8118,
    "longitude": 19.1203
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "19:00" }
  ],
  "logo": "https://alldent-stomatologia.pl/images/logo/alldent-logo.png",
  "image": "https://alldent-stomatologia.pl/images/office/zabki4.png",
  "priceRange": "$$"
}
```

### New Files for SEO

| File | Purpose |
|------|---------|
| `app/sitemap.ts` | Auto-generated sitemap.xml including blog posts |
| `app/robots.ts` | robots.txt with sitemap reference |
| `public/llms.txt` | LLM-readable practice description |

**`app/sitemap.ts`**:
```typescript
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const blogUrls = posts.map(post => ({
    url: `https://alldent-stomatologia.pl/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: 'https://alldent-stomatologia.pl', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://alldent-stomatologia.pl/uslugi', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://alldent-stomatologia.pl/cennik', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://alldent-stomatologia.pl/zespol', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://alldent-stomatologia.pl/kontakt', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://alldent-stomatologia.pl/umow-wizyte', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://alldent-stomatologia.pl/blog', changeFrequency: 'weekly', priority: 0.6 },
    ...blogUrls,
  ];
}
```

---

## 7. API Design

### POST `/api/contact`

**Request**:
```typescript
// Content-Type: application/json
{
  "name": string,      // required, 2-50 chars
  "email": string,     // required, valid email
  "phone": string,     // optional, 9 digits
  "subject": string,   // required, one of SUBJECT_OPTIONS
  "message": string,   // required, 10-1000 chars
  "honeypot": string   // hidden, must be empty
}
```

**Response — Success** (200):
```json
{ "success": true }
```

**Response — Validation Error** (400):
```json
{
  "success": false,
  "errors": [
    { "field": "name", "message": "Imię musi mieć co najmniej 2 znaki" },
    { "field": "email", "message": "Nieprawidłowy format email" }
  ]
}
```

**Response — Server Error** (500):
```json
{
  "success": false,
  "errors": ["EMAIL_SEND_FAILED"]
}
```

**Environment Variables**:
- `RESEND_API_KEY` — Resend API key (required in production)

---

## 8. New Dependencies

### Production Dependencies

| Package | Purpose | Size Impact |
|---------|---------|-------------|
| `framer-motion` | Micro-animations, page transitions | ~15KB gzipped (tree-shaken) |
| `next-mdx-remote` | MDX rendering for blog | ~8KB gzipped |
| `gray-matter` | MDX frontmatter parsing | ~3KB gzipped |
| `resend` | Email API for contact form | ~2KB gzipped |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `@serwist/next` | Serwist Next.js integration (SW generation, Turbopack-compatible) |
| `serwist` | Service worker runtime (used in `app/sw.ts`) |

### Unchanged Dependencies
All existing dependencies remain. No removals.

### Total Bundle Impact Estimate
- Framer Motion (largest addition): ~15KB gzipped, tree-shaken
- Blog utilities: only loaded on blog pages (code splitting)
- Resend: only loaded in API route (not in client bundle)
- PWA: build-time only, generates SW file

---

## 9. File Structure Changes

### New Files

```
app/
├── api/
│   └── contact/
│       └── route.ts                  # Contact form API endpoint
├── blog/
│   ├── page.tsx                      # Blog listing page
│   └── [slug]/
│       └── page.tsx                  # Individual blog post page
├── template.tsx                      # Page transition wrapper (Framer Motion)
├── manifest.ts                       # PWA manifest (Next.js built-in)
├── sw.ts                             # Service worker source (Serwist)
├── sitemap.ts                        # Dynamic sitemap generation
└── robots.ts                         # robots.txt generation

components/
├── animated-section.tsx              # Scroll-triggered animation wrapper
├── blog-card.tsx                     # Blog post preview card
├── contact-form.tsx                  # Email contact form
├── cookie-consent.tsx                # GDPR cookie banner
├── floating-contact.tsx              # WhatsApp/Messenger FAB
├── schema-org.tsx                    # JSON-LD structured data
├── znanylekarz-widget.tsx            # ZnanyLekarz widget loader
└── ui/
    ├── input.tsx                     # (shadcn/ui) Form input
    ├── textarea.tsx                  # (shadcn/ui) Form textarea
    ├── select.tsx                    # (shadcn/ui) Form select
    └── label.tsx                     # (shadcn/ui) Form label

content/
└── blog/
    └── .gitkeep                      # Blog content directory (MDX files)

lib/
├── blog.ts                           # Blog MDX utilities
├── schema.ts                         # Schema.org JSON-LD builders
├── hooks/
│   └── use-cookie-consent.ts         # Cookie consent React hook
└── validation/
    └── contact.ts                    # Shared form validation

public/
├── sw.js                             # Generated service worker (by Serwist, gitignored)
└── llms.txt                          # LLM-readable site description
```

### Modified Files

```
app/
├── layout.tsx          # + CookieConsent, FloatingContact, Schema.org, PWA manifest link
├── page.tsx            # + AnimatedSection wrappers, ZnanyLekarzWidget, color updates
├── globals.css         # Updated color tokens, spacing, typography
├── uslugi/page.tsx     # + AnimatedSection, hover effects
├── cennik/page.tsx     # + AnimatedSection, color updates
├── zespol/page.tsx     # + AnimatedSection, SchemaOrg per member
├── kontakt/page.tsx    # + ContactForm, consent-gated Maps, driving directions
└── umow-wizyte/page.tsx # Replace embed with ZnanyLekarzWidget components

components/
├── navigation.tsx      # + Blog nav link
└── footer.tsx          # + ZnanyLekarzWidget certificate, blog link

next.config.ts          # + PWA wrapper config
package.json            # + new dependencies
```

### Files NOT Changed
- `lib/utils.ts` — no changes
- `lib/types.ts` — no changes (new types in new files)
- `lib/data/services.ts` — no changes
- `lib/data/team.ts` — no changes
- `components/ui/button.tsx` — no changes
- `components/ui/card.tsx` — no changes
- `components/ui/avatar.tsx` — no changes
- `components/ui/badge.tsx` — no changes
- `components/ui/separator.tsx` — no changes
- `components/ui/sheet.tsx` — no changes
- `components/ui/navigation-menu.tsx` — no changes
- `components/ui/table.tsx` — no changes
- `components/price-info.tsx` — no changes (maybe color update)
- Legal pages (3) — no changes
- `tsconfig.json` — no changes
- `eslint.config.mjs` — no changes

---

## 10. Implementation Phases

### Phase 1: Foundation (Color, Typography, Animations)

**Goal**: Visual refresh without new features.

1. Update color tokens in `globals.css`
2. Update spacing/typography globals
3. Install `framer-motion`
4. Create `<AnimatedSection />` component
5. Create `app/template.tsx` for page transitions
6. Wrap existing page sections in `<AnimatedSection />`
7. Add hover effects to service/team cards
8. Verify WCAG contrast ratios

**Test**: `npm run build` passes. Visual inspection of all pages. Lighthouse accessibility audit.

### Phase 2: ZnanyLekarz Widget Refactor

**Goal**: Replace `dangerouslySetInnerHTML` with proper component.

1. Create `<ZnanyLekarzWidget />` component with singleton loader
2. Replace homepage trust section widget
3. Update `/umow-wizyte` with two widget instances
4. Add certificate widget to footer
5. Verify widgets load and function correctly

**Test**: All three widget types render. Lazy loading works. Fallback shows after timeout.

### Phase 3: Contact Form

**Goal**: Working email contact form.

1. Install `resend`
2. Add shadcn/ui form components: input, textarea, select, label
3. Create shared validation (`lib/validation/contact.ts`)
4. Create API route (`app/api/contact/route.ts`)
5. Create `<ContactForm />` component
6. Integrate into `/kontakt` page
7. Test with Resend (requires API key in env)

**Test**: Form validates client-side. API route validates server-side. Emails arrive at `alldent@onet.eu`.

### Phase 4: Cookie Consent + Floating Contact

**Goal**: GDPR compliance and quick contact options.

1. Create `useCookieConsent` hook
2. Create `<CookieConsent />` banner component
3. Gate Google Maps behind consent
4. Create `<FloatingContact />` button
5. Add both to `layout.tsx`

**Test**: Banner shows on first visit. Choice persists across refreshes. Maps load only with full consent. WhatsApp/Messenger links work.

### Phase 5: Blog (MDX)

**Goal**: Working blog with SSG.

1. Install `next-mdx-remote`, `gray-matter`
2. Create `content/blog/` directory
3. Create `lib/blog.ts` utility
4. Create `<BlogCard />` component
5. Create `/blog` listing page
6. Create `/blog/[slug]` post page
7. Add blog link to nav and footer
8. Add one sample blog post for testing

**Test**: Blog listing renders. Individual posts render MDX. `generateStaticParams` works. Links from nav/footer work.

### Phase 6: SEO & Schema.org

**Goal**: Full structured data and SEO artifacts.

1. Create `lib/schema.ts` with builder functions
2. Create `<SchemaOrg />` component
3. Add global Dentist schema to `layout.tsx`
4. Add page-specific schemas to each page
5. Create `app/sitemap.ts`
6. Create `app/robots.ts`
7. Create `public/llms.txt`
8. Verify with Google Rich Results Test

**Test**: JSON-LD validates. Sitemap includes all pages + blog posts. robots.txt accessible.

### Phase 7: PWA

**Goal**: Installable PWA with offline caching.

1. Create `app/manifest.ts` (Next.js built-in, zero deps)
2. Install `@serwist/next` + `serwist`
3. Create `app/sw.ts` service worker source
4. Update `next.config.ts` with Serwist wrapper
5. Generate PWA icons (192px, 512px)
6. Add `public/sw.js` to `.gitignore` (generated file)

**Test**: Lighthouse PWA audit passes. App installable on mobile. Pages load offline after first visit.

### Phase 8: Monitoring Setup

**Goal**: Production monitoring ready.

1. Enable Vercel Analytics (dashboard toggle)
2. Install Sentry (`@sentry/nextjs`)
3. Configure Sentry DSN in env
4. Gate analytics behind cookie consent

**Test**: Errors reported to Sentry. Analytics visible in Vercel dashboard.

---

## Appendix A: Environment Variables

| Variable | Required | Where | Purpose |
|----------|----------|-------|---------|
| `RESEND_API_KEY` | Phase 3+ | Vercel env | Contact form email sending |
| `SENTRY_DSN` | Phase 8 | Vercel env | Error monitoring |
| `NEXT_PUBLIC_SITE_URL` | Phase 6+ | Vercel env | Canonical URLs, Schema.org |

---

## Appendix B: Accessibility Checklist

- [ ] Color contrast ≥ 4.5:1 for body text
- [ ] Color contrast ≥ 3:1 for large text and UI elements
- [ ] Touch targets ≥ 44px on mobile
- [ ] Visible focus indicators on all interactive elements
- [ ] Skip-to-content link (already exists)
- [ ] Alt text on all images
- [ ] Semantic HTML (landmarks, headings hierarchy)
- [ ] Form labels associated with inputs
- [ ] Error messages linked to form fields (`aria-describedby`)
- [ ] Cookie banner keyboard-navigable
- [ ] Floating button accessible name
- [ ] `prefers-reduced-motion` respected (Framer Motion auto)

---

## Appendix C: Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | SSG, optimized images, font preload |
| FID | < 100ms | Minimal JS, lazy widget loading |
| CLS | < 0.1 | Reserved space for widgets, no layout shifts |
| Total JS (initial) | < 100KB gzipped | Tree-shaking, code splitting, lazy loading |
| Lighthouse (mobile) | ≥ 95 | All Core Web Vitals optimized |

**Code splitting strategy**:
- Framer Motion: loaded on all pages (template.tsx), ~15KB
- Blog utilities: loaded only on `/blog/*` routes
- Contact form: loaded only on `/kontakt`
- Resend: server-only, not in client bundle
- ZnanyLekarz widget: lazy-loaded via IntersectionObserver
