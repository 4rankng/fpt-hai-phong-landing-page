---
phase: 3
title: Conversion and SEO
status: completed
priority: P1
dependencies:
  - 1
  - 2
---

# Phase 3: Conversion and SEO

## Overview

Implement the lead-capture flow, floating conversion controls, static delivery metadata, and truthful structured data.

## Requirements

- Functional: area-prefilled lead dialog/bottom sheet, validation, optional POST endpoint, mailto fallback, phone and Zalo actions.
- Non-functional: focus trap/return, visible errors, 44 px targets, reduced motion, no intrusive auto-open.

## Architecture

A single `LeadFormDialog` receives the trigger context. When `VITE_LEAD_ENDPOINT` is configured it sends JSON with timeout/error handling; otherwise it opens a prefilled email addressed to `trangntm35@fpt.com`. The hotline remains the primary reliable fallback.

## Related Code Files

- Create: `src/components/landing/lead-form-dialog.tsx`, `floating-actions.tsx`
- Create: `src/lib/lead-submit.ts`, `src/lib/seo.ts`
- Create: `public/robots.txt`, `scripts/generate-sitemap.mjs`, `.env.example`
- Modify: `src/app.tsx`, `index.html`, `src/components/landing/coverage-section.tsx`

## Implementation Steps

1. Build React Aria dialog/modal behavior with desktop dialog and mobile bottom-sheet styling.
2. Add labeled name, Vietnamese phone, selected area, and note fields with inline validation.
3. Implement endpoint POST states: idle, submitting, success, failure, retry; retain mailto and telephone fallbacks.
4. Add separate floating lead and Zalo controls with accessible names, safe-area offsets, and restrained pulse.
5. Add title, description, Open Graph, canonical strategy, robots, sitemap, and semantic heading structure.
6. Add truthful `Service`/`Person` JSON-LD; avoid presenting the personal sales page as the official corporate FPT website.
7. Test keyboard close, Escape, focus return, validation, endpoint failure, fallback, and reduced motion.

## Success Criteria

- [x] Every plan/area/lead trigger opens the same prefilled form.
- [x] Endpoint and no-endpoint paths both perform real user-visible actions.
- [x] Keyboard-only completion and focus restoration pass.
- [x] Metadata and structured data contain no unsupported business claim.

## Risk Assessment

`mailto:` depends on a configured client, so the UI must keep direct phone and Zalo alternatives visible. Canonical URLs can fall back to the runtime origin in-browser, while the sitemap is generated on demand only after a production hostname is known.
