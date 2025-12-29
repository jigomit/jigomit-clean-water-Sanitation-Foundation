# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + Vite single-page application for the Clean Water & Sanitation Foundation. The site showcases the organization's work in water infrastructure, hygiene education, and sanitation development.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **Framework**: Vue 3 with `<script setup>` SFC syntax
- **Build Tool**: Vite 7.x
- **Routing**: Vue Router 4.x with lazy-loaded routes
- **Styling**: Custom CSS in `src/style.css`

### Project Structure

```
src/
├── App.vue              # Root component with header, nav, mobile menu, and reveal composable
├── main.js              # Application entry point
├── style.css            # Global styles (single file for all styling)
├── router/
│   └── index.js         # Route definitions with lazy-loaded views
├── views/               # Page-level components (8 views)
├── components/          # Reusable UI components (16+ components)
├── composables/
│   └── useReveal.js     # Scroll reveal animation logic using IntersectionObserver
├── data/
│   └── content.js       # Centralized content (all text, stats, images)
└── assets/
    └── gallery/         # SVG gallery images
```

### Router Configuration

- Uses `createWebHistory` mode
- Lazy-loads all views with dynamic imports: `() => import('@/views/ViewName.vue')`
- Auto-scrolls to top on navigation via `scrollBehavior`
- 8 routes: /, /about, /projects, /education, /sanitation, /impact, /gallery, /donate

### Content Management

All site content (text, stats, images) is centralized in `src/data/content.js` and exported as named constants:
- `heroHighlights` - Hero section features (3 items)
- `projectHighlights` - Project cards with stats (4 items)
- `educationFocus` - Education program details (4 items)
- `sanitationTracks` - Sanitation initiatives (5 items)
- `impactStats` - Impact metrics (4 items)
- `galleryImages` - Gallery image imports and metadata (6 images)
- `footerLinks` - Simple footer navigation array
- `footerData` - Comprehensive footer data including organization info, contact details, quick links, social media, and partners

Components import specific content arrays/objects from this file. **When updating site content, edit `src/data/content.js` instead of individual components.**

### Scroll Reveal System

The `useReveal` composable implements scroll-based animations:
- Uses `IntersectionObserver` to detect elements with `[data-reveal]` attribute
- Adds `.is-visible` class when elements enter viewport
- Respects `prefers-reduced-motion` setting
- MutationObserver watches for dynamically added elements
- Applied globally in `App.vue`

To add reveal animations to an element, add `data-reveal` attribute. CSS transitions are handled in `style.css`.

### Path Aliases

The `@` alias resolves to `src/` directory (configured in `vite.config.js`):
```javascript
import HeroSection from '@/components/HeroSection.vue'
import { heroHighlights } from '@/data/content'
```

### Component Pattern

Components follow this structure:
1. `<script setup>` block imports from `@/data/content.js`
2. `<template>` iterates over content arrays with `v-for`
3. Elements requiring animations include `data-reveal` attribute
4. Styling handled via global classes in `src/style.css`

### Views vs Components

- **Views** (`src/views/`): Page-level components mapped to routes, compose multiple section components
- **Components** (`src/components/`): Reusable sections (Hero, About, Projects, etc.) and shared UI (Footer)

## Styling Approach

- All styles in single `src/style.css` file
- Uses semantic class names (`.hero`, `.screen`, `.content-max`, etc.)
- Scroll reveal animations controlled by `.is-visible` class
- Responsive design with media queries
- Accessibility-first with skip links and ARIA labels
- Modern UI patterns: Glass cards, animated water scenes, pulsing CTAs, fullscreen sections

## Key Features

### Mobile Navigation
`App.vue` includes a responsive mobile menu system:
- Hamburger toggle button with animated icon
- Slide-in drawer navigation
- Backdrop overlay with click-to-close
- Transition animations for smooth open/close

### Component Types
The codebase includes multiple component patterns:
- **Section Components**: HeroSection, AboutSection, ProjectsSection, etc. (reusable page sections)
- **Feature Components**: LiveImpactCounter, TestimonialsCarousel, BeforeAfterSlider, AnimatedWaterScene, ImpactCalculator
- **UI Components**: SiteFooter, DonationCallToAction, DonationPricingTiers, GalleryGrid, ImpactNumbers

### View Composition
Views compose components rather than implementing logic directly. For example, `HomeView.vue` combines multiple feature components (AnimatedWaterScene, LiveImpactCounter, TestimonialsCarousel, BeforeAfterSlider) with inline sections.

## Development Notes

- The site uses both legacy section components (e.g., `HeroSection.vue`) and modern inline sections in views (e.g., `HomeView.vue`)
- Gallery images are SVGs imported from `src/assets/gallery/` and referenced in `content.js`
- All interactive components that need scroll animations should call `useReveal()` in their `<script setup>` block and add `data-reveal` to animatable elements
- When adding new routes, update both `src/router/index.js` and the navigation arrays in `App.vue`
