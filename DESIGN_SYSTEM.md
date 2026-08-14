# Clarion Design System

This document **describes the system that actually ships**. It is the single
source of truth. Everything below is implemented as CSS custom properties and
rules in **`app/globals.css`** (one stylesheet) and the fonts wired up in
`app/layout.tsx`. The homepage is the visual reference; every other page aligns
to it.

## Design direction

Clarion is academic, institutional, precise, calm, and editorial. Avoid
marketing language, bright startup styling, decorative effects without meaning,
and unnecessary visual fragmentation. Hierarchy comes from **typography,
spacing, and restrained 1px rules** — not from boxes, borders, or color.

There are only **two content patterns**: editorial rows (a hairline-separated
list with a leading number or icon) and quiet raised cards. Do not invent a
third.

---

## Design tokens

All tokens live in a single `:root` block at the top of `app/globals.css`.
Reference them with `var(--ui-*)`; never hard-code these hex values in new rules.

### Color

| Token | Value | Role |
| --- | --- | --- |
| `--ui-navy` | `#182633` | Dark surfaces (hero, footer, dark bands); primary ink on light |
| `--ui-ink` | `#1b2a36` | Heading ink on light surfaces |
| `--ui-slate` | `#50616b` | Body / secondary text |
| `--ui-teal` | `#4f828f` | Brand teal — fills, icon tints, nav underline, accents |
| `--ui-teal-dark` | `#356a75` | Teal for **small text / eyebrows on light** (meets AA 4.5:1 on ivory) |
| `--ui-teal-light` | `#8fb8c2` | Teal for **text / eyebrows / accents on navy** |
| `--ui-ivory` | `#f4f1ea` | Base warm ivory surface |
| `--ui-paper` | `#faf8f3` | Raised surface (cards) |
| `--ui-mist` | `#e7eeee` | Cool mist section band |
| `--ui-line` | `rgba(80,97,107,.22)` | Standard hairline |
| `--ui-line-strong` | `rgba(80,97,107,.34)` | Emphasized hairline (section/list tops) |

**Two-teal rule (accessibility-driven).** Teal is never one value. On light
surfaces, teal *text* uses `--ui-teal-dark` so it passes AA; teal *fills and
accents* use `--ui-teal`. On the navy surfaces, teal text and accents use
`--ui-teal-light`. Picking teal is therefore a function of the background, not a
single brand swatch.

The three surface backgrounds are the only ones allowed: **ivory → mist → navy**.
Dark navy bands are reserved for the hero, the footer, and one or two
intentional dark content sections (e.g. governance “How data are protected”).

### Layout & space

| Token | Value | Role |
| --- | --- | --- |
| `--ui-frame` | `1180px` | Max content width, site-wide |
| `--ui-gutter` | `max(1.5rem, (100vw − 1180px)/2)` | Page inline padding that centers the frame |
| `--ui-section-y` | `clamp(4.75rem, 7vw, 6.5rem)` | Vertical section padding (`4.5rem` under 760px) |
| `--ui-card-pad` | `clamp(1.5rem, 2.25vw, 2rem)` | Card interior padding |
| `--ui-card-radius` | `0.75rem` | Card corner radius |

Base rhythm is 8px. Header/footer and every page section share the same 1180px
frame and gutter.

---

## Typography

Two families, loaded via `next/font` in `app/layout.tsx`:

- **`--font-fraunces` → Source Serif 4** — display and all headings (`h1`–`h4`)
  and the wordmark.
- **`--font-sans` → Geist** — body, navigation, labels, eyebrows, UI text.

No heading ever renders in Georgia; Georgia only exists as a fallback in the
`font-family` stack.

### Minimum sizes (audience skews 45+)

- Reading text: **18px** (`1.125rem`) minimum — this is the `body` default.
- Navigation, links, buttons, eyebrows: **16px** minimum.
- Metadata: 14px minimum.
- Usable at 200% zoom; reflows at narrow widths with no horizontal scroll.

### Scale

| Role | Spec |
| --- | --- |
| Hero title (`h1`) | Source Serif, `clamp(3.25rem, 5.1vw, 5.35rem)`, weight 600, line-height 1.0, `-0.042em` |
| Section title (`h2`) | Source Serif, `clamp(2.75rem, 4vw, 3.625rem)`, weight 500, line-height 1.04, `-0.035em` |
| Card / subsection (`h3`) | Source Serif, `1.4rem`, weight 600, line-height 1.2 |
| Eyebrow (`.section-label`, `.home-kicker`) | Geist, `0.875rem`, weight 700, `0.13em`, uppercase; `--ui-teal-dark` on light, `--ui-teal-light` on dark |
| Body | Geist, `1.125rem`, line-height ~1.62–1.65 |

