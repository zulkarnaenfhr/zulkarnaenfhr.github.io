# Orbital SpaceCapt Background Design

## Intent

Make the portfolio feel like one coherent SpaceCapt environment instead of separate sections with unrelated backgrounds. The visual language should be serious, technical, spacious, and readable.

## Goals

- Establish one global deep-space background system across every section.
- Use a restrained navy/black base, cyan technical accents, and subtle atmospheric depth.
- Keep text, project cards, and interaction areas readable above the background.
- Make the Three.js hero scene feel native to the same environment.
- Preserve responsive behavior and reduced-motion support.

## Non-goals

- Redesigning project content, navigation structure, or portfolio copy.
- Adding heavy external 3D assets or background video.
- Making every section visually identical; sections may retain their own spacing and content hierarchy.

## Anti-goals

- No large opaque rectangle behind the Three.js canvas.
- No competing neon colors or excessive particle density.
- No animation that makes content difficult to read or causes avoidable performance cost.

## Approach

Use the existing global `starsbackground` wrapper as the single visual surface. Replace the legacy scattered starfield treatment with CSS layers for atmospheric gradient, faint orbital grid, and consistent star depth. Keep the Three.js canvas transparent and scoped to the hero so it participates in the global background rather than introducing a second background. Add section edge gradients to transition naturally through the page.

## Constraints

- Continue using the current Create React App and Three.js setup.
- Keep the implementation CSS-first for global layers and lightweight in JavaScript.
- Verify with `CI=true npm run build` because Vercel treats warnings as errors.
- Honor `prefers-reduced-motion` for animated visual layers.
