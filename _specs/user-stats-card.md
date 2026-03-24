# Spec for User Stats Card

branch: claude/feature/user-stats-card

## Summary

Add a `UserStatsCard` component to the admin dashboard that fetches and displays live user statistics from the `/v1/users/stats` API endpoint. The card will show four key metrics: total users, total staff, inactive users, and suspended users. This gives admins an at-a-glance overview of the user base's current state.

## Functional Requirements

- Fetch user statistics from `GET /v1/users/stats` using RTK Query (added to `app/state/api.ts`)
- Display four stat values in the card: `totalUsers`, `totalStaff`, `inactiveUsers`, and `suspendedUsers`
- Each stat should have a human-readable label alongside its numeric value
- Show a loading skeleton or spinner while the request is in flight
- Show an error message if the request fails
- The endpoint requires authentication via cookie (`cookieAuth`); the component should only be rendered in authenticated admin routes so no extra auth handling is needed in the component itself
- Restrict endpoint usage to Admin and Super Admin roles (HTTP 403 response should surface as an error state)

## Possible edge cases (only if referenced)

- Network failure or timeout: display a user-facing error state with a retry option
- API returns `success: false`: treat as an error and display the `message` field if available
- Any stat value is `0`: display `0` explicitly — do not hide or suppress zero values
- User loses session mid-load (401): display an appropriate unauthenticated error state

## Acceptance Criteria

- `UserStatsCard` renders all four stats (`totalUsers`, `totalStaff`, `inactiveUsers`, `suspendedUsers`) fetched from `/v1/users/stats`
- A loading state is visible while the fetch is in progress
- An error state is visible when the fetch fails or returns a non-success response
- Zero values are displayed correctly
- The component is placed on the admin users page (or dashboard) and is only accessible to authenticated admins
- The RTK Query endpoint for `/v1/users/stats` is defined in `app/state/api.ts` with appropriate tag types

## Open Questions

- Should the stats auto-refresh on a polling interval, or only on manual page load? auto-refresh
- Are there specific icons or color coding requested per stat (e.g. red for suspended)?
  Suspended: `bg-red-50 text-red-700 border border-red-100`
  Active: `bg-green-50 text-green-700 border border-green-100`
  Pending: `bg-amber-50 text-amber-700 border border-amber-100`
- Should `UserStatsCard` be a standalone card or integrated into an existing stats grid layout? Use existing `UserStatCard` instead

## Testing Guidelines

Create a test file at `tests/components/UserStatsCard.test.tsx` covering the following cases, without going too heavy:

- Renders all four stat labels and their values when the API returns successful data
- Renders a loading indicator while the fetch is pending
- Renders an error message when the API call fails
- Displays `0` correctly for any stat that returns zero
- Does not render any stat values when in error or loading state

## IMPORTANT

- `UserStatCard` already exists. Don't create `UserStatsCard` instead, use `UserStatCard` to display real data.
