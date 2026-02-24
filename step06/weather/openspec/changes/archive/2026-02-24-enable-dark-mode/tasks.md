## 1. Frontend Theme State

- [x] 1.1 Add typed theme mode state (`light`/`dark`) in `src/frontend/src/App.tsx`.
- [x] 1.2 Implement initial theme resolution from `localStorage`, falling back to `prefers-color-scheme` when no stored preference exists.
- [x] 1.3 Apply the active theme to the document root using a stable selector (for example `data-theme`).
- [x] 1.4 Persist user theme changes to `localStorage` and handle storage read/write fallback safely.

## 2. Theme Switch UI

- [x] 2.1 Add a top-right theme switch control in `src/frontend/src/App.tsx` with semantic label and keyboard accessibility.
- [x] 2.2 Wire switch interactions to toggle theme state without page reload.
- [x] 2.3 Ensure switch state reflects the currently active theme after initialization.

## 3. Theme Styling

- [x] 3.1 Define shared CSS variables for light and dark tokens in `src/frontend/src/index.css` and/or `src/frontend/src/App.css`.
- [x] 3.2 Update app styles to consume theme variables for background, text, and primary interactive elements.
- [x] 3.3 Add subtle theme transition behavior that does not block interaction.

## 4. Validation and Non-Regression Checks

- [x] 4.1 Run frontend lint/build to validate TypeScript and styling changes.
- [ ] 4.2 Manually verify scenarios from `specs/theme-toggle/spec.md` (visibility, toggle behavior, persistence, and system fallback).
- [x] 4.3 Confirm `/api` routing, Vite proxy behavior, and Aspire AppHost wiring remain unchanged by this frontend-only change.
