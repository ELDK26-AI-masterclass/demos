## Why

The frontend currently only supports a single visual theme, which limits accessibility and user comfort across lighting conditions. Adding an explicit light/dark switch improves usability and matches common user expectations for modern web apps.

## What Changes

- Add a user-facing theme switch in the top-right corner of the frontend UI.
- Implement light and dark theme styles using shared CSS variables.
- Apply theme state across the app by toggling a root-level theme attribute/class.
- Persist the selected theme in browser storage so the preference survives refreshes.
- Default to the system theme when no user preference has been stored yet.

## Capabilities

### New Capabilities
- `theme-toggle`: Allow users to switch between light and dark themes from the UI and persist their preference.

### Modified Capabilities
- None.

## Impact

- Affected code: `src/frontend/src/App.tsx`, `src/frontend/src/App.css`, and potentially `src/frontend/src/index.css` for global theme variables.
- APIs: No backend API contract changes.
- Dependencies: No new npm or NuGet dependencies required.
- Systems: Frontend behavior and styling only; AppHost and backend remain unchanged.
