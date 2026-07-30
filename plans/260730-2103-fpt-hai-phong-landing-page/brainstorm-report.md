# Brainstorm Report

## Workspace Audit

- `rg --files /Users/dev/Documents/projects/telecom-landingpage` returns only the plan folder and `sua l2.docx`; no `package.json`, `src/`, `.git/`, `README.md`, or deployed asset pipeline exists yet.
- `git rev-parse --is-inside-work-tree` fails in this workspace, so the plan cannot cite a current branch and must treat deployment host + git bootstrap as handoff prerequisites.
- Implementation therefore starts from an empty root app scaffold and must preserve the existing `plans/` folder plus the original DOCX brief.

## Brief Extract From `sua l2.docx`

- Header must stay fixed with the official FPT Telecom logo on the left and only one hotline CTA, `0931.50.55.56`, on the right.
- The hero image must remove the black cable roll and backpack, switch to a technician holding a white terminated fiber/network cable, and replace the old TV remote with a black FPT Play Box plus remote.
- Mid-page lead/Zalo CTAs are removed; the center hero keeps only the hotline CTA, while lead capture becomes a floating round action and Zalo stays as a separate round control.
- Package cards must be equal height, the “combo sky” highlight art needs cleanup, and gamer plans need summary bullets directly inside each card instead of an outbound “Tham khảo tại fpt.vn” link.
- The two promo tiles for installation timing and online-registration offers must share equal size on a flat white background.
- Coverage options must exclude Cát Hải and Bạch Long Vỹ, color each remaining area distinctly, and open the customer info form on click.
- Footer contact swaps Zalo text for `trangntm35@fpt.com` and `Đường Bùi Viện, Phường Lê Chân, Hải Phòng`.

## Controller-Approved Implementation Inputs

- Direction: local fiber dispatch landing page, not an impersonated corporate FPT microsite.
- Tech target: Vite + React + TypeScript + Tailwind CSS + React Aria Components, static build.
- Content target: centralized package, area, contact, disclaimer, and SEO data so price/spec refreshes do not require editing section markup.
- Lead flow: one reusable form component, mobile bottom sheet + desktop dialog, mailto fallback always present, optional `VITE_LEAD_ENDPOINT` for future POST integration.
- Visual target: white/deep-ink base, FPT orange/blue/green accents, Be Vietnam Pro, official logo separated from the generated hero art, no text/logo/watermark baked into the hero image.

## Public FPT References Checked On 2026-07-30

- Official FPT pages still market `SKY` from `195.000đ/tháng` and `F-Game` at `230.000đ/tháng`, while bundle naming and exact combos vary by province; product data must therefore live in one updateable source with a visible “tham khảo / tùy khu vực, thời điểm” disclaimer. Sources: `https://fpt.vn/tin-tuc/max-ping-la-gi-y-nghia-that-su-trong-lol-va-game-khac-12752.html`, `https://fpt.vn/tin-tuc/lap-wifi-chi-linh-hai-duong-12059.html`
- Official FPT pages still use “24 đến 48 giờ” style wording for typical installation timing after contract/confirmation; same-day support is positioned as area-dependent, not guaranteed. Sources: `https://fpt.vn/tin-tuc/lap-wifi-fpt-xa-ba-vi-ha-noi-12800.html`, `https://fpt.vn/tin-tuc/dang-ky-internet-fpt-dong-da-ha-noi-13967.html`
- Official FPT Hai Phong branch content exists separately on `fpt.vn`, so this landing page must position itself as a local sales/contact page and avoid corporate claims the implementation cannot substantiate. Source: `https://fpt.vn/tin-tuc/thong-bao-ve-viec-thay-doi-thong-tin-don-vi-ban-hang-tai-chi-nhanh-hai-phong-9954.html`

## Planning Implications

- Because no app scaffold exists yet, Phase 1 has to create the project safely from a temporary Vite scaffold copied into the current root instead of assuming an in-place app already exists.
- Because no local dependency manifest exists yet, Untitled UI icon/component API usage is currently `[UNVERIFIED]` and must be checked against the installed package name/API before code depends on it.
- Because no production hostname is known yet, canonical URL, sitemap host, and OpenGraph absolute URLs need an env-backed base URL and a release blocker if it remains unset.
