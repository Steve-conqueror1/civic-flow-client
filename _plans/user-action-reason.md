# Plan: Require Reason for User Table Actions

## Context

The admin Users table has four status actions — Activate, Deactivate, Suspend, and Delete. The backend accepts an optional `reason` field for all of them, but the frontend currently sends no reason and only shows a confirmation dialog for Delete. The goal is to make `reason` a **required** frontend field for all four actions before submission can proceed.

## What changes

### 1. `app/types/user.ts`

- Change `adminActivateUser` payload: add `{ id: string; reason: string }`-style type → add `ActivateUserPayload`
- Change `adminDeactivateUser` payload: add `DeactivateUserPayload`
- Add `SuspendUserPayload` and `SuspendUserResponse` types for the dedicated `/suspend` endpoint
- Add `DeleteUserPayload` for the PATCH `/users/{id}/delete` endpoint (supports `reason`)

### 2. `app/state/api.ts`

Update mutations to accept `{ id, reason }` and send reason in request body:

| Mutation                     | Current              | Updated                                         |
| ---------------------------- | -------------------- | ----------------------------------------------- |
| `adminActivateUser`          | `query: (id) =>`     | `query: ({ id, reason }) =>` + body             |
| `adminDeactivateUser`        | `query: (id) =>`     | `query: ({ id, reason }) =>` + body             |
| `adminDeleteUser`            | `DELETE /users/{id}` | `PATCH /users/{id}/delete` + body `{ reason }`  |
| `adminSuspendUser` (**new**) | —                    | `PATCH /users/{id}/suspend` + body `{ reason }` |

### 3. `components/users/UsersTable.tsx`

Replace the current per-action immediate-execution pattern with a **single controlled dialog** for all four actions:

**State to add to `UserRowActions`:**

```ts
const [dialogAction, setDialogAction] = useState<
  "activate" | "deactivate" | "suspend" | "delete" | null
>(null);
const [reason, setReason] = useState("");
```

**Dropdown items:** instead of `onClick={handleXxx}`, set `onClick={() => { setReason(''); setDialogAction('xxx') }}`

**Single AlertDialog** (replaces current AlertDialog + per-action inline calls):

- Open when `dialogAction !== null`; close by `setDialogAction(null)`
- Dynamic title and description per action
- `<Textarea>` for the required reason (controlled, bound to `reason` state)
- `AlertDialogAction` disabled when `reason.trim().length === 0`
- On confirm: call the correct mutation with `{ id: user.id, reason }`, then `setDialogAction(null)`

Also add `useAdminSuspendUserMutation` import and remove the suspend-via-updateUser workaround.

Fix the typo: `"Deativate"` → `"Deactivate"`.

## Critical files

- `app/types/user.ts`
- `app/state/api.ts` (lines 141–152)
- `components/users/UsersTable.tsx`

## Existing utilities to reuse

- `AlertDialog` + children — already imported in UsersTable
- `Textarea` — `components/ui/textarea.tsx`
- `getErrorMessage` — already imported from `@/lib/utils`
- `toast` — already imported from `sonner`

## Verification

1. Open admin Users table, click the actions menu for a user
2. Clicking Activate / Deactivate / Suspend / Delete should open the dialog
3. The confirm button should be **disabled** until the reason textarea has content
4. Submitting should call the correct endpoint with the reason in the request body (check Network tab)
5. Toast success/error should fire correctly
6. Closing the dialog (Cancel) should reset the reason field
