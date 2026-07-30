# System Architecture

Last updated: 2026-07-30

## Overview

The application is a single-page React landing page built with Vite. The production build prerenders its marketing content into static HTML, then React hydrates the page for interactive lead capture. It does not require a backend application server.

## High-Level Data Flow

1. Shared content loads from `src/data/site-content.ts`.
2. `src/app.tsx` renders the page sections and passes content into each section component.
3. The hero, pricing, coverage, FAQ, footer, and floating actions share the same contact details and plan data.
4. The lead dialog receives the trigger context and can submit to a configured endpoint or fall back to `mailto:`.
5. SEO metadata is applied in the browser from `src/lib/seo.ts`.
6. `scripts/prerender.mjs` serializes the complete landing page into `dist/index.html`; when `VITE_SITE_URL` is set, it also emits absolute static canonical, Open Graph, and JSON-LD URLs.

## Core Modules

| Module | Responsibility |
|---|---|
| `src/app.tsx` | App composition and SEO bootstrap |
| `src/data/site-content.ts` | Copy, plan data, area list, contact details, and SEO copy |
| `src/lib/lead-submit.ts` | Validation, phone normalization, endpoint submission, mailto fallback |
| `src/lib/seo.ts` | Title, meta tags, canonical, Open Graph, and JSON-LD |
| `src/entry-server.tsx` | Server-render entry used only during the production build |
| `scripts/prerender.mjs` | Static HTML generation and production-origin metadata |
| `src/components/landing/lead-form-dialog.tsx` | Accessible lead sheet/dialog with success, fallback, and error states |
| `src/components/landing/floating-actions.tsx` | Always-visible phone and Zalo conversion actions |
| `src/components/landing/coverage-section.tsx` | Area selector that pre-fills the lead flow |
| `src/components/landing/plan-section.tsx` | Plan cards and plan-prefilled lead triggers |

## Static Assets

- The official FPT Telecom logo lives in `public/brand/fpt-telecom-logo.svg`.
- The hero image lives in `public/images/hero-fiber-technician.webp`.
- Crawl files are generated only when a real public origin is provided.

## Runtime Behavior

- There is no required API server for the page to render.
- If `VITE_LEAD_ENDPOINT` is unset, the lead form opens a prefilled email draft instead of failing silently.
- If `VITE_SITE_URL` is unset, the browser uses the current runtime origin for canonical and Open Graph URLs.
- The main heading, plan details, service areas, FAQ, and footer are present in the first HTML response even when JavaScript is disabled.
- The floating Zalo action opens a new tab to the configured Zalo link.

## Verification Strategy

- Unit tests verify SEO URL resolution and lead-submit behavior.
- Browser tests verify responsive rendering, dialog behavior, focus return, and overflow.
- Production builds verify that the app compiles cleanly without runtime-only code paths.

## Deployment Notes

- Set `VITE_SITE_URL` when building for production so canonical and social metadata are explicit.
- Set `VITE_LEAD_ENDPOINT` only if a real receiver exists.
- Run `npm run build:production -- https://your-domain.example` after the public domain is known. It generates crawl files before building so the final `dist/` contains the same production origin everywhere.
