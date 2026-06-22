# Brand Book Template — Claude Guide

This is the master template. Every new client brand book starts here.
Single-file brand book: `index.html` (~3,400 lines) + `brand.js` (single source of truth).

**The only file that needs editing per client is `brand.js`.**
Everything else, layout, CSS, mobile fixes, routing, lives in `index.html` and should not be touched unless fixing a structural bug.

---

## Writing style rules (apply everywhere in this codebase)

**No em dashes.** Never write `—` in any user-visible text (headings, body copy, labels, captions, spec tables, or nav labels). Use these alternatives instead:
- Introductory or explanatory clauses: use a colon (`:`)
- Parenthetical asides: use commas or parentheses
- Two separate thoughts: use a period and start a new sentence

**Sentence case always.** Headings, nav labels, section titles, sub-headings, and button text use sentence case only: capitalize the first word and proper nouns, nothing else. No title case.

---

## Two modes — read this first

**Template editing mode:** If the user says they want to improve the template, fix a bug, update the layout, or make structural changes — proceed directly. Do NOT ask the intake questions. Edit `index.html`, `brand.js`, `CLAUDE.md`, or `setup.js` as needed.

**New client setup mode:** If the user says they want to set up a new brand book for a client — ask the 20 questions below before touching any file. Go one group at a time, wait for answers, then run `node setup.js --config '...'` to write `brand.js` automatically.

---

## New client questionnaire

### Group 1 — Client basics
1. What is the client's full company name?
2. What is the document title? (default: "Brand guidelines")
3. What version and date should appear on the cover? (e.g. "Version 1.0 / June 2026")
4. Who prepared this? (e.g. your agency name)

### Group 2 — Colors
5. What are the PRIMARY brand colors? For each: name + hex value.
   (e.g. "Primary Blue #1CACFF, Dark Blue #00346C, Black #000000, White #FFFFFF")
6. Are there SECONDARY brand colors? For each: name + hex value.
7. For each color: does black or white text look better on top of it?

### Group 3 — Typography
8. What font is used for headlines and display? Local file or Google Font?
9. What font is used for body text? Local file or Google Font?
10. If local, what are the filenames? (place them in the `fonts/` folder)

### Group 4 — Logos
11. What logo files are available? (place them in `images/logos/`)
12. Which file is the dark full logo (for light backgrounds)?
13. Which file is the light full logo (for bright/color backgrounds)?
14. Which file is the white full logo (for dark backgrounds)?
15. Which file is the standalone mark/icon (for the cover page seal)?

### Group 5 — Type specimens
16. Largest display word or phrase (usually the company name)
17. 2–3 word phrase that captures what the company does
18. Short tagline or value proposition (5–8 words)
19. One-sentence company description for body copy

### Group 6 — Sections
20. Which sections to include? Default: logo, color, typography.
    Optional (only if real assets exist): photography, applications, iconography.

**After collecting answers:** run `node setup.js --config '{...}'` with the answers as JSON. Then:
1. Rewrite the section intro copy in `index.html` for the new client (search for `[Client Name]` — every instance needs updating)
2. Replace the placeholder logo files in `images/logos/` with real client logos
3. Add font files to `fonts/`
4. Open `index.html` in a browser to preview

---

## File structure

```
brand-book-template/
├── index.html          # Full brand guide — layout, CSS, JS routing
├── brand.js            # ← EDIT THIS per client (tokens, colors, type, nav, copy)
├── setup.js            # Run to auto-fill brand.js from questionnaire answers
├── sync-figma.js       # Pull logos/tokens from a Figma file
├── fonts/              # Put font files here (.otf, .ttf, .woff2)
│   └── README.md
├── images/
│   ├── logos/          # Put logo SVGs here
│   │   ├── client-logo-full-dark.svg     ← replace with real logos
│   │   ├── client-logo-full-light.svg
│   │   ├── client-logo-full-white.svg
│   │   ├── client-logo-stacked-dark.svg
│   │   ├── client-logo-stacked-light.svg
│   │   ├── client-logo-mark.svg
│   │   └── client-logo-mark-light.svg
│   └── placeholder.svg
└── CLAUDE.md           # This file
```

