# HackTX 26 Splash Page — Implementation Plan (v2)

## Overview
Build a responsive splash/hero page for HackTX 26 using React + Tailwind CSS. The design is an illustrated storybook-style scene (oak tree, rolling grass, sky/clouds, castle, ornate hand-lettered logo, and small props/details).

## Scope note
The full page has 5 sections total: **Landing**, Countdown, FAQ, Menu, and one more (TBD). **For now, only build the Landing section** — everything below in this doc describes Landing only. Do not scaffold or stub the other four sections yet.

## Page-level structure (for later reference — not part of this pass)
Only Landing needs the two-scene (desktop/mobile) pattern described below, because it's the one section with genuinely different hand-illustrated art per breakpoint (tree/logo/props rearrange, not just reflow). The other four sections are standard content layouts and should each be a **single responsive component** using normal Tailwind breakpoint classes (`grid-cols-1 md:grid-cols-3`, `flex-col md:flex-row`, etc.) — do not duplicate them into separate desktop/mobile components. That duplication pattern is reserved for sections with real art-directed differences, not general content sections.

Eventual structure:
```
src/components/
  sections/
    Landing/
      Landing.jsx        ← aspect-ratio wrapper + md: breakpoint switch
      DesktopScene.jsx    ← bespoke desktop illustration layout
      MobileScene.jsx     ← bespoke mobile illustration layout
      assets/
    Countdown/
      Countdown.jsx       ← ONE component, responsive via Tailwind classes
    Faq/
      Faq.jsx             ← ONE component, responsive via Tailwind classes
    Menu/
      Menu.jsx            ← ONE component, responsive via Tailwind classes
    ...

Page.jsx                  ← stacks all 5 sections vertically, no desktop/mobile
                             branching at this level — that logic stays inside
                             Landing/ only
```

## Ground truth references
Two finished composite screenshots exist and are the source of truth for exact layout, spacing, and proportions:
- `/tmp/desktop-final.png` — the target desktop composition.
- `/tmp/mobile-final.png` — the target mobile composition.

**Before writing any component code, open and inspect both of these images directly.** Match positions, scale, rotation, and layering against them rather than guessing from written percentages — treat any percentage estimates in this doc as a rough starting point only, to be corrected against the actual screenshots.

## Available assets
All assets live in the project's asset folder. Use these files directly — do not redraw or recreate any of them from scratch:

| File | Likely role |
|---|---|
| `tree.svg` | Main oak tree (canopy + trunk) |
| `roots.svg` | Exposed root/base detail for the tree, layered at its trunk base |
| `grass.svg` | Bottom grass band |
| `dirt.svg` | Soil/cross-section strip beneath the grass |
| `hole.svg` | Small rabbit-hole / mound detail near the base of the scene |
| `cloud1.svg`, `cloud2.svg`, `small-cloud.svg` | Cloud clusters — reusable, place multiple instances at different scales/positions per scene |
| `castle.svg` | Background castle silhouette/element |
| `draft-logo.svg` | The ornate wordmark/logo — this is the hero text element |
| `bottle.svg` | Potion bottle prop |
| `cookie.svg` | Cookie prop (matches "EAT ME" style element) |
| `glass-slipper.png` | Glass slipper prop |
| `sparkle-star.png` | Sparkle/star accent, likely used near magical props or as ambient decoration |
| `hour-hand.png`, `minute-hand.png` | Clock hands — likely combine into a small clock element (rotate independently if a working/animated clock face is wanted) |

## Core Architecture Decision
Do not build one fluid/interpolated layout that morphs desktop into mobile. Build two independently composed scenes and swap between them at a single breakpoint, since the reference screenshots show genuinely different arrangements (not just a scaled version of one another).

## Step-by-step Plan

