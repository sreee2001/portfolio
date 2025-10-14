# About Me UI Tasks

This file is the single source-of-truth for implementing the new About / Skills UI (horizontal, rolling cards with chips + autoplay/drag behavior). We'll work this list top-to-bottom. After each item I will implement a small, verifiable change, ask for your approval, then proceed to the next item. If you get distracted, I'll remind you to finish the current item.

---

## Table of Contents (high-level actions)

1. Finalize card content (data) — decide exact cards & items to display
2. Confirm visual style options — pick a look (cards width, colors, chip style)
3. Add data to codebase (`PERSONAL_INFO.cards`) — canonical source
4. Render horizontal carousel (overflow-x + flex) — basic scrollable layout
5. Add mouse/touch drag-to-scroll interaction
6. Add autoplay slow left↔right animation (respecting prefers-reduced-motion)
7. Pause on hover / resume behavior and user-interaction handling
8. Accessibility tweaks: keyboard controls, aria labels, reduced-motion fallback
9. Extract companies from CV into the Companies card (optional/confirm)
10. Tests & verification: smoke test, console checks, small Playwright script (optional)
11. Polish: responsive tweaks, shadows, micro-interactions, performance
12. Documentation & cleanup: note in HOW_TO.md + finalize README pointers

Each TOC item is linked to a detailed implementation section below (numbered to match). Reply with the number you want to start with or say "Start from 1" and I'll prompt you before each change.

---

## Detailed tasks (match TOC)

### 1) Finalize card content (data)

- Goal: Decide the set of cards and the canonical items inside each card.
- Deliverable: `PERSONAL_INFO.cards` JSON-like array added to `js/personal-info.js`.
- Suggested default cards (we can modify):

  - Desktop: [WPF, WinForms, Swift, DirectX, VC++]
  - Web: [ASP.NET, Razor, Blazor, HTML, CSS, JavaScript, React, TypeScript]
  - Data & Visuals: [Charts, Reports, Data Grids, Animations]
  - Companies: [BNY, Apex, IHS, ...] — extracted or provided by you
  - Tools & Libraries: [DevExpress, Telerik, Infragistics]
  - Delivery: [Prototyping, Component Libraries, Accessibility]

- Acceptance criteria:

  - `js/personal-info.js` contains a `cards` array with the chosen cards.
  - Each card has `id`, `title`, `items` (array of short labels), optional `description`.
  - I will not change existing PERSONAL_INFO keys (name, social) — just add `cards`.

- Files to edit: `js/personal-info.js` (add/merge `cards` object).

- Est. time: 10–20 minutes.

---

### 2) Confirm visual style options and implement it

- Goal: Pick the visual treatment for the cards. I'll implement one you pick.
- Options (pick one or request a mix):

  - A: Clean rounded cards, white background, soft shadow, chip-style items (compact)
  - B: Elevated cards with subtle gradient headers per category + chips
  - C: Minimal cards (flat, border-only) with bold title and compact list

- Deliverable: CSS additions in `index.html` style block (or `css/style.css` if we extract later). Basic card markup inserted.

- Acceptance criteria:

  - Cards follow the chosen style, render correctly on desktop and mobile.
  - Cards width limited (flex-basis) so multiple show at once; container limited to page content width.

- Files to edit: `index.html` (CSS and markup placeholder), optionally `js/personal-info.js` (if style-specific flags required).

- Est. time: 15–45 minutes depending on option.

---

### 3) Add data to codebase (`PERSONAL_INFO.cards`)

- Goal: Add the selected card data structure to `js/personal-info.js`.
- Deliverable: `cards` array added to PERSONAL_INFO; example:

```js
cards: [
  { id: 'desktop', title: 'Desktop', items: ['WPF','WinForms','Swift','DirectX','VC++'] },
  { id: 'web', title: 'Web', items: ['ASP.NET','Blazor','React','TypeScript'] },
  ...
]
```

- Acceptance criteria:

  - Cards are present in `PERSONAL_INFO` and used by rendering code.
  - No duplication with existing `skills`/`stats` (we can reference both).

- Files to edit: `js/personal-info.js`.

- Est. time: 10 minutes.

---

### 4) Render horizontal carousel (basic)

- Goal: Render the cards inside a horizontally scrollable container limited to page width.
- Implementation notes:

  - Use a wrapper with `overflow-x: auto; display: flex; gap:`
  - Each card `flex: 0 0 280px; min-width: 240px;` so multiple fit.
  - Add visual padding so container aligns with `.section` content width.

- Acceptance criteria:

  - Cards render horizontally; user can scroll (trackpad/touch) to see more cards.
  - Content width is limited to page content width.

