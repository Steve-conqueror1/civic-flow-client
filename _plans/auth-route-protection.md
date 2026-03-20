# Plan: Auth Route Protection

## Context

The signup and login flows are fully implemented, but `/dashboard` and its sub-routes are currently unprotected — any visitor can access them. The goal is to guard all `/dashboard/*` routes so only authenticated users can enter, redirect unauthenticated visitors to `/login?redirect=<original-path>`, silently refresh expired access tokens before giving up, and redirect back to the original destination after a successful login.

Role-based admin restrictions are explicitly out of scope for this iteration — all authenticated users can access all dashboard pages for now.

Spec: `_specs/auth-route-protection.md`

---

## Approach

Two complementary layers:

1. **`middleware.ts`** (new, repo root) — fast, server-side cookie check. Redirects to `/login?redirect=<path>` immediately if `access_token` cookie is absent, preventing any dashboard HTML from being served to unauthenticated visitors.

2. **Client-side session validation in `app/dashboard/layout.tsx`** — calls `GET /v1/auth/me` on mount. If `401`, attempts `POST /v1/auth/refresh` before retrying. If refresh fails, clears Redux state and redirects to `/login?redirect=<path>`. Shows a loading state while in-flight.

---

## Files to Create / Modify

### 1. `middleware.ts` (new — repo root)

- Match all `/dashboard/:path*` routes via `config.matcher`
- Read `access_token` cookie with `request.cookies.get('access_token')`
- If absent → `NextResponse.redirect` to `/login?redirect=<encoded-original-path>`
- If present → `NextResponse.next()`

### 2. `app/hooks/use-auth.ts` (modify)

- Add `refreshAndRetry` internal function: on `401` from `/v1/auth/me`, call `POST /v1/auth/refresh` (credentials: include), then retry `/v1/auth/me`. On refresh failure, dispatch `clearAuth()` and re-throw.
- Wire `refreshAndRetry` into `fetchCurrentUser` on 401 response.
- Export `isLoading` directly (currently only available as `currentUserQuery.isLoading`).
- Ensure `logout()` calls `router.push('/login')` after clearing state.

Reuse:

- `setAuthUser`, `clearAuth` from `app/state/authSlice.ts`
- `API_BASE_URL` constant already in the file

### 3. `app/dashboard/layout.tsx` (modify)

- Add `"use client"` directive
- Consume `isLoading`, `isAuthenticated`, `currentUserQuery` from `useAuth`
- While `isLoading` → render a loading spinner/skeleton
- If `!isAuthenticated` after load → `router.push('/login?redirect=' + encodeURIComponent(pathname))`
- If authenticated → render children normally

### 4. `app/(auth)/login/page.tsx` (modify)

- Read `?redirect` query param with `useSearchParams()`
- After successful login, `router.push(redirectParam ?? '/dashboard')`

---

## Data Flow

```
User visits /dashboard/reports
        │
        ▼
middleware.ts
  access_token cookie absent? ──► /login?redirect=/dashboard/reports
  access_token cookie present?
        │
        ▼
Dashboard layout mounts → useAuth → GET /v1/auth/me
        │
   200 OK ─────────────────────────────────────► render dashboard
        │
   401 → POST /v1/auth/refresh
              │
         200 → retry GET /v1/auth/me ──────────► render dashboard
              │
         fail → clearAuth() → /login?redirect=…
```

---

## Reference Files (read before implementing)

- `app/state/authSlice.ts` — `setAuthUser`, `clearAuth` actions and selectors
- `app/state/api.ts` — check if a `refresh` endpoint already exists; if so, use it instead of plain `fetch`
- `types/auth.ts` — `AuthUser`, `Role` types

---

## Verification Checklist

1. Private window → `/dashboard` → lands on `/login?redirect=%2Fdashboard`
2. Log in → redirects back to original destination
3. DevTools: clear only `access_token` cookie, navigate to dashboard → loads without redirect (silent refresh)
4. DevTools: clear both cookies, navigate to `/dashboard` → middleware redirects to `/login`
5. Logout → lands on `/login`; back-button does not expose dashboard content
6. `npx vitest tests/hooks/use-auth.test.ts`

## Important

- Expose Role-based admin restrictions for later implementation in the pages
