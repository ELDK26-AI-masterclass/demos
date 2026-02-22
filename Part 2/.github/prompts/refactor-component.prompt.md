---
description: Agentic workflow: safely refactor a Threadly React component. Analyses the component for quality issues, proposes a plan, waits for approval, then implements and verifies the changes.
---

# Refactor Component

**Goal**: Improve the quality, readability, and type-safety of an existing
Threadly component — without breaking its behaviour.

---

## Input

| Input           | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| `componentPath` | Relative path to the component, e.g. `src/components/ProductCard.tsx` |

If not provided, ask the user which component to refactor.

---

## Steps

### 1 · Read and analyse

Read `componentPath` in full.

Flag every instance of:

- `any` type usage
- Inline `style={}` props (violates Threadly conventions)
- Direct `fetch()` calls (should go through `src/lib/`)
- Missing error boundaries around AI output
- Props that aren't typed with a named interface

### 2 · Load relevant instructions

Load `threadly.instructions.md` to confirm which rules apply.
If the component is under `src/features/ai/`, also load `threadly-ai.instructions.md`.

### 3 · Propose a refactor plan

Present a numbered list of changes:

```

1. Extract prop interface <ComponentNameProps>
2. Replace style={{...}} on line N with Tailwind classes
3. Move fetch call to src/lib/api.ts
   ...

```

**Stop here and ask**: "Should I proceed with all changes, or would you like to
skip any?"

### 4 · Implement approved changes

Apply each approved change.

- Make one logical change at a time — do not bundle unrelated edits.
- Preserve all existing behaviour (no logic changes unless that was the stated goal).

### 5 · Verify

Run these checks in order:

1. `pnpm typecheck` — must pass with 0 errors
2. `pnpm lint` — must pass with 0 new warnings

If any check fails, fix the issue before reporting done.

### 6 · Summarise

Report:

- Number of issues fixed
- Lines changed (before / after)
- Any issues you deliberately skipped and why