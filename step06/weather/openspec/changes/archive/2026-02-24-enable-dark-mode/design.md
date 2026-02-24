## Context

The React frontend currently uses a single static visual theme. The change introduces a user-controlled light/dark mode toggle while keeping implementation minimal and local to frontend code. The UI must expose the control in the top-right corner, and the selected theme should persist across reloads.

## Goals / Non-Goals

**Goals:**
- Provide an accessible theme switch in the top-right corner of the app.
- Support both `light` and `dark` theme modes through shared CSS variables.
- Persist the user selection in browser storage.
- Use system preference only as the initial fallback when no explicit user choice exists.

**Non-Goals:**
- Add backend APIs or server-side user profile theme storage.
- Introduce additional frontend libraries for theming or state management.
- Redesign core application layout beyond adding the switch and adapting colors.

## Decisions

1. Theme state location
- Decision: Keep theme state in the root React component and apply it by setting `data-theme` on the document root element.
- Rationale: This keeps implementation simple, avoids prop drilling across unrelated components, and enables global CSS variable switching.
- Alternatives considered: React context (overkill for current single-screen scope), body class toggling (works but less explicit than a dedicated attribute namespace).

2. Persistence strategy
- Decision: Store explicit user selection in `localStorage` under a stable key (for example `theme-preference`).
- Rationale: `localStorage` is already available without dependencies and aligns with expected persistence behavior.
- Alternatives considered: `sessionStorage` (does not survive browser restarts), cookies (unnecessary complexity for client-only preference).

3. Initial theme resolution
- Decision: Resolve startup theme as: saved preference first, otherwise `prefers-color-scheme` media query.
- Rationale: Respects explicit user intent and provides a good default for first-time visitors.
- Alternatives considered: always default light (ignores OS preference), always default dark (same issue).

4. UI control model
- Decision: Use a semantic checkbox-based switch with clear label and `aria` attributes, positioned top-right in the header area.
- Rationale: Accessible by keyboard and screen readers while matching the requested visual placement.
- Alternatives considered: icon-only button without state text (less accessible), menu-based theme picker (unnecessary complexity).

## Risks / Trade-offs

- [Theme flash on initial render] -> Mitigation: Apply resolved theme as early as possible during initial render effect and keep styling transitions subtle.
- [Insufficient contrast in one theme] -> Mitigation: Define theme tokens with explicit contrast checks for text, backgrounds, borders, and interactive states.
- [Browser privacy/storage restrictions] -> Mitigation: Fall back to runtime state if storage write/read fails; theme still remains usable for the session.
