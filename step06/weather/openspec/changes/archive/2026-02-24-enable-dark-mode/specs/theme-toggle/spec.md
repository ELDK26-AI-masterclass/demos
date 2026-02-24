## ADDED Requirements

### Requirement: User theme switch control
The frontend SHALL provide a user-visible theme switch control in the top-right corner of the main application UI that allows selecting between light and dark mode.

#### Scenario: Toggle is visible and operable
- **WHEN** the application UI is loaded
- **THEN** a theme switch control is shown in the top-right corner and can be operated with mouse and keyboard

### Requirement: Theme application behavior
The frontend SHALL apply visual theme tokens for both light and dark modes across page background, text, and primary interactive elements.

#### Scenario: Switching to dark mode updates styling
- **WHEN** the user enables dark mode using the switch
- **THEN** the application updates to dark theme styles without requiring page reload

#### Scenario: Switching to light mode updates styling
- **WHEN** the user disables dark mode using the switch
- **THEN** the application updates to light theme styles without requiring page reload

### Requirement: Theme preference persistence
The frontend SHALL persist the user-selected theme mode locally and restore it on subsequent visits.

#### Scenario: Stored preference is restored
- **WHEN** a user previously selected a theme and later reloads the page
- **THEN** the application initializes with the same selected theme

### Requirement: Initial fallback to system preference
The frontend SHALL use the browser system color scheme preference only when no stored user theme preference exists.

#### Scenario: No stored preference uses system dark mode
- **WHEN** no theme preference is stored and the system preference is dark
- **THEN** the application initializes in dark mode

#### Scenario: No stored preference uses system light mode
- **WHEN** no theme preference is stored and the system preference is light
- **THEN** the application initializes in light mode
