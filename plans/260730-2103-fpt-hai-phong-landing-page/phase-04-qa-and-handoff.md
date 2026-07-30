---
phase: 4
title: QA and handoff
status: completed
priority: P1
dependencies:
  - 1
  - 2
  - 3
---

# Phase 4: QA and handoff

## Overview

Prove the static page is buildable, usable, responsive, accessible, SEO-ready, and free of invented claims before handoff.

## Requirements

- Functional: automated checks and real browser inspection of primary conversion paths.
- Non-functional: no overflow, console errors, inaccessible controls, or avoidable image/performance regressions.

## Architecture

Vitest covers data and interaction contracts; browser automation validates rendered behavior at required viewports. Lighthouse or equivalent local audits supplement, not replace, hands-on screenshot review.

## Related Code Files

- Create: `src/**/*.test.tsx`, `tests/landing-page.spec.ts`, `playwright.config.ts`
- Create: `README.md`
- Modify: implementation files only when QA identifies a concrete defect.

## Implementation Steps

1. Run focused tests, then typecheck, lint, complete test suite, and production build.
2. Start the production preview and inspect 320×568, 390×844, 768×1024, and 1440×900.
3. Verify hotline, Zalo, each area trigger, form validation/submission states, Escape, focus return, and keyboard traversal.
4. Check visible focus, heading order, contrast, reduced motion, safe-area spacing, long Vietnamese wrapping, and zero horizontal overflow.
5. Inspect hero and below-fold images for crop, intrinsic dimensions, lazy loading, and synthetic defects.
6. Run SEO/accessibility/performance audits; fix newly introduced failures and document deployment-only canonical/endpoint inputs.
7. Review all changed files and produce a concise handoff README.

## Success Criteria

- [x] Typecheck, lint, tests, and production build pass.
- [x] Required viewport screenshots show no overflow, clipping, or unusable touch target.
- [x] Browser console has no application errors.
- [x] Primary hotline and lead flows are proven; endpoint absence has a working fallback.
- [x] README documents local commands, content update path, deployment URL, and lead endpoint configuration.

## Risk Assessment

Synthetic browser environments may not launch native `tel:`, `mailto:`, or Zalo apps; verify correct URLs and avoid claiming external app completion. Treat missing production hostname/lead endpoint as documented release inputs, not local build failures.
