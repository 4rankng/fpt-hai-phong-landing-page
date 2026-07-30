# Codebase Summary

Last updated: 2026-07-30

## Overview

This repository is a static Vite + React landing page for FPT fiber enquiries in Hải Phòng. It is optimized for Google search traffic, direct phone contact, Zalo contact, and a fallback lead form that can post to an optional endpoint or open a prefilled email draft.

## Top-Level Structure

- `src/` application code, content, UI components, and tests
- `public/` static assets and crawl files
- `tests/` Playwright browser checks
- `plans/260730-2103-fpt-hai-phong-landing-page/` implementation plan and QA notes
- `README.md` local setup and release notes
- `.env.example` optional runtime configuration

## Runtime Flow

1. `src/main.tsx` boots the React app.
2. `src/app.tsx` loads the shared site content and applies SEO metadata in the browser.
3. `src/components/landing/*` renders the hero, proof, pricing, coverage, FAQ, footer, and floating actions.
4. `src/components/landing/lead-form-dialog.tsx` handles the accessible lead sheet/dialog.
5. `src/lib/lead-submit.ts` validates the form and either posts JSON to `VITE_LEAD_ENDPOINT` or opens a prefilled `mailto:` draft.
6. `src/lib/seo.ts` updates title, meta tags, canonical URL, Open Graph tags, and JSON-LD at runtime.
7. `scripts/prerender.mjs` renders the complete page into `dist/index.html` after the Vite build so search crawlers receive meaningful HTML before JavaScript runs.

## Commands

- `npm run dev` start the local Vite server
- `npm run lint` run ESLint
- `npm run typecheck` run TypeScript checks
- `npm test` run unit tests
- `npm run test:e2e` run Playwright browser checks
- `npm run build` produce the production bundle
- `npm run seo:generate -- https://example.com` generate `public/robots.txt` and `public/sitemap.xml` for a real deployment origin
- `npm run build:production -- https://example.com` generate domain crawl files and the matching production bundle in the correct order

## Assets

- `public/brand/fpt-telecom-logo.svg` official FPT Telecom logo asset
- `public/images/hero-fiber-technician.webp` original AI-generated hero image without text or watermark

## Notes

- `VITE_SITE_URL` is optional during local development because the browser falls back to the current runtime origin.
- Set `VITE_SITE_URL` for production builds so static canonical, Open Graph, and JSON-LD URLs are absolute for non-JavaScript crawlers.
- `VITE_LEAD_ENDPOINT` is optional. When unset, the form uses a mailto fallback to the contact email in site content.
- The sitemap is generated on demand for a real deployment URL and is not shipped as a fake placeholder.
