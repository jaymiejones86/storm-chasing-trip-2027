# Storm Chasing Holiday agent guide

This file applies to the whole repository. The canonical product name is
**Storm Chasing Holiday**; `storm-chasing-holiday` is the npm/package identifier.

## Scope

This is a small, client-only React/Vite countdown for a Texas and Oklahoma storm
chasing holiday. It displays trip dates, a live countdown, and AUD budget
progress. Visitor changes are stored only in that browser's `localStorage`.

Before changing it, read `README.md`, `CODING_STANDARDS.md`,
`docs/decisions/README.md`, `src/StormChasingCountdown.jsx`, `src/styles.css`,
the Vite/Netlify configuration, and the Git diff.

Material product, persistence, dependency, hosting, privacy, accessibility, or
architecture choices require a decision record and registry update in the same
slice.

## Working agreement

- Keep the application static and client-only. Do not add accounts, a backend,
  cloud sync, analytics, payments, or a database without explicit authorization.
- Preserve Australian date/currency formatting, editable trip settings, safe
  malformed-storage fallback, non-negative countdown/budget values, and local
  reset behavior.
- Keep controls keyboard-accessible, labelled, touch-friendly, responsive, and
  readable over the storm artwork. Do not rely on visual styling alone for state.
- Follow `CODING_STANDARDS.md`. This package supports `npm run build`; it has no
  configured lint or automated test command, so do not claim those checks.
- Treat `dist/` as generated output even if it exists locally. Verify source with
  a fresh Vite build and do not hand-edit the generated bundle.
- Preserve unrelated changes. Commit, push, publish, deploy, install or upgrade
  packages, or change trip defaults only when explicitly authorized.

