# Spec for Auth API Integration - Register and Login

branch: claude/feature/auth-api-register-login

## Summary

Wire up the existing `RegisterForm` and `LoginForm` components to their respective backend API endpoints. Registration calls `POST /api/v1/auth/register` and login calls `POST /api/v1/auth/login`. Server state (API calls, loading, error, and retry) is managed with **React Query** (`useMutation`). Authenticated user state, role, and auth-related UI flags are stored in the **Redux global slice**.

On successful login, the server response (user object + access token) is persisted to the Redux store and the user is redirected to the citizen dashboard. On successful registration, the user is redirected to login (or directly authenticated, pending API contract). On failure, inline form-level error messages are displayed beneath the submit button.

---

## Functional Requirements

### Registration (`/register` → `POST /api/v1/auth/register`)

- Collect `firstName`, `lastName`, `phone`, `email`, `address`, `password`, and `terms` from the existing `RegisterForm`.
- Validate all fields client-side before the mutation fires (existing React Hook Form rules plus Zod schema via `lib/validators.ts`).
- On submit, call `POST /api/v1/auth/register` with the form payload (exclude `terms` from the request body; it is a client-only consent flag).
- While the request is in-flight, disable the submit button and show a loading indicator.
- On success, inform the user that an email verification link has been send to his/her email, then redirect the user to `/login`
- On error, surface the API error message as a form-level inline error (not a toast) beneath the submit button.
- Do not clear the form on error so the user can correct their input.

### Login (`/login` → `POST /api/v1/auth/login`)

- Collect `email` and `password` from the existing `LoginForm`.
- Validate fields client-side before the mutation fires.
- On submit, call `POST /api/v1/auth/login` with `{ email, password }`.
- While the request is in-flight, disable the submit button and show a loading indicator.
- On success:
  - Decode and store the authenticated user object and access token in the Redux `global` slice (`authUser`, `token`, `role`).
  - Persist the token to `localStorage` (or `httpOnly` cookie if the API sets one — coordinate with backend).
  - Redirect the user to `/dashboard`.
- On error (invalid credentials, account not found, etc.), surface the API error message as a form-level inline error beneath the submit button.

### Shared / Cross-Cutting

- Create a dedicated `authSlice` in `app/state/` (separate from `globalSlice`) to own auth state: `authUser`, `token`, `role`, `isAuthenticated`.
- Export typed selectors (`selectAuthUser`, `selectIsAuthenticated`, `selectRole`) from the slice.
- Implement the `use-auth.ts` hook stub to expose `{ user, role, isAuthenticated, login, logout, register }` using `useAppSelector` and `useAppDispatch`.
- React Query mutations should use `@tanstack/react-query` (`useMutation`) — do **not** use RTK Query for these auth endpoints.
- Define request/response TypeScript types for both endpoints in `types/auth.ts` and re-export from `types/index.ts`.
- All Zod validation schemas for auth forms live in `lib/validators.ts`.

---

## Possible Edge Cases

- API returns a generic 500 error — display a fallback "Something went wrong. Please try again." message.
- Duplicate email on registration — API returns 409; surface as "An account with this email already exists."
- Network timeout or offline state — mutation `onError` should catch and display a network error message.
- User navigates back to `/login` while already authenticated — redirect to `/dashboard`.
- Token expiry handling is out of scope for this spec (covered in a future session/token-refresh spec).

---

## Acceptance Criteria

- Submitting the registration form with valid data calls `POST /api/v1/auth/register` exactly once and redirects on success.
- Submitting the login form with valid credentials calls `POST /api/v1/auth/login`, stores `authUser` and `token` in Redux, and redirects to `/dashboard`.
- Submitting either form with invalid data does not fire the API call — client-side validation catches errors first.
- API error responses are displayed as inline form-level error messages (not browser alerts or toasts).
- The submit button is disabled and shows a loading state during an in-flight mutation.
- `useAppSelector(selectIsAuthenticated)` returns `true` after a successful login.
- `useAppSelector(selectAuthUser)` returns the user object after a successful login.
- Refreshing the page after login restores auth state from `localStorage` (token rehydration).
- The `use-auth.ts` hook's `logout` action clears Redux auth state and removes the token from storage.

---

## Open Questions

- Does `POST /api/v1/auth/register` return an access token on success, or does it require the user to log in separately? (Affects post-registration redirect logic.). Sends a email with a verification link. Upon verification, the user is able to login
- Should the access token be stored in `localStorage` or does the API set an `httpOnly` cookie? (Affects token persistence strategy.). API sets `httpOnly` cookie
- What is the exact shape of the success response for `/api/v1/auth/login`? (e.g., `{ user: {...}, accessToken: string }`) {"success":boolean, "message":string, {"data":{}}}
- Are there rate-limiting or lockout responses (e.g., 429 Too Many Requests) we need to handle in the UI? NO

---

## Testing Guidelines

Create test files in `./tests/components/auth/` and `./tests/hooks/` for the following cases:

- **RegisterForm** — renders without crashing; shows validation errors when submitted empty; disables button while `isPending`; displays an API error message returned from a mocked mutation.
- **LoginForm** — renders without crashing; shows validation errors when submitted empty; disables button while `isPending`; dispatches `setAuthUser` and redirects on a mocked successful response; displays an inline error on a mocked failure response.
- **authSlice** — `setAuthUser` action stores user and sets `isAuthenticated: true`; `clearAuth` action resets state to initial values.
- **use-auth hook** — `isAuthenticated` reflects Redux state; `logout` dispatches `clearAuth` and removes token from storage.