Emphasized phrases inside a section title use the same face in teal
(`--ui-teal` / `--ui-teal-light`), italic where the design calls for it. Every
page’s section headings map to the same `h2` role — no page introduces its own
heading size or weight.

---

## Components

### Header (`.site-header`)

- Sticky, flat editorial bar — not a floating pill or rail.
- Height **76px desktop / 68px mobile**; contents aligned to the 1180px frame.
- Warm translucent paper surface (`rgba(250,248,243,.96)`) with a teal-tinted
  1px bottom rule; gains a restrained shadow when `data-scrolled="true"`.
- Wordmark: Source Serif, ~18px, weight 600, `0.15em` tracking, ≥44px hit area.
- Nav: one unboxed row of Geist 16px links, slate default → navy on
  hover/focus/active-page, revealed by a 2px teal underline. Contact is a peer
  link, **not** a filled CTA.
- Mobile: 44×44 toggle opens a full-width panel below the header; links are
  ≥54px tall with quiet dividers; `aria-expanded` reflects state.

### Footer

Navy, full-width, contents on the 1180px frame. Brand statement + one nav group
+ a meta row separated by a teal-tinted rule.

### Interior hero (all non-home pages)

One shared composition (`.page-hero`, `.network-hero`, `.governance-hero`,
`.sponsored-hero`): navy diagonal gradient with a faint teal dot-texture,
`min-height: 520px`, one-column content capped at 820px, teal-light eyebrow,
Source Serif `h1`, and a `#d7dfe1` intro paragraph.

### Cards (`.principle-card`, `.membership-card`, `.oversight-card`, …)

Flat raised surface: `--ui-paper`, 1px `--ui-line` border, `--ui-card-radius`,
`--ui-card-pad`, soft shadow (`0 12px 28px rgba(24,38,51,.045)`). Hover lifts 2px
and deepens the border/shadow. No nested borders or heavy outlines.

### Icon badges

`2.75rem` circle. On light surfaces: `rgba(143,184,194,.24)` tint with a
`--ui-teal-dark` line icon (Lucide, ~1.6 stroke). On dark surfaces: solid
`--ui-teal-dark` with a `--ui-paper` icon.

### Buttons — three levels

Do not give two actions in one decision area equal weight.

1. **Primary** — one per decision area. Light surface → navy fill, ivory text;
   dark surface → ivory fill, navy text. ~48px tall, 4–6px radius, no decorative
   border. (The hero’s “Explore Clarion” uses the `SpecularButton` component.)
2. **Secondary** — supporting, filled with a quiet surface; ≥44px.
3. **Tertiary / text link** — text with a directional arrow or a restrained
   underline; ≥44px hit area, no container.

**States (all interactive elements).** Visible hover, active, and keyboard
focus. Hover: 2px lift on buttons, animated hairline underline on text links,
arrows nudge forward. Focus: 3px ring, 3px offset. Active: 1px down, slight scale
and opacity reduction. Disabled: ~52% opacity. All motion is removed under
`prefers-reduced-motion`.

### Data / network visuals

Teal and ivory on navy, thin precise paths, restrained motion with
reduced-motion support. The homepage hero network (`HeroNetwork`) and the
`PixelBlast` WebGL layer are decorative and `aria-hidden`. Nodes and labels
represent real institutions.

---

## Accessibility

Target **WCAG 2.2 AA**, tuned generously for readers 45+.

- Reading text ≥18px; functional UI text ≥16px; metadata ≥14px.
- Normal-text contrast ≥4.5:1 (this is why teal text uses `--ui-teal-dark` on
  light and `--ui-teal-light` on navy); large text / essential non-text ≥3:1.
- All controls have a visible keyboard focus ring not conveyed by color alone.
- Primary controls and nav targets ≥44px.
- Content reflows at narrow widths with no horizontal scrolling and supports
  200% zoom.
- Animation is optional and respects `prefers-reduced-motion`.

---

## Working in this system

- **One stylesheet.** All design rules live in `app/globals.css`. The only other
  stylesheet is the component-scoped `app/components/PixelBlast.css`.
- **Use tokens.** Reference `var(--ui-*)`; do not hard-code palette hex, the
  1180px frame, or the section spacing.
- **Reuse the two patterns.** New content is either an editorial row list or a
  quiet raised card — styled by the existing shared contracts, not a new
  bespoke block.
- **Keep the homepage as the reference.** When a page looks off, align it to the
  homepage’s type scale, eyebrow, surface sequence, and spacing rather than
  adding overrides.
