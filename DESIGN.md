# Clarion design guideline

Clarion's visual direction is **elegant, editorial tech**: calm, precise, institutional. A research network
for clinicians and data scientists, not a consumer app. These rules are the single reference for every page.
Values live as CSS custom properties on `#main-content` in `app/globals.css`.

---

## 1. Principles

1. **Everything is visible.** No content behind hover, click-to-reveal, accordions or carousels.
2. **Few containers.** A page may have a hero panel and one set of cards. Never nest boxes in boxes.
3. **Spacing separates, lines don't.** No divider lines between items. Use whitespace.
4. **Align to shared edges.** Items in a group start on the same left edge and share one structure.
5. **One accent at a time.** Gold is the signature accent; blue is the brand/action colour.
6. **Restraint over effects.** Motion is subtle and never carries content.

---

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0b1a3a` | Headings, card titles, emphasised body |
| `--body` | `#2f4468` | Body copy on light surfaces |
| `--brand` | `#2b5aa6` | Section labels, links, icons, accents |
| deep blue | `#1b3f91` | Italic accent words in headings, link hover |
| `--gold` | `#b07a36` | Sequence numbers on light surfaces |
| `--gold-light` | `#f2b56b` | Numbers and icons on dark surfaces |
| navy | `#06112a` → `#0f2a5c` | Dark bands and blue cards (use sparingly) |
| light surface | `#ffffff`, `#f5f7fb`, `#eef3fb` | Page and section backgrounds |

**Never:** purple, teal, brown, strong orange, flat grey, warm ivory. Text on dark surfaces is
`#eef2f9` (titles) / `#d6e0f0` or lighter (body), never mid-grey.

---

## 3. Typography

Two families only: **EB Garamond** (`--font-fraunces`) for display and headings, **Geist** (`--font-sans`)
for everything else.

### Inner pages: five sizes

| Role | Desktop | Phone | Font | Used for |
|---|---|---|---|---|
| Display | 56px | 38px | Garamond 500 | Page hero title |
| Headline | 44px | 34px | Garamond 500, tracking -0.01em | Section headings; large sequence numbers; stat figures |
| Title | 24px | 24px | Geist 600, tracking -0.015em | Every card / item title; mission statement; small sequence numbers |
| Body | 18px | 18px | Geist 400, line-height 1.6 | All paragraphs, list items, links |
| Label | 15px | 15px | Geist 600, uppercase, tracking 0.12em | Section labels ("CORE PRINCIPLES") |

Tokens: `--fs-display`, `--fs-headline`, `--fs-title`, `--fs-body`, `--fs-label`.
Within a role, separate items with **weight and colour, not new sizes** (e.g. definition = `--ink` 500,
detail = `--body` 400, both 18px).

Accent words in a heading are *Garamond italic* in deep blue (`#1b3f91`), or light gold on dark bands.

### Homepage exception

The homepage keeps its own tuned scale for a 45+ audience (51px section headings, 24px card titles,
20px leads, 18px body, 16px labels) and its full-screen hero. Do not apply the inner-page scale to it.

---

## 4. Layout and spacing

- Content width: `min(1200px, 100% − 2 × gutter)`, gutter `clamp(16px, 4vw, 48px)`.
- Section vertical padding: `--section-pad` = `clamp(4.5rem, 7vw, 6.5rem)` (about 101px on desktop).
- Section header: label → heading (→ optional intro, max-width 46rem).
- Two-column sections: statement or heading at left, content at right; both share the top edge.
- Grids collapse to one column on phones; never horizontal scroll.

---

## 5. Components

### Hero panel (inner pages)
Light rounded panel (radius 24px, fine blue border, white to pale-blue gradient, faint grain) with the
React Bits **HoloMosaic** in blue metal at right. Title: lead line + italic accent line.

### Section label
Brand blue, 15px Geist 600, uppercase, tracking 0.12em. Light gold on dark bands.

### Card
Radius `--card-radius` (24px), padding `--card-pad` (32px), white surface, soft shadow, no border.
Card title = Title role. One card style per page; do not mix card designs in one section.

### Blue card (dark surface)
Navy gradient lifted toward `#142f66`–`#224b96` with brand-blue light; white title, `#e6edf9` body.
Used for the About mission Scroll Stack.

### Numbered list
For real sequences only (principles, roles, process steps). Number is Garamond italic, gold:
- **Large** (Headline, 44px): primary lists (About principles, Network roles). May use the metallic gold foil.
- **Small** (Title, 24px): compact steps (Sponsored research process).
No drop shadows on numbers.

### Icons
- **Light surfaces:** the homepage icon tile: 54px soft-blue rounded tile (radius 14px), glossy
  highlight, faint warm glow, 28px brand-blue line icon (stroke 1.8).
- **Dark surfaces:** 32px thin line icon (stroke 1.25), light gold `#f2c27e`, no tile.
- Icons label **parallel categories** (features, protections, policies, eligibility).

### Number OR icon, never both
An item shows a number **or** an icon. Parallel categories → icon. Ordered sequences → number.

### Bullets
Small 6px brand-blue dot at 55% opacity, centred on the first line. No check marks, no orange.

### Links
Brand blue, 600, with a small arrow that nudges 3px on hover. Focus ring: 2px brand blue.

### Motion
Reveal on scroll (fade/slide, under 700ms), Scroll Stack on the About mission, HoloMosaic in heroes.
Respect `prefers-reduced-motion`. Never animate content into view on hover.

---

## 6. Do / don't

| Do | Don't |
|---|---|
| Show all text at once | Hide text behind hover or click |
| Separate with whitespace | Add divider lines or rules |
| Use one container level | Put boxes inside boxes, or stack many boxed sections |
| Keep numbers for sequences | Put a number and an icon on the same item |
| Use the five type sizes | Introduce a new size for one element |
| Use navy / blue / gold | Use purple, teal, brown, orange or flat grey |
| Copy an approved component | Invent a new card or icon style for one section |

---

## 7. Checklist before shipping a page

- [ ] Only the five type sizes (inner pages); labels 15px, body 18px.
- [ ] Section labels brand blue (light gold on dark), tracking 0.12em.
- [ ] Section padding uses `--section-pad`.
- [ ] Cards: radius 24px, padding 32px, titles 24px Geist 600.
- [ ] No divider lines; no off-palette colours.
- [ ] Each item has a number or an icon, not both.
- [ ] Nothing is hidden behind interaction.
- [ ] Works at 375px with no horizontal scroll.
