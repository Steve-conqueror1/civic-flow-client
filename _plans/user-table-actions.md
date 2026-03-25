# Plan: User Table Row Actions

## Context

The users table has an inert `MoreVertical` action button on each row. This plan wires it up to a dropdown menu letting admins navigate to a user's profile, change their status (active/inactive/suspended), or soft-delete them — each mapped to the appropriate backend endpoint. The delete action requires an inline confirmation before firing.

---

## Files to Modify

| File                                   | Change                                                                  |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `app/types/user.ts`                    | Expand `UserProfile.status` union; add `ActivateUserResponse` type      |
| `app/state/api.ts`                     | Add `adminActivateUser` endpoint; export `useAdminActivateUserMutation` |
| `components/users/UsersTable.tsx`      | Extract `UserRowActions` component; wire actions column to it           |
| `tests/components/UsersTable.test.tsx` | Add action dropdown tests                                               |

---

## Step 1 — Fix `UserProfile` type (`app/types/user.ts`)

- Change `status: "active" | "inactive"` → `status: "active" | "inactive" | "suspended" | "deleted"`
- Add response type `ActivateUserResponse`:
  ```
  { success: boolean; message: string }
  ```

---

## Step 2 — Add activate endpoint (`app/state/api.ts`)

- Add `adminActivateUser` query inside the admin endpoints block:
  - `query: (id) => ({ url: /users/${id}/activate, method: "PATCH" })`
  - `invalidatesTags: ["Users", "UserDetail"]`
  - Response type: `ActivateUserResponse`
- Import `ActivateUserResponse` from `@/app/types/user`
- Export `useAdminActivateUserMutation` alongside the other user hooks

---

## Step 3 — `UserRowActions` component + column wiring (`components/users/UsersTable.tsx`)

### New component: `UserRowActions`

Create a `UserRowActions` component inside `UsersTable.tsx` (not a separate file):

**Props:** `{ user: UserProfile }`

**Hooks used:**

- `useAdminActivateUserMutation` (from `@/app/state/api`)
- `useAdminDeactivateUserMutation`
- `useAdminUpdateUserMutation` (for suspend: `{ status: "suspended" }`)
- `useAdminDeleteUserMutation`
- `useRouter` from `next/navigation` (for View Profile)

**Imports to add:**

- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator` from `@/components/ui/dropdown-menu`
- `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel` from `@/components/ui/alert-dialog`
- `toast` from `"sonner"`
- `useRouter` from `"next/navigation"`
- The four mutation hooks from `@/app/state/api`

**Dropdown menu items (render order):**

1. **View Profile** — always visible; calls `router.push('/dashboard/users/${user.id}')` on click
2. **Set Active** — hidden when `user.status === "active"`; calls `activateUser(user.id)` on success `toast.success("User set to active")`
3. **Set Inactive** — hidden when `user.status === "inactive"`; calls `deactivateUser(user.id)` on success `toast.success("User set to inactive")`
4. **Set Suspended** — hidden when `user.status === "suspended"`; calls `updateUser({ id: user.id, body: { status: "suspended" } })` on success `toast.success("User suspended")`
5. `DropdownMenuSeparator`
6. **Delete User** — destructive variant; wrapped in an `AlertDialog`:
   - Trigger: the menu item itself
   - Dialog content: title "Delete User", description confirming the action
   - Footer: Cancel button and a destructive Confirm button
   - On confirm: calls `deleteUser(user.id)`, on success `toast.success("User deleted")`
   - On cancel: no API call fires

**Error handling:** Each mutation's `onError` callback calls `toast.error("Something went wrong. Please try again.")`

### Wire to column

Change the `cell` in the `columnHelper.display` for `"actions"` from the inert `<button>` to:

```
cell: ({ row }) => <UserRowActions user={row.original} />
```

The trigger button inside `UserRowActions` should reuse the same classes as the current inert button.

---

## Step 4 — Tests (`tests/components/UsersTable.test.tsx`)

Add a new `describe` block: `"UsersTable row actions"`. Mock `@/app/state/api` with `vi.mock` using `importOriginal`, replacing only the four mutation hooks with `vi.fn()` returning `[mockMutateFn, {}]`. Use `renderWithProviders` from `tests/utils/render-with-providers.tsx`.

Tests to add:

1. **Dropdown opens** — click the action button on the first row; assert dropdown menu items are visible
2. **View Profile link** — assert the "View Profile" item navigates to `/dashboard/users/1` (mock `next/navigation` router)
3. **Set Active calls activate mutation** — render a user with `status: "inactive"`; click Set Active; assert the activate mutation was called with the correct user id
4. **Current-status action is hidden** — render a user with `status: "active"`; open dropdown; assert "Set Active" is not in the document
5. **Delete cancel fires no API call** — click Delete User, then click Cancel in the alert dialog; assert `deleteUser` mock was not called

---

## Verification

1. Run `npm run dev` → navigate to `/dashboard/users` → click a row's action button → confirm dropdown appears with correct items
2. Verify status actions for the user's current status are not shown
3. Click "Delete User" → confirm the dialog appears → click Cancel → no network call
4. Click "Delete User" → confirm → verify the user disappears from the table and a success toast appears
5. Run `npx vitest tests/components/UsersTable.test.tsx` — all tests pass
6. Run `npm run lint` — no errors
