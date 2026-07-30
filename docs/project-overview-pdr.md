# Project Overview PDR

Last updated: 2026-07-30

## Purpose

Build a single-page, mobile-first sales landing page for FPT fiber enquiries in Hải Phòng. The page is designed for Google search discovery and a direct conversion path to phone, Zalo, or a lead form.

## Product Goals

- Make it easy to contact the sales owner directly from the hero, floating actions, and footer.
- Show truthful, current package guidance without claiming guaranteed installation speed.
- Keep the experience readable and usable on desktop and mobile.
- Support optional form submission to a backend endpoint without requiring it for the page to function.

## Non-Goals

- No CRM, account system, analytics pipeline, or database.
- No guarantee of same-day installation for every address.
- No fake testimonials, ratings, or scarcity claims.
- No claim that this is the official corporate FPT Telecom website.

## Functional Requirements

| Area | Requirement |
|---|---|
| Header | Display hotline and brand mark clearly. |
| Hero | Present the conversion message, current caveat text, and a direct call CTA. |
| Pricing | Show the approved current plan set with clear labels and categories. |
| Coverage | Let users select an area to prefill the lead form. |
| Lead capture | Validate name, Vietnamese mobile phone, area, and note fields. |
| Fallback | Use a prefilled email draft when `VITE_LEAD_ENDPOINT` is not set. |
| Contact | Keep phone and Zalo actions visible at all times. |
| SEO | Update title, metadata, canonical URL, and structured data in the browser. |
| Static discovery | Prerender the main copy, packages, coverage, FAQ, and contact content into the production HTML response. |

## Acceptance Criteria

- The page renders as a static Vite build.
- The page is readable and operable at 320, 390, 768, and 1440 px.
- Lead submission works in both endpoint and no-endpoint modes.
- The README documents setup, commands, content ownership, and deployment inputs.
- Crawl metadata is honest and does not ship placeholder production URLs.
- Non-JavaScript crawlers receive the core conversion content in `dist/index.html`.

## Release Inputs

- `VITE_SITE_URL` for deployment-time canonical and Open Graph URLs
- `VITE_LEAD_ENDPOINT` if a backend lead receiver is available

## Risks

- `mailto:` depends on the user having an email client configured.
- SEO metadata falls back to the runtime origin in the browser, so deployment origin should still be set explicitly for final production builds.
