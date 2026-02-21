# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There are no tests configured yet.

## Environment

Requires `NEXT_PUBLIC_API_BASE_URL` to be set for API calls to work.

## Architecture

**CivicFlow** is an AI-enabled public service request platform for Alberta citizens, built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Route Groups

The app uses Next.js route groups to organize three distinct user experiences:

- `app/(public)/` — unauthenticated landing and services browsing
- `app/(auth)/` — login, register, MFA
- `app/(citizen)/` — authenticated citizen dashboard, request submission/tracking, messages, profile
- `app/(admin)/` — admin dashboard, request review (`[id]`), reports, insights, user management
- `app/preview/` — component sandbox for UI development

### State Management

Redux Toolkit is set up in `app/state/`:
- `app/state/index.ts` — global Redux slice (currently empty, add reducers here)
- `app/state/api.ts` — RTK Query API slice with `NEXT_PUBLIC_API_BASE_URL` as base URL; add endpoints here with tag types for cache invalidation
- `app/state/redux.tsx` — store configuration and typed hooks (`useAppDispatch`, `useAppSelector`); the `StoreProvider` wraps the app via `app/providers.tsx`

### Custom Hooks (stubs — implement these)

- `app/hooks/use-auth.ts` — authentication state/actions
- `app/hooks/use-ai-assistant.ts` — AI assistant integration
- `app/hooks/use-request-wizard.ts` — multi-step service request form
- `app/hooks/use-mobile.ts` — responsive breakpoint detection

### UI

- **shadcn/ui** is the primary component library (imported via `shadcn/tailwind.css`)
- **Base UI** and **Radix UI** available for headless primitives
- **Mapbox GL** is installed for location-based features (e.g., request map pins)
- **React Hook Form** for form management
- **Lucide React** for icons
- `clsx` + `tailwind-merge` + `class-variance-authority` for conditional class utilities

### Styling

Tailwind CSS v4 uses CSS-first configuration (no `tailwind.config.js`). All theme tokens are defined in `app/globals.css` using `@theme inline`. Custom CivicFlow utilities defined there:
- `.text-display` — hero/display text (2.25rem, bold, tight)
- `.text-meta` — small metadata text (0.875rem, muted)
- `.code-id` — monospace tracking-wide for request IDs

Dark mode is class-based (`.dark`), toggled by adding the class to an ancestor element.

### Path Alias

`@/*` resolves to the repo root (e.g., `@/app/state/redux` or `@/components/ui/button`).
