# Code Standards

Last updated: 2026-07-30

## Source Layout

- Keep page-level composition in `src/app.tsx`.
- Keep shared content in `src/data/site-content.ts`.
- Keep feature logic in `src/lib/`.
- Keep landing-page sections in `src/components/landing/`.
- Keep reusable UI primitives in `src/components/ui/`.
- Keep browser tests in `tests/` and unit tests beside the modules they cover.

## Component Conventions

- Prefer small, composable React function components.
- Pass content in from `site-content.ts` instead of duplicating copy inside section components.
- Keep triggers accessible with real buttons and links, not clickable divs.
- Preserve keyboard interaction, focus management, and visible focus styles.

## Content Rules

- Use approved Vietnamese copy for the page.
- Keep phone numbers and email addresses in the shared content object.
- Do not add unsupported claims such as guaranteed same-day installation or fake customer proof.
- Keep pricing, package labels, and disclaimer text in a single source of truth.

## SEO Rules

- Apply metadata in the browser through `src/lib/seo.ts`.
- Use a real deployment URL when available.
- Do not ship fake canonical or sitemap placeholders.
- Generate `robots.txt` and `sitemap.xml` only when a real public origin exists.

## Lead Flow Rules

- Validate the form before submission.
- Normalize Vietnamese mobile numbers before POST or mailto fallback.
- Keep the phone and Zalo actions available even if the endpoint is missing or slow.
- The no-endpoint path must still perform a visible action.

## Testing Rules

- Use Vitest for pure logic and React component behavior.
- Use Playwright for viewport and interaction checks.
- Cover at least 320, 390, 768, and 1440 px for the landing page.
- Fix real behavior regressions instead of weakening assertions.

## File Hygiene

- Use ASCII by default.
- Use `apply_patch` for manual edits.
- Keep docs short and accurate to the current codebase.
