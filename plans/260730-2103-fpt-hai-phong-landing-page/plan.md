---
title: FPT Hai Phong conversion landing page
description: >-
  Build a mobile-first static sales page for local FPT fiber enquiries from
  Google search.
status: completed
priority: P2
branch: ''
tags:
  - react
  - vite
  - landing-page
  - seo
  - accessibility
blockedBy: []
blocks: []
created: '2026-07-30T13:03:16.955Z'
createdBy: 'ck:plan'
source: skill
---

# FPT Hai Phong conversion landing page

## Overview

Create a static Vite/React landing page from the approved “Local Fiber Dispatch” direction. The page prioritizes a direct hotline call, truthful current package data, accessible lead capture, local Hai Phong search intent, and fast desktop/mobile rendering.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Foundation](./phase-01-foundation.md) | Completed |
| 2 | [Design and content](./phase-02-design-and-content.md) | Completed |
| 3 | [Conversion and SEO](./phase-03-conversion-and-seo.md) | Completed |
| 4 | [QA and handoff](./phase-04-qa-and-handoff.md) | Completed |

## Dependencies

- Source brief: `../../../sua l2.docx`
- Design record: `./brainstorm-report.md`
- External release inputs: production hostname and, optionally, a real `VITE_LEAD_ENDPOINT`.

## Acceptance Criteria

- Static production build renders crawlable Vietnamese sales content with no runtime backend dependency.
- Header, hero, package comparisons, coverage selector, lead dialog/sheet, floating actions, FAQ, and footer match the approved brief.
- Current public FPT prices/specs are centralized and carry a visible area/time disclaimer.
- Hotline, email fallback, Zalo link, keyboard flow, form validation, focus return, and reduced motion work.
- No horizontal overflow at 320, 390, 768, and 1440 px; typecheck, lint, tests, and production build pass.
- SEO metadata, robots, on-demand sitemap generation, semantic headings, and truthful JSON-LD are present; deployment-specific canonical handling is documented.

## Scope Boundaries

- No CRM, database, analytics account, domain deployment, or guaranteed 24-hour installation claim.
- No fake testimonials, ratings, scarcity, customer totals, or unofficial corporate claims.
- The generated hero image contains no logo, product-label text, or watermark; official branding remains a separate asset.
