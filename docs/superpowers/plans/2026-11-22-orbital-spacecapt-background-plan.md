# Orbital SpaceCapt Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the entire portfolio feel like one coherent SpaceCapt environment through a shared deep-space background system.

**Architecture:** Keep `starsbackground` as the global visual surface, move the page-wide atmosphere and orbital grid into CSS pseudo-elements, and simplify the legacy generated star layers so they become subtle depth rather than the main background. Keep Three.js transparent and hero-scoped, with responsive and reduced-motion behavior unchanged.

**Tech Stack:** React, Create React App, CSS, Three.js.

**Spec:** `docs/superpowers/specs/2026-11-22-orbital-spacecapt-background-design.md`

## Global Constraints

- Use a restrained navy/black base, cyan technical accents, and subtle atmospheric depth.
- Keep text, project cards, and interaction areas readable above the background.
- No large opaque rectangle behind the Three.js canvas.
- No heavy external 3D assets or background video.
- Honor `prefers-reduced-motion` for animated visual layers.
- Verify with `CI=true npm run build` because Vercel treats warnings as errors.

## Review Focus

- Hero readability: text remains readable over the 3D scene and atmosphere; verify with the production build and responsive CSS inspection.
- Section continuity: every major section inherits the same global surface; verify selectors and rendered build output.
- Transparency: Three.js does not introduce an opaque canvas background; verify renderer alpha and CSS layers.
- Reduced motion: CSS and Three.js animation do not continue aggressively when reduced motion is preferred; verify existing motion guard and CSS media query.
- Mobile layout: background layers do not create horizontal overflow; verify the build and mobile media rules.

---

### Task 1: Consolidate the global SpaceCapt background

**Files:**
- Modify: `src/Portofolio-Website-Fahri/Background.css`
- Modify: `src/Portofolio-Website-Fahri/Zulkarnaenfhr.jsx`

**Interfaces:**
- Consumes: the existing `.starsbackground`, `#background`, and generated star styles.
- Produces: one shared page surface with atmospheric gradient, subtle orbital grid, and low-contrast star depth.

- [ ] **Step 1: Replace the opaque black global surface and legacy visual emphasis** with layered navy-black gradients, a faint grid, cyan atmospheric bloom, and lower-opacity generated stars.
- [ ] **Step 2: Add reduced-motion handling** for the global falling-star animations without changing the existing component state or content flow.
- [ ] **Step 3: Inspect selectors** to confirm the layers remain behind all section content and do not intercept pointer events.

### Task 2: Harmonize the hero Three.js scene

**Files:**
- Modify: `src/Portofolio-Website-Fahri/Container/2. HomeSection/HomeSection.css`
- Modify: `src/Portofolio-Website-Fahri/Container/2. HomeSection/SpaceScene.jsx`

**Interfaces:**
- Consumes: the global background from Task 1 and existing transparent renderer.
- Produces: a hero scene with matching navy/cyan palette, no independent rectangle, and clear visual hierarchy behind the SpaceCapt copy.

- [ ] **Step 1: Remove competing hero overlays** and make the hero atmosphere blend with the global surface.
- [ ] **Step 2: Align star, route, aircraft, and glow colors** with the global SpaceCapt tokens while keeping the aircraft small and legible.
- [ ] **Step 3: Verify responsive and reduced-motion behavior** remains intact.

### Task 3: Add section transition continuity

**Files:**
- Modify: `src/Portofolio-Website-Fahri/Style.css`
- Modify: section CSS files only where an opaque local background breaks continuity.

**Interfaces:**
- Consumes: the global surface from Task 1.
- Produces: smooth vertical transitions without abrupt black/colored blocks.

- [ ] **Step 1: Audit local section background declarations** and remove or soften only those that conflict with the shared background.
- [ ] **Step 2: Add a consistent section edge treatment** using transparent gradients or atmospheric separators, not new opaque panels.
- [ ] **Step 3: Confirm cards and content retain their existing contrast and layout.**

### Task 4: Verify the deployment build

**Files:**
- No production files unless verification finds a regression.

- [ ] **Step 1: Run `CI=true npm run build`.**
- [ ] **Step 2: Confirm the command exits 0 and report any pre-existing warnings or failures explicitly.**