---

## Logo color rules

| Background type | Which logo to use |
|---|---|
| Light (White, Gray, Pale Green) | `full-dark` — dark ink logo |
| Bright (Primary Blue, Orange, Green) | `full-light` — black wordmark + WHITE mark |
| Dark (Dark Blue, Black) | `full-white` — all white version |

The mobile header logo (`#mobile-logo`) swaps automatically in JS: `full-light` on the home/cover page (bright background), `sidebarLogoImage` (full-dark) on all interior pages.

**Note on stacked logos:** Naming is often inverted from the full logo in Figma exports. Always verify which file is which by opening the SVG in a browser before wiring it up.

---

## Clearspace diagrams

Three logo pages use clearspace diagrams (Full logo, Stacked logo, Logo mark). The diagrams use `.cs-*` CSS classes defined around line 1044 in `index.html`.

### HTML structure (copy this for each diagram)

```html
<div class="cs-outer">
  <div class="cs-zone" style="--cs-x: 34px;">
    <!-- --cs-x = half the logo mark height -->
    <div class="cs-logo-box">
      <img src="images/logos/client-logo-full-dark.svg"
           alt="[Client] clear space"
           style="max-height:68px; width:auto; display:block;">
    </div>
    <div class="cs-dim-v top"><span class="cs-lbl">x</span></div>
    <div class="cs-dim-v bottom"><span class="cs-lbl">x</span></div>
    <div class="cs-dim-h left"><span class="cs-lbl">x</span></div>
    <div class="cs-dim-h right"><span class="cs-lbl">x</span></div>
  </div>
  <div class="cs-def">
    <span class="cs-def-x">x</span>
    <span>= ½ the height of the [Client] mark</span>
  </div>
</div>
```

### Two rules that must never be broken

1. **Never use `@apply` in `.cs-*` CSS rules.** Tailwind CDN ignores `@apply` silently at runtime. All five `.cs-*` classes must use plain CSS properties. If you see `@apply` in the CSS, replace it.

2. **Mobile dimension lines must match scaled padding.** The mobile media query scales the zone padding down. The `.cs-dim-v` and `.cs-dim-h` lines must be overridden with the same formula or they extend into the white box. Both overrides are required:

```css
/* In @media (max-width: 768px) — all four rules travel together */
.cs-outer { padding: 16px !important; }
.cs-zone  { padding: max(12px, calc(var(--cs-x, 36px) * 0.38)) !important; max-width: 100% !important; }
.cs-dim-v { height:  max(12px, calc(var(--cs-x, 36px) * 0.38)) !important; }
.cs-dim-h { width:   max(12px, calc(var(--cs-x, 36px) * 0.38)) !important; }
.cs-logo-box img { max-height: 56px !important; width: auto !important; }
```

---

## Mobile patterns to preserve

- **Type specimens:** per-element `clamp()` inline font-sizes. Never use a blanket `@media` override — it collapses all sizes to one value.
- **Full-height flex containers:** `height: auto !important` on mobile + `flex: 0 0 32px !important` on the `flex:1` spacer.
- **Palette tiles:** color name heading has `margin-bottom: 24px` in `renderPalette()` in `brand.js`.
- **fg-overview fluid type:** uses `container-type: inline-size` + `cqi` units — do not replace with `vw`.

---

## Common pitfalls

- **Smart/curly quotes** (`"` `"`) in `src` attributes break image loading. Use `cat -v` to detect; Python to fix.
- **Tailwind CDN `@apply`** is a no-op in `<style>` blocks — always verify with computed styles.
- **ID specificity** (100) beats class + attribute (10+10) — use `#section-id [style*="..."]` to scope a grid override to one section.
- **Color combinations grid** is hardcoded HTML — update it manually to match the new client's approved logo/background pairings.
- **Color pathways** are hardcoded HTML — regenerate them to match the new client's palette (10-step tint/shade ramps, one per brand color).
