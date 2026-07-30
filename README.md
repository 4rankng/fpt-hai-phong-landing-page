# FPT Hai Phong Landing Page

Static Vite + React landing page for a local FPT fiber sales contact flow in Hai Phong.

## Stack

- Vite + React 19 + TypeScript
- Build-time HTML prerendering for crawlable content before JavaScript runs
- Tailwind CSS v4
- React Aria Components for the lead dialog behavior
- `@untitledui/icons` for verified iconography
- Vitest + Testing Library
- Playwright config for browser QA

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## Content and config

- Centralized commercial content lives in `src/data/site-content.ts`.
- SEO helpers live in `src/lib/seo.ts`.
- Lead submission logic lives in `src/lib/lead-submit.ts`.
- `VITE_SITE_URL` is optional while developing. In the browser, canonical and Open Graph URLs safely fall back to the actual deployed origin.
- For production, set `VITE_SITE_URL` so the prerendered HTML also contains absolute canonical, Open Graph image, and JSON-LD URLs for crawlers that do not run JavaScript.
- `VITE_LEAD_ENDPOINT` is optional. If omitted, the form opens a prefilled `mailto:` draft to `trangntm35@fpt.com`.
- The fallback email recipient is sourced from `src/data/site-content.ts`, so it stays aligned with the visible contact details.

## Static assets

The project includes:

- `public/brand/fpt-telecom-logo.svg`
- `public/images/hero-fiber-technician.webp`

The logo is the official FPT Telecom SVG. The hero is an original AI-generated, unbranded sales visual created for this landing page.

## Deployment notes

- Once the final hostname is known, generate crawl files first and build with the same verified origin in one command:

```bash
npm run build:production -- https://ten-mien-thuc-te.vn
```

  This writes the domain-specific `robots.txt`/`sitemap.xml` before the build, sets `VITE_SITE_URL`, and then produces `dist/`.
- `npm run build` prerenders the full landing content into `dist/index.html`; the React app hydrates that markup in the browser.
- Until a hostname is supplied, `robots.txt` remains valid without advertising a fake sitemap URL; `sitemap.xml` is intentionally not shipped.
- Structured data intentionally describes a local sales contact page, not the official corporate FPT Telecom website.

## Deploy on Netlify

The included `netlify.toml` publishes `dist/` and uses Netlify's automatic `URL` build variable to generate matching canonical, Open Graph, robots, sitemap, and structured-data URLs.

1. In Netlify, choose **Add new site → Import an existing project**.
2. Select the GitHub repository.
3. Keep the detected settings from `netlify.toml`; no manual build command or publish directory is required.
4. Deploy the site.

`VITE_LEAD_ENDPOINT` remains optional in Netlify. Add it under **Site configuration → Environment variables** only when a real lead receiver with server-side validation, CORS, abuse protection, and privacy controls is available.
