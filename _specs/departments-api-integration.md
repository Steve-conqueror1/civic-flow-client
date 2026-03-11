# Spec for Departments API Integration

branch: claude/feature/departments-api-integration

## Summary

Add an RTK Query endpoint to fetch the list of departments from the backend API (`GET /api/v1/departments`). The retrieved departments data should be available for use across the app — for example, to populate department selectors in service request forms and admin filters.

## Functional Requirements

- Add a `Department` TypeScript interface to `app/types/` representing a single department record returned by the API
- Register `Departments` as a tag type in the RTK Query API slice (`app/state/api.ts`)
- Add a `getDepartments` query endpoint that calls `GET /api/v1/departments`
- Export the auto-generated `useGetDepartmentsQuery` hook from the api slice
- The endpoint must support cache invalidation via the `Departments` tag type

## Possible edge cases (only if referenced)

- The API may return an empty array if no departments have been configured
- The API may be unavailable during initial page load; the loading and error states should be handled gracefully by consuming components

## Acceptance Criteria

- `useGetDepartmentsQuery` is exported and callable from any component
- When the endpoint is called, it issues a `GET` request to `<NEXT_PUBLIC_API_BASE_URL>/api/v1/departments`
- The returned data is typed as an array of `Department` objects
- RTK Query's `isLoading`, `isError`, and `data` states are all accessible from the hook
- The `Departments` tag type is registered in `tagTypes` so future mutations can invalidate the cache

## Open Questions

- What fields does the `Department` object contain? (e.g. `id`, `name`, `slug`, `description`) — confirm with the backend team `id`, `name`, `description` `icon`, `slug`, `isActive`, `createdAt`, `updatedAt`
- Should departments be pre-fetched at the layout level (e.g. in a citizen or admin layout), or fetched on demand per page? per page
- Is pagination required, or will all departments always be returned in a single response? no pagination

## Testing Guidelines

Create a test file at `tests/state/departments-api.test.ts` and cover the following cases without going too heavy:

- The `getDepartments` endpoint constructs the correct request URL (`/api/v1/departments`)
- A successful response populates `data` with an array of `Department` objects
- An error response sets `isError` to `true`
- The `Departments` tag type is present in the api slice `tagTypes`

## important

- The shape of the response is as follows:
  JSON: {success: boolean, message: string, data: {departments: "array of departments objects"}}
