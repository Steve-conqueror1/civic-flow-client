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

## Environment

Requires `NEXT_PUBLIC_API_BASE_URL` to be set for API calls to work.

## Architecture

**CivicFlow** is an AI-enabled public service request platform for Alberta citizens, built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 and Shadcn.

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
- `components/dashboard/`, `components/forms/`, `components/layouts/`, `components/maps/`, `components/shared/` — domain-specific components (mostly stubs to implement)

### State Management

Redux Toolkit is set up in `app/state/`:

- `app/state/index.ts` — global Redux slice (currently empty; add reducers here)
- `app/state/api.ts` — RTK Query API slice using `NEXT_PUBLIC_API_BASE_URL`; add endpoints here with tag types for cache invalidation
- `app/state/redux.tsx` — store config and typed hooks (`useAppDispatch`, `useAppSelector`); the `StoreProvider` wraps the app via `app/providers.tsx`

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

Tailwind CSS v4 uses CSS-first configuration — no `tailwind.config.js`. All theme tokens are defined in `app/globals.css` using `@theme inline`. Custom CivicFlow utilities:

- `.text-display` — hero/display text (2.25rem, bold, tight)
- `.text-meta` — small metadata text (0.875rem, muted)
- `.code-id` — monospace tracking-wide for request IDs

Dark mode is class-based (`.dark`), toggled by adding the class to an ancestor element.

### Path Alias

`@/*` resolves to the repo root (e.g., `@/app/state/redux` or `@/components/ui/button`).

### Testing

Vitest with `jsdom` environment. Tests live in `tests/` and mirror the `components/` structure. The setup file `vitest.setup.ts` imports `@testing-library/jest-dom` globally.

Use `@testing-library/react` (`render`, `screen`) and `@testing-library/user-event` for component tests. No explicit imports needed for `describe`/`it`/`expect` — they are global.
