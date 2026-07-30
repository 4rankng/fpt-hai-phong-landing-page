---
phase: 2
title: Design and content
status: completed
priority: P1
dependencies:
  - 1
---

# Phase 2: Design and content

## Overview

Implement the approved visual direction and all crawlable content sections, including a project-owned AI hero image and separate official brand assets.

## Requirements

- Functional: fixed header, split hero, package comparisons, gamer plans, proof panels, coverage grid, FAQ, and footer.
- Non-functional: clear hierarchy, no generic card soup or gradients, responsive image crops, full Vietnamese copy.

## Architecture

`App` composes section components from typed content. Layout alternates flat white and quiet full-width bands. The technician/cable/device hero is the only high-salience image; supporting visuals remain restrained.

## Related Code Files

- Create: `src/components/landing/site-header.tsx`, `hero-section.tsx`, `plan-section.tsx`
- Create: `src/components/landing/proof-section.tsx`, `coverage-section.tsx`, `faq-section.tsx`, `site-footer.tsx`
- Create: `public/images/hero-fiber-technician.webp`, `public/brand/fpt-telecom-logo.svg`
- Modify: `src/app.tsx`, `src/styles/global.css`, `src/data/site-content.ts`

## Implementation Steps

1. Generate a photorealistic wide hero asset: Vietnamese technician, natural hands, clearly terminated white cable, black unbranded Play Box-like device and remote, no text/logo/watermark.
2. Source or reproduce the supplied official FPT Telecom logo as a separate accessible image; do not bake it into generated art.
3. Build the fixed header and split hero with one central action: `tel:0931505556`.
4. Build equal-height product comparisons from centralized data; use a restrained inline SVG flame/label for “Phổ biến”.
5. Add equal-aspect proof panels for typical 24–48 hour installation and online consultation, with honest qualifiers.
6. Add familiar Hai Phong area buttons excluding Cát Hải and Bạch Long Vỹ; use color plus visible labels.
7. Add SEO-useful FAQ and crawlable footer contact copy.

## Success Criteria

- [x] Subject remains recognizable as local FPT fiber sales if brand copy is removed.
- [x] Every product row aligns at desktop and stacks without horizontal scrolling on mobile.
- [x] Hero crop works at 320–1440 px and contains no generated branding/text defects.
- [x] All claims match centralized data and carry the reference-price disclaimer.

## Risk Assessment

AI images can create malformed hands/connectors or fake branding. Inspect the selected output at full size, reject fabricated text, and keep product claims outside the image.
