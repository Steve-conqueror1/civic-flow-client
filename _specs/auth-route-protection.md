# Spec for Auth Route Protection

branch: claude/feature/auth-route-protection

## Summary

The signup and login flows are already implemented. This spec covers protecting routes that require authentication and/or specific roles (citizen vs admin), as well as silently refreshing expired access tokens using the existing refresh token endpoint. Unauthenticated users attempting to visit protected routes should be redirected to login. Authenticated non-admin users attempting to visit admin routes should be redirected to the citizen dashboard.

## Functional Requirements

- Any route under `/dashboard` must be accessible only to authenticated users. Unauthenticated visitors are redirected to `/login`.
- Admin-only routes (e.g. `/dashboard/review`, `/dashboard/reports`, `/dashboard/insights`, `/dashboard/users`) must be accessible only to users with role `admin` or `super_admin`. Citizens who reach these routes are redirected to `/dashboard`.
- On every authenticated page load, the app should verify the current session by calling `GET /v1/auth/me`. If the call returns `401`, attempt a silent token refresh via `POST /v1/auth/refresh` before redirecting to login.
- If the refresh succeeds, the original navigation should continue seamlessly without any visible interruption.
- If the refresh fails (invalid or revoked refresh token), the user is redirected to `/login` and any cached auth state is cleared.
- After a successful login, users are redirected to `/dashboard`. After logout, users are redirected to `/login`.
- Public routes (home page, services browse, contact, auth pages) remain fully accessible to unauthenticated users.
- The `useAuth` hook (`app/hooks/use-auth.ts`) should expose: `user`, `isAuthenticated`, `isLoading`, `role`, and a `logout` action.
- Role information must be derived from the user object returned by `GET /v1/auth/me`, which includes a `role` field (`citizen`, `admin`, `super_admin`).

## Possible edge cases (only if referenced)

- Refresh token is expired or revoked — must clear session and redirect to login without an infinite retry loop.
- Concurrent requests fired while a token refresh is in-flight — should queue behind the single refresh call rather than each triggering their own refresh.
- User with `admin` role navigates to a `super_admin`-only route (if such routes are introduced later) — current spec treats `admin` and `super_admin` as equivalent for access control.
- Browser back/forward navigation after logout should not expose protected page content (rely on server-side redirect or revalidation rather than cached HTML).

## Acceptance Criteria

- Navigating to `/dashboard` while unauthenticated redirects to `/login`.
- Navigating to `/dashboard/reports` (or any other admin route) as a `citizen` redirects to `/dashboard`.
- A user with a valid session visiting `/dashboard` sees their dashboard without any redirect.
- An `admin` user visiting `/dashboard/reports` sees the page without redirect.
- When the access token is expired but the refresh token is valid, the app transparently renews the token and renders the requested page.
- When both tokens are invalid, the user is sent to `/login` and stale auth state is cleared from the Redux store.
- `useAuth` correctly reports `isLoading: true` during the initial session check and `isLoading: false` once resolved.
- Logout clears auth cookies (via `POST /v1/auth/logout`) and resets the Redux auth state.

## Open Questions

- Should middleware (Next.js `middleware.ts`) handle redirects server-side, or should a client-side auth wrapper component handle them? Server-side middleware avoids flash of protected content but cannot access cookie-authenticated RTK Query state directly. yes
- Which routes are considered admin-only vs citizen-only? Need a confirmed list before implementation. Just expose functionality and only use in `/dashboard` page only for now
- Should failed auth redirect preserve the originally requested URL as a `?redirect=` param so users land back after login? yes

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- `useAuth` returns `isAuthenticated: false` and `user: null` when no session exists.
- `useAuth` returns the correct `user` and `role` when a valid session is present.
- `useAuth` triggers a refresh when `GET /v1/auth/me` returns `401` and the refresh succeeds.
- `useAuth` clears state and signals unauthenticated when both the me call and refresh fail.
- A protected route wrapper redirects to `/login` when `isAuthenticated` is false.
- An admin-only route wrapper redirects to `/dashboard` when the user role is `citizen`.
