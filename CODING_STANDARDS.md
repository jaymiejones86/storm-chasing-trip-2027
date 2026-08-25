# Storm Chasing Holiday coding standards

Consult `AGENTS.md`, `README.md`, and `docs/decisions/README.md` before material
work. Keep changes proportionate to this single-page client application.

## React and state

- Keep the primary flow in small functional components and hooks. Do not add a
  router, state library, server layer, or component framework for this page.
- Keep the saved configuration backward-compatible: merge parsed local data over
  defaults, handle malformed storage, and avoid persisting derived countdown
  values.
- Parse dates and numeric budget inputs defensively. Clamp display values where
  negative progress or time would be misleading.
- Keep browser globals inside event handlers, effects, or guarded helpers so a
  future static render does not fail unnecessarily.

## Interface and styling

- Preserve Australian English, `en-AU` dates, AUD currency, and the current
  storm-chasing visual character unless the user requests a redesign.
- Use semantic landmarks, forms, labels, buttons, and progress semantics. Retain
  visible keyboard focus and sufficient contrast over image layers.
- Keep the layout usable on narrow phones through desktop without horizontal
  scrolling. Respect reduced-motion preferences for any new animation.
- Change source under `src/`; never edit `dist/` as the implementation source.

## Verification and decisions

- Run `npm run build` after source or configuration changes. For UI changes,
  exercise configure, save, reset, countdown completion, malformed saved data,
  and phone/desktop layouts in a real browser when available.
- The package has no lint or automated test script. Add one only as an explicit,
  justified change and then document the new gate.
- Consult the registry before changing product behavior, persistence,
  dependencies, hosting, privacy, accessibility, or architecture; add an indexed
  decision record in the same slice for a material choice.

