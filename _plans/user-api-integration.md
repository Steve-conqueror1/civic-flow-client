# Plan: User API Integration (Phase 1 — API Layer Only)

## Context

The backend exposes a `/api/v1/users` group of endpoints for citizen profile management, admin user management, and a public user count stat. This phase wires up the RTK Query API layer, TypeScript types, and Zod validation schemas so that UI components can consume these endpoints in a later phase. No UI, pages, forms, or visual components are created or modified.

---

## Files to Modify or Create

| File | Action |
|---|---|
| `app/types/user.ts` | Populate with API request/response types |
| `app/state/api.ts` | Add 9 new endpoints + 4 new tag types; add `credentials: "include"` to base query |
| `lib/validators.ts` | Add `updateProfileSchema` and `adminUpdateUserSchema` |
| `tests/state/users-api.test.tsx` | Create RTK Query test file |

---

## Step 1 — `app/types/user.ts`

The file currently contains only `RegisterFormValues`. Add all user API types here (keeping the existing export). Import `Role` from `@/types/auth`.

Types to add:

- **`UserProfile`** — user object returned in API responses. Extends `AuthUser` with: `mfaEnabled: boolean`, `status: "active" | "inactive"`, `createdAt: string`, `updatedAt: string`.
- **`GetMeResponse`** — `{ success: boolean; message: string; data: UserProfile }`
- **`UpdateMePayload`** — `{ firstName?: string; lastName?: string; phoneNumber?: string; address?: string; mfaEnabled?: boolean }`
- **`UpdateMeResponse`** — `{ success: boolean; message: string; data: UserProfile }`
- **`DeleteMeResponse`** — `{ success: boolean; message: string }`
- **`GetUserCountResponse`** — `{ success: boolean; count: number }`
- **`GetUsersQuery`** — `{ page?: number; limit?: number; role?: Role; status?: string; search?: string }`
- **`PaginatedUsersData`** — `{ users: UserProfile[]; total: number; page: number; limit: number }`
- **`GetUsersResponse`** — `{ success: boolean; message: string; data: PaginatedUsersData }`
- **`GetUserByIdResponse`** — `{ success: boolean; message: string; data: UserProfile }`
- **`AdminUpdateUserPayload`** — `{ firstName?: string; lastName?: string; phoneNumber?: string; address?: string; email?: string; role?: Role; status?: string }`
- **`AdminUpdateUserResponse`** — `{ success: boolean; message: string; data: UserProfile }`
- **`DeleteUserResponse`** — `{ success: boolean; message: string }`
- **`DeactivateUserResponse`** — `{ success: boolean; message: string; data: { status: string } }`

---

## Step 2 — `app/state/api.ts`

### 2a. Add `credentials: "include"` to `fetchBaseQuery`

The citizen and admin endpoints require the `access_token` httpOnly cookie. Add `credentials: "include"` to the base query config so cookies are sent automatically.

### 2b. Extend `tagTypes`

`["Departments", "Users", "UserDetail", "UserCount", "Me"]`

### 2c. Add 9 new endpoints

| Endpoint name | Method | URL | Tags |
|---|---|---|---|
| `getMe` | GET | `/users/me` | provides `Me` |
| `updateMe` | PATCH | `/users/me` | invalidates `Me` |
| `deleteMe` | DELETE | `/users/me` | invalidates `Me` |
| `getUserCount` | GET | `/users/count` | provides `UserCount` |
| `getUsers` | GET | `/users` + query params | provides `Users` |
| `getUserById` | GET | `/users/{id}` | provides `UserDetail` |
| `adminUpdateUser` | PATCH | `/users/{id}` | invalidates `Users`, `UserDetail` |
| `adminDeleteUser` | DELETE | `/users/{id}` | invalidates `Users`, `UserDetail` |
| `adminDeactivateUser` | PATCH | `/users/{id}/deactivate` | invalidates `Users`, `UserDetail` |

Export all generated hooks from the bottom of the file.

---

## Step 3 — `lib/validators.ts`

- **`updateProfileSchema`** — for `PATCH /v1/users/me`. All fields optional: `firstName`, `lastName` (strings), `phoneNumber`, `address` (optional strings), `mfaEnabled` (optional boolean). Export inferred type `UpdateProfileFormValues`.
- **`adminUpdateUserSchema`** — for `PATCH /v1/users/{id}`. All optional: `firstName`, `lastName`, `phoneNumber`, `address` (strings), `email` (valid email), `role` (enum: `citizen | admin`), `status` (enum: `active | inactive`). Export inferred type `AdminUpdateUserFormValues`.

---

## Step 4 — `tests/state/users-api.test.tsx`

Follow the exact pattern of `tests/state/departments-api.test.tsx`:

1. `vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", API_BASE)` before dynamic imports
2. Dynamic `await import(...)` for `makeStore`, `api`, and generated hooks
3. `mockFetchResponse()` helper + `createWrapper()` factory
4. `afterEach(() => vi.restoreAllMocks())`

Test cases per endpoint:

- **`getMe`** — tag type present; fetches successfully; handles 401; correct URL
- **`updateMe`** — fires with correct body; invalidates `Me` tag; handles error
- **`deleteMe`** — fires; handles error
- **`getUserCount`** — fetches `{ success: true, count: 42 }`; handles error; correct URL
- **`getUsers`** — fetches paginated list; passes query params; handles error
- **`getUserById`** — fetches by ID; handles 404; correct URL
- **`adminUpdateUser`** — fires with body; invalidates `Users` + `UserDetail`
- **`adminDeleteUser`** — fires; invalidates `Users` + `UserDetail`
- **`adminDeactivateUser`** — fires with no body; invalidates tags

---

## Verification

```bash
npm run lint    # no TypeScript or lint errors
npm run test    # tests/state/users-api.test.tsx all pass
```
