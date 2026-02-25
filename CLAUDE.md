# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run Vitest once (CI mode)
npx vitest       # Run Vitest in watch mode
```

To run a single test file:

```bash
npx vitest tests/components/AppNavbar.test.tsx
```

Docker convenience scripts:

```bash
npm run docker:dev   # Start dev environment with HMR
npm run docker:prod  # Start production container (uses .env.prod)
npm run docker:down  # Stop all containers
npm run docker:logs  # Tail container logs
```

## Environment

Requires `NEXT_PUBLIC_API_BASE_URL` to be set for API calls to work. Dev values live in `.env`; production values in `.env.prod`.

## Architecture

**CivicFlow** is an AI-enabled public service request platform for Alberta citizens, built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

### Route Groups

The app uses Next.js route groups to organize distinct user experiences:

- `app/(public)/` — unauthenticated landing and services browsing; has its own `layout.tsx` wrapping pages with `AppNavbar` and `AppFooter`
- `app/(auth)/` — login, register, MFA
- `app/(citizen)/` — authenticated citizen dashboard, request submission/tracking, messages, profile
- `app/(admin)/` — admin dashboard, request review (`[id]`), reports, insights, user management
- `app/preview/` — component sandbox for UI development

### Component Organization

Components live in `components/` (not `app/`):

- `components/ui/` — shadcn/ui base primitives (Button, Card, Input, Select, etc.)
- `components/AppNavbar/` and `components/AppFooter/` — global layout components; each exported via an `index.ts` barrel
- `components/shared/` — reusable cross-feature components (e.g. `BrandLogo`)
- `components/dashboard/`, `components/forms/`, `components/layouts/`, `components/maps/` — domain-specific components (stubs to implement)

### Domain Types

`app/types/` holds shared TypeScript interfaces:

- `app/types/request.ts` — service request model
- `app/types/user.ts` — user/citizen model

### State Management

Redux Toolkit is set up in `app/state/`:

- `app/state/index.ts` — global Redux slice (currently empty; add reducers here)
- `app/state/api.ts` — RTK Query API slice using `NEXT_PUBLIC_API_BASE_URL`; add endpoints here with tag types for cache invalidation
- `app/state/redux.tsx` — store config and typed hooks (`useAppDispatch`, `useAppSelector`); the `StoreProvider` wraps the app via `app/providers.tsx`

**TanStack Query** (`@tanstack/react-query`) is also installed and available for server-state that doesn't need RTK Query.

### Custom Hooks (stubs — implement these)

- `app/hooks/use-auth.ts` — authentication state/actions
- `app/hooks/use-ai-assistant.ts` — AI assistant integration
- `app/hooks/use-request-wizard.ts` — multi-step service request form
- `app/hooks/use-mobile.ts` — responsive breakpoint detection

### UI

- **shadcn/ui** is the primary component library
- **Mapbox GL** for location-based features
- **React Hook Form** + **Zod** (`lib/validators.ts`) for form management and validation
- **Lucide React** for icons
- `cn()` in `lib/utils.ts` (`clsx` + `tailwind-merge`) for conditional class merging

### Styling

Tailwind CSS v4 uses CSS-first configuration — no `tailwind.config.js`. All theme tokens are defined in `app/globals.css` using `@theme inline`. Color values use hex (not oklch).

Key theme tokens:
- `--primary`: `#1985f0` (Civic Blue)
- `--primary-dark`: `#106ac5` (hover state)
- Dark mode backgrounds: `#101922` (page), `#111a22` (card/surface)

Custom utilities defined in `globals.css`:
- `.container` — `max-w-7xl mx-auto px-4 md:px-10`
- `.text-display` — hero/display text (2.25rem, bold, tight)
- `.text-meta` — small metadata text (0.875rem, muted)
- `.code-id` — monospace tracking-wide for request IDs

Dark mode is class-based (`.dark`), toggled by adding the class to an ancestor element.

### Path Alias

`@/*` resolves to the repo root (e.g., `@/app/state/redux` or `@/components/ui/button`).

### Testing

Vitest with `jsdom` environment. Tests live in `tests/` and mirror the `components/` structure. The setup file `vitest.setup.ts` imports `@testing-library/jest-dom` globally.

Use `@testing-library/react` (`render`, `screen`) and `@testing-library/user-event` for component tests. No explicit imports needed for `describe`/`it`/`expect` — they are global.

### Feature Specs

`_specs/` stores feature specification documents. Use `_specs/template.md` when writing a new spec. Specs define branch naming, functional requirements, acceptance criteria, and testing guidelines before implementation begins.

## Checking Documentation

**Important:** When implementing any lib/framework-specific features, ALWAYS check the appropriate documentation using the Context7 MCP server before writing code.
