---
phase: 1
title: Foundation
status: completed
priority: P1
dependencies: []
---

# Phase 1: Foundation

## Overview

Create the minimal Vite/React/TypeScript foundation, verified Untitled UI primitives, theme tokens, test tooling, and centralized content contracts.

## Requirements

- Functional: static SPA shell with semantic landmarks and a single landing route.
- Non-functional: small dependency surface, TypeScript strictness, Tailwind theme tokens, deterministic scripts.

## Architecture

`src/data/site-content.ts` owns products, service areas, contact details, disclaimers, and FAQs. Page sections consume this data without embedding commercial values in markup. React Aria supplies accessible control behavior; verified Untitled UI base components/icons supply the system layer.

## Related Code Files

- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `index.html`
- Create: `src/main.tsx`, `src/app.tsx`, `src/styles/global.css`, `src/data/site-content.ts`
- Create: `src/components/ui/*`, `src/test/setup.ts`
- Preserve: `sua l2.docx`, `plans/`

## Implementation Steps

1. Scaffold Vite React TypeScript without overwriting the existing DOCX or plan folder.
2. Install only Tailwind v4, React Aria Components, Untitled UI icons/components selected through MCP, and focused QA dependencies.
3. Configure theme tokens for FPT-derived orange/blue/green, deep ink, white/quiet surfaces, Be Vietnam Pro, spacing, focus, and reduced motion.
4. Verify actual installed component and icon exports before imports.
5. Define typed product, area, FAQ, and contact data with current reference pricing and disclaimers.
6. Add initial render/data tests plus lint, typecheck, test, and build scripts.

## Success Criteria

- [x] `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` are available.
- [x] Commercial content is centralized and typed.
- [x] No duplicate router, provider, component library, or unverified import exists.
- [x] The app shell renders with valid Vietnamese typography and semantic theme tokens.

## Risk Assessment

CLI scaffolding can overwrite existing files; generate in a temporary directory or use explicit paths, then review every copied file. Untitled UI APIs remain version-specific until installed and inspected.
