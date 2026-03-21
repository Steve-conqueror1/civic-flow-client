# Plan: Navbar Auth Links

## Context

The AppNavbar currently shows hardcoded "Sign In" and "Register" links regardless of authentication state. Authenticated users should instead see a plain "Dashboard" nav link and a secondary-styled "Logout" button. The middleware already protects routes; this change makes the navbar reflect the actual auth state for a coherent UX.

## Critical Files

- `components/AppNavbar/AppNavbar.tsx` — only file to modify
- `tests/components/AppNavbar/AppNavbar.test.tsx` — new test file to create

## Implementation Steps

### 1. Update `AppNavbar.tsx`

**Remove** "Sign In" from the static `navLinks` array — it will be rendered conditionally instead.

**Import** `useAuth` from `@/app/hooks/use-auth` and destructure `{ isAuthenticated, isLoading, logout }`.

**Desktop nav** — after the static nav links, render conditionally:

- `isLoading` → render nothing (prevents flash)
- `isAuthenticated` → render a plain `<Link href="/dashboard">Dashboard</Link>` styled like the other nav links, plus a `<button onClick={logout}>Logout</button>` styled as secondary (border, text-primary, hover:bg-slate-100 dark:hover:bg-slate-800, cursor-pointer)
- Not authenticated → render `<Link href="/login">Sign In</Link>` styled like other nav links, plus the existing `<Link href="/register">Register</Link>` primary button

**Mobile dropdown** — same conditional logic, with the same styles adapted for the vertical mobile layout.

### 2. Create `tests/components/AppNavbar/AppNavbar.test.tsx`

Mock `@/app/hooks/use-auth` with `vi.mock`. For each test, control `isAuthenticated`, `isLoading`, and a mock `logout` function.

Tests:

1. Renders Sign In link and Register link when not authenticated (`isAuthenticated: false, isLoading: false`)
2. Renders Dashboard link and Logout button when authenticated (`isAuthenticated: true, isLoading: false`)
3. Does not render Sign In, Register, Dashboard, or Logout while `isLoading: true`
4. Clicking Logout button calls the `logout` handler

Use the existing `renderWithProviders` utility from `tests/utils/render-with-providers.tsx`. Mock `next/navigation` for `useRouter`.

## Verification

- Run `npx vitest tests/components/AppNavbar/AppNavbar.test.tsx` — all 4 tests should pass
- Visually: unauthenticated users see Sign In + Register; log in and Dashboard + Logout appear in place
- Clicking Logout redirects to `/login` and clears auth state
