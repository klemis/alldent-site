# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern dental practice website for a dental practice in Częstochowa, Poland. Built with Next.js 15.5.3, TypeScript, and shadcn/ui components, it's designed as a fast-loading static site that allows patients to browse services, view team information, and book appointments through an integrated ZnanyLekarz widget.

### Key Features
- Browse dental services and team information
- View contact details and office location
- Direct appointment booking via embedded ZnanyLekarz widget
- Mobile-first responsive design optimized for dental patient personas
- Static site generation for optimal performance and SEO

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Production build**: `npm run build` (uses Turbopack)
- **Production server**: `npm start`
- **Linting**: `npm run lint` (ESLint with Next.js TypeScript config)

## Architecture and Structure

### Core Technologies
- **Next.js 15** with App Router structure
- **TypeScript** with strict mode enabled
- **shadcn/ui** components with "new-york" style
- **Tailwind CSS v4** with CSS variables
- **Radix UI** primitives for accessible components
- **Lucide React** for icons

### File Organization
```
app/                    # Next.js App Router pages
├── layout.tsx         # Root layout with Geist fonts
├── page.tsx           # Homepage (currently default Next.js template)
├── globals.css        # Global Tailwind styles
└── favicon.ico

components/ui/          # shadcn/ui components
├── button.tsx
├── card.tsx
├── badge.tsx
├── avatar.tsx
├── separator.tsx
├── sheet.tsx
└── navigation-menu.tsx

lib/                   # Utilities and data
├── utils.ts          # cn() utility for class merging
├── types.ts          # TypeScript type definitions
└── data/
    └── services.ts   # Dental services data with categories
```

### TypeScript Configuration
- Path aliases configured: `@/*` maps to root directory
- Strict mode enabled with ES2017 target
- Includes shadcn/ui component path aliases in components.json

### Data Models
The project includes comprehensive TypeScript interfaces for:
- `Service`: Dental services with pricing, duration, benefits
- `TeamMember`: Staff profiles with qualifications and specialties
- `ContactInfo`: Business hours, location, contact details
- `GalleryImage`: Image gallery with categories
- `NavItem`: Navigation structure
- `Testimonial`: Customer reviews
- `FAQItem`: Frequently asked questions
- `SEOMetadata`: SEO optimization data

### Design System
- **shadcn/ui** components with "new-york" style
- **Neutral** base color palette
- **CSS variables** for theming
- **Lucide React** icons throughout
- **Geist** font family (sans and mono variants)

### Content Structure
Services are organized into categories:
- Preventive Care (general dentistry, preventive care)
- Cosmetic Treatments (cosmetic dentistry, teeth whitening)
- Restorative Care (dental implants, root canal therapy)
- Specialized Care (pediatric, emergency, oral surgery)

## Target Audience & User Personas

### Primary User Personas
- **Anxious Anna** (28-45): Busy professional seeking trustworthy routine dental care, mobile-first user with time constraints
- **Emergency Erik** (25-55): Needs immediate help for dental pain, stressed user requiring quick contact access
- **Family-Focused Filip** (30-50): Parent looking for a family dentist, values gentle approach with children, needs family scheduling options

### Design Requirements
- Mobile-first design with touch-friendly interactions (44px+ touch targets)
- Calming color palette: blues/greens (primary), warm teal/orange (CTAs), clean grays/whites
- Patient-friendly language avoiding medical jargon
- Prominent booking CTAs and emergency contact access
- Trust signals: credentials, testimonials, modern office imagery

## Site Structure & Content Strategy

### Planned Site Structure
```
/
├── Home (hero, services overview, contact)
├── Services (detailed service descriptions)
├── Team (dentist and staff profiles)
├── Gallery (before/after photos, office images)
├── Contact (location, hours, embedded map)
└── Book Appointment (ZnanyLekarz widget integration)
```

### ZnanyLekarz Integration
- Widget embedded using `dangerouslySetInnerHTML`
- No API required - widget is self-contained
- Handles all booking functionality internally
- Multiple entry points throughout the site

### Performance Requirements
- Lighthouse score ≥ 95 (mobile & desktop)
- < 2 seconds initial page load
- Static site generation for optimal SEO
- Next.js Image component for automatic optimization

## Development Guidelines

### Component Development
- Use shadcn/ui components from `@/components/ui/`
- Import icons from `lucide-react`
- Follow TypeScript strict mode patterns
- Use the `cn()` utility for conditional classes
- Implement proper accessibility with Radix UI primitives

### Code Style (from .rules file)
- Use TypeScript for all new files
- Follow React functional component patterns with hooks
- Prioritize shadcn/ui components over custom UI elements
- Use Tailwind CSS classes for styling
- Follow semantic HTML structure
- Implement proper TypeScript typing for all props and functions

### Asset Management
- Images stored in `/public/images/` with subdirectories: `/team`, `/services`, `/gallery`, `/office`
- All static assets version-controlled with code
- Use Next.js Image component for optimization

### File Creation Guidelines
- Components go in `/components` directory
- UI components from shadcn/ui go in `/components/ui`
- Pages/routes follow Next.js app router structure in `/app`
- Utility functions in `/lib` directory
- Types and interfaces in dedicated `.ts` files

### Content Guidelines
- Patient-friendly language avoiding medical jargon
- Focus on benefits over features
- Scannable content with short sentences and bullet points
- Address patient fears proactively
- Include trust signals and professional credentials

### ESLint Configuration
- Extends Next.js core web vitals and TypeScript configs
- Uses FlatCompat for configuration compatibility
- Ignores build directories and generated files

## Git Workflow & Commit Standards

### Conventional Commits
This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification for consistent commit messages:

**Format**: `<type>(<scope>): <description>`

**Types**:
- `feat`: New features or enhancements
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files
- `assets`: Adding or updating static assets (images, fonts, etc.)

**Examples**:
```bash
feat: add responsive navigation component
fix: resolve mobile menu closing issue
build: update dependencies and add shadcn/ui components
assets: add dental practice images and media
docs: update API documentation
```

### Commit Organization Strategy
When dealing with multiple uncommitted changes, organize them into logical commits:

1. **Dependencies first**: Package.json, lock files, configuration
2. **Core functionality**: Data models, utilities, types
3. **Components**: New UI components and shared elements
4. **Layout changes**: Root layout, metadata, global styles
5. **Page implementations**: Individual page components
6. **Page structure**: New routes and page organization
7. **Assets last**: Images, media files, static resources
