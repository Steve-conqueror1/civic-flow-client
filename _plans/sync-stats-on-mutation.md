# Plan: Sync UserStatsCard with User Mutations

## Context

The `UserStatsCard` grid fetches data via `useGetUserStatsQuery` which provides the `"UserStats"` RTK Query cache tag. When an admin performs a status change or delete from the users table, the four mutation endpoints (`adminUpdateUser`, `adminDeactivateUser`, `adminActivateUser`, `adminDeleteUser`) only invalidate `["Users", "UserDetail"]` — they do not invalidate `"UserStats"`. This means the stats card only refreshes on the 30-second polling interval, not immediately after a mutation. Adding `"UserStats"` to each mutation's `invalidatesTags` will trigger an immediate refetch of the stats query after any user action.

---

## File to Modify

`app/state/api.ts`

---

## Change

Add `"UserStats"` to the `invalidatesTags` array of all four user mutation endpoints:

| Endpoint              | Current `invalidatesTags` | Updated `invalidatesTags`              |
| --------------------- | ------------------------- | -------------------------------------- |
| `adminUpdateUser`     | `["Users", "UserDetail"]` | `["Users", "UserDetail", "UserStats"]` |
| `adminDeleteUser`     | `["Users", "UserDetail"]` | `["Users", "UserDetail", "UserStats"]` |
| `adminDeactivateUser` | `["Users", "UserDetail"]` | `["Users", "UserDetail", "UserStats"]` |
| `adminActivateUser`   | `["Users", "UserDetail"]` | `["Users", "UserDetail", "UserStats"]` |

No other files need to change.

---

## Verification

1. Run `npm run dev` and navigate to the admin users page.
2. Note the current suspended/inactive/active counts in the stat cards.
3. Open the action menu on a user and change their status (e.g. suspend an active user).
4. Confirm the stat cards update immediately without waiting 30 seconds.
5. Run `npm run lint` — no errors.
