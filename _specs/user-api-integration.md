# Spec for User API Integration

branch: claude/feature/user-api-integration

## Summary

Wire up citizen profile management and admin user management to the backend User API (`/api/v1/users`). Authentication is carried automatically via the `access_token` httpOnly cookie set during login.

**Citizen-facing endpoints** (profile page, account settings):

- `GET /v1/users/me` — fetch the authenticated user's profile
- `PATCH /v1/users/me` — update the authenticated user's profile
- `DELETE /v1/users/me` — soft-delete the authenticated user's own account

**Public endpoint** (landing page stats):

- `GET /v1/users/count` — retrieve the number of active citizens (no auth required)

**Admin-only endpoints** (admin user management panel):

- `GET /v1/users` — list all users (paginated, filterable)
- `GET /v1/users/{id}` — retrieve a single user by ID
- `PATCH /v1/users/{id}` — update a user's profile, role, or status
- `DELETE /v1/users/{id}` — soft-delete a user account
- `PATCH /v1/users/{id}/deactivate` — toggle a user's active/inactive status

All citizen and admin endpoints use RTK Query. Loading, error, and cache-invalidation state is handled at the query/mutation level. Success and error feedback is shown inline (not as browser alerts).

---

## Functional Requirements

### Citizen — Profile (`GET /v1/users/me`)

- On load of the citizen profile page, call `GET /v1/users/me` to populate the profile form fields: `firstName`, `lastName`, `phoneNumber`, `address`, `mfaEnabled`.
- Show a loading skeleton while the request is in-flight.
- On error, display an inline error message and a retry option.

### Citizen — Update Profile (`PATCH /v1/users/me`)

- The profile form accepts: `firstName`, `lastName`, `phoneNumber`, `address`, `mfaEnabled`.
- Validate all fields client-side before the mutation fires (React Hook Form + Zod).
- On submit, call `PATCH /v1/users/me` with the updated fields.
- Disable the submit button and show a loading indicator while the request is in-flight.
- On success, show a success message and invalidate the `getMe` cache tag to re-fetch fresh data.
- On error, display the API error message inline beneath the form submit button.

### Citizen — Delete Own Account (`DELETE /v1/users/me`)

- Provide a "Delete Account" action in account settings, behind a confirmation dialog.
- On confirmation, call `DELETE /v1/users/me`.
- On success, clear Redux auth state, remove the token, and redirect the user to `/`.
- On error, display an inline error message.

### Public — Active Citizen Count (`GET /v1/users/count`)

- Call `GET /v1/users/count` on the landing/home page to display the total number of active citizens in a stats section.
- No authentication required for this endpoint.
- On error, suppress the error silently and hide or zero out the stat.

### Admin — List Users (`GET /v1/users`)

- On load of the admin users management page, call `GET /v1/users` to populate a paginated, filterable user table.
- Support query parameters for pagination (e.g., `page`, `limit`) and filtering (e.g., by `role`, `status`).
- Show a loading skeleton while the request is in-flight.
- On error, display an inline error with a retry option.

### Admin — Get User by ID (`GET /v1/users/{id}`)

- On load of the admin user detail page, call `GET /v1/users/{id}` to populate the user detail view.
- Show a loading skeleton while the request is in-flight.
- On error (e.g., user not found / 404), display a "User not found" message.

### Admin — Update User (`PATCH /v1/users/{id}`)

- The admin edit form accepts: `firstName`, `lastName`, `phoneNumber`, `address`, `email`, `role` (citizen / admin), `status` (active / inactive).
- Validate all fields client-side before the mutation fires.
- On submit, call `PATCH /v1/users/{id}` with the updated fields.
- On success, show a success message and invalidate the relevant user cache tags.
- On error, display the API error message inline.

### Admin — Delete User (`DELETE /v1/users/{id}`)

- Provide a "Delete User" action in the admin user detail view, behind a confirmation dialog.
- On confirmation, call `DELETE /v1/users/{id}`.
- On success, redirect back to the admin users list and invalidate the user list cache.
- On error, display an inline error message.

### Admin — Toggle User Status (`PATCH /v1/users/{id}/deactivate`)

- Provide an "Activate / Deactivate" toggle in the admin user list and detail view.
- On toggle, call `PATCH /v1/users/{id}/deactivate`.
- On success, optimistically update the user status in the UI and invalidate cache.
- On error, revert the optimistic update and display an inline error.

### Shared / Cross-Cutting

- All endpoints are defined as RTK Query endpoints in `app/state/api.ts`.
- Add tag types: `Users`, `UserDetail`, `UserCount`.
- Define TypeScript types for all request payloads and responses in `app/types/user.ts`, re-exported from `app/types/index.ts`.
- All Zod schemas for citizen profile and admin user forms live in `lib/validators.ts`.
- The `use-auth.ts` hook's logout path must also clear auth state and redirect when the citizen deletes their own account.