- Files to edit: `index.html` (markup + CSS) and small rendering JS in inline script (or a new `js/about-cards.js`).

- Est. time: 20–40 minutes.

---

### 5) Add mouse/touch drag-to-scroll

- Goal: Implement pointer-based dragging so mouse or touch can drag horizontally.
- Implementation notes:

  - On `pointerdown` record startX & scrollLeft; on `pointermove` set scrollLeft accordingly; handle `pointerup`/`pointercancel`.
  - If user moves > threshold, treat as drag (prevent click).

- Acceptance criteria:

  - Dragging horizontally scrolls the cards smoothly.
  - Taps/clicks still work for card clicks (only treat as drag when moved enough).

- Files to edit: `index.html` inline script (or separate js file).

- Est. time: 20–40 minutes.

---

### 6) Add autoplay slow left↔right animation

- Goal: Autoplay that slowly scrolls left to right then reverses, smooth constant speed.
- Implementation notes:

  - Use `requestAnimationFrame` loop adjusting `scrollLeft` by `direction * speed * dt`.
  - Reverse direction at bounds.
  - Respect `prefers-reduced-motion` media query — disable autoplay if user prefers reduced motion.

- Acceptance criteria:

  - Cards slowly scroll horizontally back & forth at a smooth, consistent speed.
  - Autoplay disabled if `prefers-reduced-motion` is set.

- Files to edit: `index.html` script.

- Est. time: 45–90 minutes.

---

### 7) Pause on hover / user interaction handling

- Goal: Pause autoplay on mouseover; if user drags, stop autoplay until idle; resume after short idle.

- Acceptance criteria:

  - Hovering the carousel pauses autoplay immediately.
  - Dragging stops autoplay; after N seconds of inactivity autoplay resumes.

- Files to edit: `index.html` script.

- Est. time: 15–30 minutes.

---

### 8) Accessibility & keyboard controls

- Goal: Add aria attributes, focusable cards, optional keyboard left/right scrolling, and reduced-motion handling.

- Acceptance criteria:

  - Cards are reachable by keyboard (`tabindex=0`) and indicate focus.
  - Provide accessible labels for the carousel region.
  - Autoplay paused when user focuses the carousel.

- Files to edit: `index.html` markup + script + small CSS for focus.

- Est. time: 20–40 minutes.

---

### 9) Extract company names from CV into Companies card (optional)

- Goal: Parse the CV text you attached and add unique company names to the 'Companies' card in `PERSONAL_INFO.cards`.

- Workflow:

  - I will scan the attached CV text and produce a candidate list for your approval.
  - After your approval I will add the names to `PERSONAL_INFO.cards`.

- Acceptance criteria:

  - You approve the extracted list before I add it.

- Files to edit: `js/personal-info.js`.

- Est. time: 10–20 minutes (extraction) + 5 minutes to add after approval.

---

### 10) Tests & verification

- Goal: Smoke test the carousel locally: start server, open page, confirm no console errors, confirm autoplay behavior and drag.

- Deliverable: Short checklist and optional tiny Playwright script that loads page and asserts no console errors.

- Files to edit (optional): `scripts/` add quick `test-about-carousel.js`.

- Est. time: 15–30 minutes.

---

### 11) Polish & responsive tweaks

- Goal: Tidy spacing, ensure cards look good on mobile, tweak speeds, shadows, and chip spacing.

- Acceptance criteria:

  - Carousel looks balanced on desktop/tablet/mobile.

- Files: CSS in `index.html` (or `css/style.css` if extracted).

- Est. time: 15–45 minutes.

---

### 12) Documentation & cleanup

- Goal: Add notes to `HOW_TO.md` or `cleanup/` referencing the new About cards and how to update the `PERSONAL_INFO.cards` data.

- Files: `HOW_TO.md`, `cleanup/AboutMeUITasks.md` (this file will be updated as progress is made).

- Est. time: 10–20 minutes.

---

## Workflow rules (per your request)

- I'll create one small change per task, open a PR-style diff (applied directly in the repo), and then prompt you for approval. After you approve I will proceed to the next task.
- If you get distracted: I'll post a polite reminder like: "We're in the middle of Task X. Want to finish it now or pause?".
- If you request multiple small changes inside a single task I'll bundle them but will still ask for approval before moving on.

## How to begin

Reply with one of the following:

- "Start from 1" — I'll create the `cards` data (default suggested set) and show the diff for approval.
- "Start from 1 (extract companies)" — I'll extract company names from your CV and include them in the Companies card for your review.
- Or pick a TOC number to start with (for example "Start 2" to pick visual style first).

I'll wait for your confirmation before making the first code change.

---

Progress note: This file was created to manage the About/Skills UI changes and will be updated as we complete each task.
