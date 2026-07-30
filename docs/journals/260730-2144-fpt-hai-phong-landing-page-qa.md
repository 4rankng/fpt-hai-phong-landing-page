# Parallel QA Lied to Us

**Date**: 2026-07-30 21:44
**Severity**: Medium
**Component**: FPT Hai Phong landing page QA and handoff
**Status**: Resolved

## What Happened

The landing page implementation itself was stable, but the release workflow briefly gave us a false signal. When the build and Playwright checks were run in parallel, the browser suite tripped a transient focus assertion around the area-trigger dialog. The product was not broken; the test timing was.

## The Brutal Truth

This was annoying because it looked like a real regression and burned time that should have gone into polishing the handoff. The frustrating part is that we already had a good page, but a sloppy validation sequence made it look unreliable until we reran it serially.

## Technical Details

The relevant check was the focus-return assertion around the area button after closing the lead dialog, including `await expect(areaButton).toBeFocused()`. The browser run also covered 320x568, 390x844, 768x1024, and 1440x900, plus the hotline, Zalo, area-prefill, Escape close, and horizontal overflow checks. The failure disappeared once the final QA pass was rerun in serial order after the browser environment was stable.

## What We Tried

We first treated it like a product bug and rechecked the dialog behavior, then compared it against the serial rerun. That made it obvious the issue was workflow timing, not the page implementation. We kept the focus check instead of weakening it, because that assertion is doing real work.

## Root Cause Analysis

The root cause was a bad QA sequence, not bad UI code. Parallelizing build and browser assertions created a racey validation moment where the page state was sampled before focus restoration had fully settled. That is a process bug we introduced ourselves.

## Lessons Learned

Do not confuse faster CI with better proof. For interaction-heavy pages, keep at least one serialized browser pass before declaring victory. If a focus or overlay assertion flakes once, verify the run order before touching the component.

## Next Steps

Keep the serial Playwright rerun in the handoff record, preserve the focus-return assertion, and use the same ordered QA pattern for similar landing-page work going forward.