### 1. Project structure
```
src/components/splash/
  SplashPage.jsx        (aspect-ratio wrapper + breakpoint switch)
  DesktopScene.jsx
  MobileScene.jsx
  assets/               (import the provided SVG/PNG files directly as React components/images)
```
- SVGs can be imported as React components (e.g. via `vite-plugin-svgr` or your bundler's SVG-to-component setup) so they inherit `className`/sizing props cleanly.
- PNG assets (`glass-slipper.png`, `sparkle-star.png`, `hour-hand.png`, `minute-hand.png`) are rendered as `<img>` tags, positioned the same way as the SVG elements.

### 2. Container & aspect ratio
```jsx
<div className="relative w-full aspect-[3/4] md:aspect-[16/9] overflow-hidden">
  <div className="hidden md:block absolute inset-0">
    <DesktopScene />
  </div>
  <div className="block md:hidden absolute inset-0">
    <MobileScene />
  </div>
</div>
```
- Confirm the exact aspect ratios against `/tmp/desktop-final.png` and `/tmp/mobile-final.png` (measure width/height of each reference image and match it) rather than assuming 16:9 / 3:4 — adjust if the real screenshots differ.

### 3. Positioning approach within each scene
- Position every element absolutely using **percentage-based** `top/left/right/bottom` values (not fixed px), sized relative to the container, so each scene holds together across the range of widths its breakpoint covers.
- Derive every element's exact position, scale, and rotation by measuring against `/tmp/desktop-final.png` / `/tmp/mobile-final.png` — take a crop or pixel-measurement pass on each asset's placement in the reference image before writing its coordinates.
- Get z-order right (e.g. `roots.svg` behind `tree.svg` trunk base, `castle.svg` and clouds behind the tree canopy where they overlap, `hole.svg` sitting on top of `grass.svg`).

### 4. Build order
1. Lay down `grass.svg` + `dirt.svg` as the full-width bottom band.
2. Place `castle.svg` and cloud assets (`cloud1.svg`, `cloud2.svg`, `small-cloud.svg`) in the sky layer.
3. Place `tree.svg` + `roots.svg` together as one visual unit.
4. Place `draft-logo.svg` (the hero wordmark) — this should be the largest, most prominent element.
5. Layer in props: `bottle.svg`, `cookie.svg`, `glass-slipper.png`, `hole.svg`.
6. Layer in small accents last: `sparkle-star.png`, `hour-hand.png`, `minute-hand.png` (check the reference screenshots for whether the clock hands form a small clock face element, and at what fixed angle — or whether they should rotate/animate).

### 5. Interactivity
- Check `/tmp/desktop-final.png` and `/tmp/mobile-final.png` for any CTA element (e.g. an "Interest Form" tag/button) — if present, make sure it's a real `<a>`/`<button>` with visible keyboard focus and hover state, not just a static image, even if the surrounding art is illustrated.

### 6. Responsive QA checklist
- Test at minimum: 375px, 414px, 768px (breakpoint boundary — check both scenes near this edge), 1024px, 1440px, 1920px.
- At each size, compare a screenshot of the live page against `/tmp/desktop-final.png` (≥768px) or `/tmp/mobile-final.png` (<768px) to confirm proportions and spacing match.
- Confirm no element overflows its container or overlaps illegibly at breakpoint extremes.
- Confirm the grass/dirt bottom edge sits flush with the container bottom at all sizes.
- Respect `prefers-reduced-motion` if any hover/entrance/clock animation is added.

## Deliverable
A working `SplashPage` component using the provided asset files directly, with two scene sub-components whose layouts are verified pixel-by-pixel against `/tmp/desktop-final.png` and `/tmp/mobile-final.png`.

---

## Positioning & Animation Patterns (established in session)

These are the techniques we settled on. Follow them for all future landing work so the scene stays consistent.

### 1. Aspect-ratio scaling container

Every scene wrapper uses a fixed aspect ratio so all children scale as a unit:

```tsx
<div className="relative w-full overflow-hidden aspect-[1440/1324]">
  {/* desktop */}
</div>
<div className="relative w-full overflow-hidden aspect-[390/1050]">
  {/* mobile */}
</div>
```

- Read the exact `width` and `height` from the SVG's root element to get the ratio — don't assume 16:9 or 4:3.
- The background image becomes `absolute inset-0 w-full h-full` (not `h-auto`) so it fills the declared box rather than driving its own height.
- All overlay widths/positions use `%`, never `vw`. `vw` is relative to the viewport; `%` is relative to the container. They coincide only when the component is full-width, which breaks the moment there's padding or the component is used in a narrower context.

### 2. Multi-piece SVG scenes as a single scalable unit

When a design element is made of several SVG pieces (e.g. the tree), compose them into **one parent `<svg>` with a master `viewBox`** rather than positioning each piece individually:

```tsx
<svg viewBox="0 0 935 768" className="w-full h-auto">
  <image href={piece1} x={…} y={…} width={…} height={…} />
  <image href={piece2} x={…} y={…} width={…} height={…} />
</svg>
```

- Get `viewBox` dimensions from the Figma group's `width × height`.
- Get each piece's `x/y` by subtracting the group's origin: `childX - group.x`, `childY - group.y`.
- Use Figma's bounding-box `w/h` for each `<image>` element's `width`/`height`.
- **Get values from Figma directly** using `use_figma` + `figma.getNodeByIdAsync` rather than estimating. URL format: `figma.com/design/{fileKey}?node-id={id}`.
- Z-order in SVG = document order (later = on top). Match the Figma children array order (index 0 = back).
- The composed SVG is then placed in the scene with a single `position: absolute` + `width: %` + `top/left: %`.

### 3. CSS animations inside inline SVGs

Animations on individual pieces within a composite SVG go inside a `<style>` block inside that SVG:

```tsx
<svg viewBox="…">
  <style>{`
    @keyframes canopy-bob {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-14px); }
    }
    .canopy { animation: canopy-bob 3s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { .canopy { animation: none; } }
  `}</style>
  <g className="canopy" style={{ animationDelay: "0.3s" }}>
    <image href={…} … />
  </g>
</svg>
```

- Wrap each animated piece in a `<g>` and apply `className` + inline `animationDelay`.
- `transform: translateY(px)` inside an SVG moves by screen pixels, not SVG coordinate units.
- **Wave stagger**: delay ∝ element's center-x divided by canvas width. `delay = (centerX / canvasW) * spreadSeconds`. This makes animations travel left → right naturally.
- Always add `prefers-reduced-motion` inside the same `<style>` block.
- Static pieces (e.g. the stump) are bare `<image>` tags with no `<g>` wrapper.

### 4. Global CSS animations (index.css)

Scene-wide animations that apply to multiple components (clouds, sparkles, etc.) go in `src/index.css`:

```css
@keyframes cloud-drift {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(2.5vw); }
  75%       { transform: translateX(-2.5vw); }
}
.cloud-a { animation: cloud-drift 22s ease-in-out infinite; }
.cloud-b { animation: cloud-drift 28s ease-in-out 6s infinite; }
/* … */
@media (prefers-reduced-motion: reduce) {
  .cloud-a, .cloud-b, … { animation: none; }
}
```

- Use `vw` in global keyframes (not `px`) so drift scales with viewport width.
- For pendulum back-and-forth, keyframe at 25% (positive) and 75% (negative) — not just 50%.
- The `reverse` animation-direction on some classes makes clouds drift in opposite directions without extra keyframes.

### 5. Asset sources & file locations

| Asset group | Location |
|---|---|
| Tree pieces | `src/assets/Landing/Tree/` — stump.svg + Vector 1–10.svg |
| Clouds | `src/assets/Landing/clouds/` — `cloud 1.svg`, `cloud 2.svg`, `small cloud.svg` |
| Wind sprites | `src/assets/Landing/wind/W401-1.png … W401-16.png` (16-frame sprite sheet) |
| Background scenes | `src/assets/Landing/landing.svg` (desktop), `src/assets/Landing/landing_mobile.svg` (mobile) |

- Missing SVG pieces (e.g. Vector 7) can be exported on-demand from Figma using `use_figma` → `node.exportAsync({ format: "SVG_STRING" })` and saved to the Tree folder.

### 6. WindSprite placement guidelines

`WindSprite` takes percentage ranges (`xRange`, `yRange`) relative to its container. Key parameters:

```tsx
<WindSprite
  xRange={[minPct, maxPct]}   // horizontal spawn zone
  yRange={[minPct, maxPct]}   // vertical spawn zone
  width="8%"                  // size as % of container width
  opacity={0.75}
  initialDelay={0}            // ms before first play
  pauseMs={2800}              // ms gap between loops
  fps={12}
  zIndex={6}
/>
```

- Stagger `initialDelay` across instances so they never all fire at once.
- Use 2 sprites near the tree and 3 spread across the rest of the page on desktop.
- On mobile use 4 total: 2 in the upper sky, 2 lower in the canopy zone.
- Size sprites ~20% larger on mobile than desktop equivalents (narrower viewport makes them feel smaller).
- `zIndex={6}` puts them above clouds and tree but below interactive elements.

### 7. Z-order layering (back → front)

Render elements in this order inside the scene container so stacking is correct:

1. Background SVG (`absolute inset-0 w-full h-full`)
2. Clouds (`absolute`, low z-index, before Tree in JSX)
3. Tree composite SVG
4. Wind sprites (`zIndex: 6`)
5. Logo / props / interactive elements (highest, rendered last)

JSX document order determines paint order — later siblings are on top.
