# 0001. Static client-only working contract

## Status

Accepted

## Date

2026-08-25

## Context

Storm Chasing Holiday is a single-page Vite countdown whose trip configuration
is personal, low-risk, and stored in each visitor's browser. A server or account
system would add operational and privacy scope without a demonstrated need.

## Decision

Keep the application static and client-only. Store editable trip settings in
`localStorage`, retain safe defaults and malformed-data fallback, and use the
existing Vite build plus Netlify static hosting configuration.

## Consequences

- Settings do not sync across browsers or devices.
- Clearing browser storage resets the visitor to repository defaults.
- Backend, account, analytics, or cloud-sync work requires a new explicit
  decision.

## Related files

- `AGENTS.md`
- `CODING_STANDARDS.md`
- `README.md`
- `src/StormChasingCountdown.jsx`
- `netlify.toml`

