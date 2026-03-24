# Plan: User Stats Card — Real Data Integration

## Context

The admin users page (`app/dashboard/users/page.tsx`) already renders four `UserStatCard` instances, but three of them display hardcoded static values ("842", "24", "16"). The backend exposes a dedicated `GET /v1/users/stats` endpoint that returns `totalUsers`, `totalStaff`, `inactiveUsers`, and `suspendedUsers`. This plan wires those real values into the existing stat card grid, adds auto-refresh polling, and handles loading/error states. The existing `UserStatCard` component is used as-is — no changes to the component itself.

---

## Files to Modify

| File                                     | Change                                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| `app/state/api.ts`                       | Add `getUserStats` RTK Query endpoint + `"UserStats"` tag type                            |
| `app/dashboard/users/page.tsx`           | Replace static STATS config with live data from `useGetUserStatsQuery`                    |
| `tests/components/UserStatCard.test.tsx` | Add integration-style tests for the stats grid (loading, error, real values, zero values) |

---

## Step 1 — Add RTK Query endpoint (`app/state/api.ts`)

1. Add `"UserStats"` to the `tagTypes` array alongside the existing tag types.
2. Add a new `getUserStats` query endpoint:
   - `query: () => "/v1/users/stats"`
   - `providesTags: ["UserStats"]`
   - Response shape: `{ success: boolean; message?: string; data: { totalUsers: number; totalStaff: number; inactiveUsers: number; suspendedUsers: number } }`
3. Export `useGetUserStatsQuery` at the bottom of the file with the other exported hooks.

---

## Step 2 — Update the users page (`app/dashboard/users/page.tsx`)

Replace the current static `STATS` array and the `useGetUsersQuery`-based total with data from the new stats endpoint.

### Stats configuration (new)

Define a static config array for the four cards — icon, label, color classes, badge text — then fill in `value` at render time from the API response. Color coding per spec:

| Stat           | Icon           | `iconClassName`              | `badgeClassName`                                     | Badge label   |
| -------------- | -------------- | ---------------------------- | ---------------------------------------------------- | ------------- |
| Total Users    | `Users`        | `bg-blue-50 text-primary`    | `bg-green-50 text-green-700 border border-green-100` | `"Users"`     |
| Total Staff    | `UserCheck`    | `bg-amber-50 text-amber-600` | `bg-amber-50 text-amber-700 border border-amber-100` | `"Staff"`     |
| Inactive Users | `ClockArrowUp` | `bg-amber-50 text-amber-600` | `bg-amber-50 text-amber-700 border border-amber-100` | `"Inactive"`  |
| Suspended      | `UserX`        | `bg-red-50 text-red-600`     | `bg-red-50 text-red-700 border border-red-100`       | `"Suspended"` |

### Behavior

- Call `useGetUserStatsQuery(undefined, { pollingInterval: 30000 })` for auto-refresh every 30 seconds.
- **Loading state**: while `isLoading` is true, render four skeleton placeholder divs in the stats grid (same grid layout, e.g. `animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl h-28`).
- **Error state**: if `isError` is true, render a single error message row spanning the grid (e.g. `"Failed to load user statistics. Please refresh."`).
- **Success state**: destructure `data.data` and pass each count to the matching `UserStatCard` as `value`. Display `0` explicitly — never fall back to `"—"` for zero values.
- Remove the dependency on `useGetUsersQuery` for the `total` value — the stats endpoint now owns all four counts. Keep `useGetUsersQuery` only for the `UsersTable`.

---

## Step 3 — Tests (`tests/components/UserStatCard.test.tsx`)

Add a new `describe` block (`"UsersPage stats grid integration"`) to the existing test file. Mock `@/app/state/api` with `vi.mock`. Use `renderWithProviders` (from `tests/utils/render-with-providers.tsx`) to render the full `UsersPage`.

Tests to add:

1. **Renders all four stat values** — mock a successful response with known counts; assert each label and value is visible.
2. **Renders loading skeletons** — mock `isLoading: true`; assert stat values are not present and a loading indicator is visible.
3. **Renders error message** — mock `isError: true`; assert an error message is visible and stat values are absent.
4. **Displays zero correctly** — mock a response where `suspendedUsers: 0`; assert `"0"` is rendered (not `"—"` or hidden).

---

## Verification

1. Run `npm run dev` and navigate to the admin users page — confirm all four cards show real counts.
2. Open DevTools Network tab — confirm the `/v1/users/stats` request fires on load and again every 30 seconds.
3. Simulate an API error (e.g. disconnect network) — confirm the error state renders.
4. Run `npx vitest tests/components/UserStatCard.test.tsx` — all tests pass.
5. Run `npm run lint` — no lint errors.
