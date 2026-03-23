# Plan: Dashboard User Profile

branch: claude/feature/dashboard-user-profile
spec: \_specs/dashboard-user-profile.md

## Context

The dashboard sidebar currently uses a hardcoded placeholder user object in `AppSidebar.tsx` and has a non-functional logout button in `NavUser.tsx`. This feature wires both up to the real auth system: displaying the authenticated user's name and email from the Redux store (populated by `/auth/me`), and connecting the logout button to the existing `logout()` function in `use-auth.ts`.

---

## What Already Exists (Reuse These)

- **`app/hooks/use-auth.ts`** — already has `logout()` (calls `/auth/logout`, clears Redux, redirects) and `currentUserQuery` which fetches `/auth/me` and syncs to Redux
- **`app/state/authSlice.ts`** — `selectAuthUser` selector returns `AuthUser | null` with `firstName`, `lastName`, `email`
- **`useAppSelector`** from `app/state/redux.tsx` — typed Redux selector hook
- **`NavUser.tsx`** — already renders avatar initials from `firstName`/`lastName` props; just needs `onLogout` prop wired up

---

## Implementation Steps

### 1. Fix logout redirect in `use-auth.ts`

The spec requires logout to redirect to `/` (home), not `/login`. Change the redirect in the `logout()` function.

**File:** `app/hooks/use-auth.ts`

- Change `router.push("/login")` → `router.push("/")`

---

### 2. Update `NavUser.tsx` — add `onLogout` prop

Add an `onLogout` callback prop to the `NavUser` component and wire it to the "Log out" `DropdownMenuItem` via `onClick`.

**File:** `components/dashboard/NavUser.tsx`

- Add `onLogout: () => void` to the `Props` interface
- Add `onClick={onLogout}` to the Log out `DropdownMenuItem`

---

### 3. Update `AppSidebar.tsx` — replace hardcoded user with real auth data

Remove the hardcoded `user` const. Use `useAuth()` to get the real user and logout function. Pass both down to `NavUser`.

**File:** `components/dashboard/AppSidebar.tsx`

- Import `useAuth` from `@/app/hooks/use-auth`
- Remove hardcoded `user` object
- Call `const { user, logout } = useAuth()`
- Handle null user: render a placeholder (initials `??`, email `—`) while user data is loading
- Pass `user` and `onLogout={logout}` to `<NavUser />`

---

### 4. Write tests

**File:** `tests/components/NavUser.test.tsx` (new file)

Follow pattern from `tests/components/AIAssistantButton.test.tsx` (simple render, props-driven, no providers needed):

- Renders first name, last name, and email from props
- Avatar fallback shows correct uppercase initials when no avatar image is provided
- Clicking "Log out" calls the `onLogout` handler

---

## Files to Modify

| File                                  | Change                                                             |
| ------------------------------------- | ------------------------------------------------------------------ |
| `app/hooks/use-auth.ts`               | Change logout redirect from `/login` to `/`                        |
| `components/dashboard/NavUser.tsx`    | Add `onLogout` prop, wire to logout button                         |
| `components/dashboard/AppSidebar.tsx` | Replace hardcoded user with `useAuth()`, pass real data to NavUser |
| `tests/components/NavUser.test.tsx`   | New test file                                                      |

---

## Verification

1. Run dev server (`npm run dev`) and log in — sidebar footer should show real name and email
2. Click "Log out" — should POST to `/auth/logout`, clear state, redirect to `/`
3. Run tests: `npx vitest tests/components/NavUser.test.tsx`
