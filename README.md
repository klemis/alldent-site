# Alldent - Modern Dental Practice Website

A modern, fast-loading dental practice website for a dental practice. Built with Next.js 15, TypeScript, and shadcn/ui components, designed to help patients browse services, view team information, and book appointments seamlessly.

## 🦷 Features

- **Service Directory**: Browse comprehensive dental services organized by category
- **Team Profiles**: Meet the dental professionals and staff
- **Appointment Booking**: Integrated ZnanyLekarz widget for direct scheduling
- **Mobile-First Design**: Optimized for dental patient personas and mobile users
- **Performance Focused**: Static site generation for optimal SEO and loading speeds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Development

```bash
# Install dependencies
npm install

# Start development server (with Turbopack)
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Production build (with Turbopack)
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables
- **Components**: shadcn/ui with "new-york" style
- **Icons**: Lucide React
- **Fonts**: Geist (sans & mono)
- **UI Primitives**: Radix UI for accessibility

## 📁 Project Structure

```
app/                    # Next.js App Router pages
├── layout.tsx         # Root layout with fonts
├── page.tsx           # Homepage
└── globals.css        # Global styles

components/ui/          # shadcn/ui components
├── button.tsx
├── card.tsx
├── navigation-menu.tsx
└── ...

lib/                   # Utilities and data
├── utils.ts          # Class merging utility
├── types.ts          # TypeScript definitions
└── data/
    └── services.ts   # Dental services data
```

## 🎨 Design System

- **Components**: shadcn/ui with Radix UI accessibility
- **Typography**: Patient-friendly language avoiding medical jargon
- **Interactions**: 44px+ touch targets for mobile users

## 📝 Git Workflow

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: bug fixes
docs: documentation changes
style: formatting changes
build: build system changes
```

## 🔧 Development Guidelines

- Use shadcn/ui components from `@/components/ui/`
- Import icons from `lucide-react`
- Follow TypeScript strict patterns
- Use `cn()` utility for conditional classes
- Implement proper accessibility with Radix UI

## 🏥 Appointment Booking

Integrated ZnanyLekarz widget handles all booking functionality:
- No API configuration required
- Self-contained booking system
- Multiple entry points throughout site
