# Copilot instructions

These instructions define how GitHub Copilot (and other AI coding assistants) must behave when generating code for this solution. Generated code must follow the actual project structure and conventions in `src`.

---

## Solution context

This repository currently contains a .NET Aspire starter-style solution:

- `src/AddSample.AppHost`: .NET Aspire AppHost (orchestration)
- `src/AddSample.Server`: ASP.NET Core (`net10.0`) minimal API service
- `src/frontend`: React 19 + TypeScript + Vite frontend

Communication between frontend and backend is REST over `/api`.

---

## Architecture overview

### AppHost (`AddSample.AppHost`)
Responsibilities:
- Define the distributed application topology
- Wire service dependencies (Redis, backend, frontend)
- Configure startup order and health checks

Rules:
- Keep orchestration in `AppHost.cs`
- Use Aspire resource references (`WithReference`, `WaitFor`) instead of hardcoded addresses
- Keep resource names stable unless explicitly requested

### Backend service (`AddSample.Server`)
Responsibilities:
- Expose HTTP endpoints under `/api`
- Handle request/response contracts
- Provide health, telemetry, and resilience defaults through shared extensions

Rules:
- Use minimal APIs (current style), not MVC controllers unless requested
- Keep endpoint handlers small and readable
- Move non-trivial logic into focused services/classes rather than bloating `Program.cs`
- Use `AddProblemDetails` and centralized exception handling (`UseExceptionHandler`)

### Frontend (`frontend`)
Responsibilities:
- Render UI with React + TypeScript
- Call backend through relative `/api` routes
- Keep client-side concerns in frontend only

Rules:
- Keep API calls frontend-only through REST; do not introduce direct infrastructure access
- Preserve Vite proxy behavior in `vite.config.ts`
- Prefer typed models/interfaces for API responses

---

## Backend rules

- Target framework is `net10.0`
- Prefer built-in ASP.NET Core and Microsoft extensions first
- Use `System.Text.Json` (do not introduce `Newtonsoft.Json` without approval)
- Keep OpenAPI exposure development-only unless explicitly requested otherwise
- Preserve output caching behavior when editing cacheable endpoints
- Keep health endpoints aligned with Aspire defaults (`/health`, `/alive` in development)

### Async and performance

- Use async APIs for I/O-bound work
- Do not block async calls (`.Result`, `.Wait()`)
- Pass `CancellationToken` in new async endpoints/services where practical

### Dependency injection

- Register service dependencies explicitly
- Use constructor injection
- Choose service lifetimes intentionally (`Scoped` for request-bound logic by default)

---

## Frontend rules

- Stack: React 19, TypeScript 5.9, Vite 7, ESLint 9
- Use functional components and hooks
- Keep strict typing on API data and component state
- Maintain accessibility basics already present (labels, aria attributes, semantic elements)
- Do not hardcode backend host/port in components; rely on `/api` + Vite proxy/AppHost wiring

---

## API and contract updates

- Keep backend routes grouped under `/api`
- Use meaningful HTTP status codes and clear error payloads
- When adding or changing endpoints, update `src/AddSample.Server/AddSample.Server.http`
- Ensure sample HTTP requests still represent current endpoint behavior

---

## Dependency policy

- Prefer existing dependencies already used in the solution
- Prefer Microsoft packages in backend where feasible
- Ask before introducing new third-party NuGet or npm packages

---

## Code quality expectations

- Favor clarity over cleverness
- Keep methods focused and easy to test
- Keep naming descriptive and consistent
- Avoid large, cross-cutting refactors unless requested
- If a requested change conflicts with current project style, ask before switching patterns

---

## When in doubt

- Align with the code that exists in `src` today
- Keep changes minimal and incremental
- Ask before introducing new architectural patterns or framework shifts