---

## Possible Edge Cases

- `GET /v1/users/me` returns a 401 if the cookie has expired — redirect to `/login` and clear Redux auth state.
- `PATCH /v1/users/me` or `PATCH /v1/users/{id}` returns 409 if the email is already taken — surface as an inline field-level error.
- `DELETE /v1/users/me` or `DELETE /v1/users/{id}` — the API performs a soft delete; the record still exists but is inactive. Do not assume the record is permanently gone.
- `GET /v1/users` pagination — if the page requested exceeds total pages, display an empty state rather than an error.
- Admin attempting to delete or deactivate their own account via the admin panel — should be blocked or warned.
- Network timeout or offline state — all mutations should display a generic fallback error message.

---

## Acceptance Criteria

- Citizen profile page loads and pre-populates form fields from `GET /v1/users/me`.
- Submitting the citizen profile form with valid data calls `PATCH /v1/users/me` exactly once and shows a success message on completion.
- Submitting the citizen profile form with invalid data does not fire the API call.
- Confirming account deletion calls `DELETE /v1/users/me`, clears auth state, and redirects to `/`.
- The landing page stats section displays the value returned by `GET /v1/users/count`.
- Admin users list page loads and displays paginated results from `GET /v1/users`.
- Admin user detail page loads user data from `GET /v1/users/{id}`.
- Admin edit form calls `PATCH /v1/users/{id}` on submit and invalidates the correct cache tags.
- Admin delete action calls `DELETE /v1/users/{id}`, redirects to the users list, and invalidates cache.
- Admin status toggle calls `PATCH /v1/users/{id}/deactivate` and updates the UI on success.
- API errors are shown as inline messages — not browser alerts or toasts.
- All in-flight mutations disable their submit/action button and show a loading indicator.

---

## Open Questions

- What is the exact shape of the response for `GET /v1/users/me`? (e.g., `{ success, message, data: { id, firstName, lastName, ... } }`) yes
- What query parameters does `GET /v1/users` accept for pagination and filtering? (e.g., `page`, `limit`, `role`, `status`, `search`) page, limit, role, status, search
- Does `GET /v1/users/count` return `{ count: number }` or a different shape? {success: boolean, count: number}
- Does `PATCH /v1/users/{id}/deactivate` toggle the status automatically, or does it require a body indicating the desired state? automatically
- Are any of the admin endpoints restricted by role server-side (returning 403)? How should the UI respond to a 403? - no UI implemetation yet

---

## Testing Guidelines

Create test files in `./tests/` for the following cases:

- **`GET /v1/users/me`** — profile page renders loading skeleton while query is in-flight; profile form is populated with fetched data on success; inline error is shown on query failure.
- **`PATCH /v1/users/me`** — form validation prevents submission when fields are invalid; submit button is disabled while mutation is pending; success message appears and cache is invalidated on success; inline error appears on mutation failure.
- **`DELETE /v1/users/me`** — confirmation dialog is shown before deletion; mutation is not called if user cancels; auth state is cleared and redirect happens on success.
- **`GET /v1/users/count`** — count value is rendered on the landing page; stat is hidden or zeroed on error.
- **Admin user list** — renders paginated table from `GET /v1/users`; shows empty state on empty page; shows error with retry on failure.
- **Admin user detail** — renders user fields from `GET /v1/users/{id}`; shows "User not found" on 404.
- **Admin edit user** — calls `PATCH /v1/users/{id}` with correct payload; shows success on completion; shows inline error on failure.
- **Admin delete user** — calls `DELETE /v1/users/{id}` after confirmation; redirects and invalidates cache on success.
- **Admin deactivate toggle** — calls `PATCH /v1/users/{id}/deactivate` on toggle; reverts UI on error.

## Implementation Scope Limitation (Phase 1 — API Layer Only)

This phase focuses **only on preparing the API integration layer** for the User API.  
The goal is to establish a complete **RTK Query API setup and supporting types** so that UI components can easily consume these endpoints in later development phases.

### Important

During this phase, **do not create or modify any UI components or pages**.  
This task must strictly implement **API infrastructure only**.

### Explicit Restrictions

The implementation **must NOT**:

- Create or modify React pages
- Create or modify UI components
- Implement forms
- Implement dialogs or confirmation modals
- Add loading skeleton components
- Add toast notifications or alerts
- Add layout or styling changes
- Add navigation or routing changes
- Add any visual UI logic

All work should be limited to **API endpoints, TypeScript types, and validation schemas**.
