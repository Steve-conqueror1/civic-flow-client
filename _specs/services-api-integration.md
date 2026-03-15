# Spec for Services API Integration

branch: claude/feature/services-api-integration

## Summary

Add RTK Query endpoints to `app/state/api.ts` for all services-related backend routes defined in `backend_apis/services.md`. This covers public browsing endpoints, admin CRUD endpoints, and service activation/deactivation. TypeScript types for all request payloads and response shapes must be defined in `app/types/service.ts`. No UI components are in scope — this spec covers only the data layer.

## Functional Requirements

- Define TypeScript interfaces for all service-related request and response shapes in `app/types/service.ts`.
- Add a `Services` tag type to the `tagTypes` array in the API slice.
- Wire the following endpoints in `app/state/api.ts`:
  - `getServices` — GET `/v1/services` with optional query params: `page`, `limit`, `includeInactive`
  - `createService` — POST `/v1/services` with body: `name`, `description`, `instructions`, `categoryId`, `departmentId`, `minResponseDays`, `maxResponseDays`
  - `searchServices` — GET `/v1/services/search` with required query param `q`
  - `getServicesGroupedByCategory` — GET `/v1/services/grouped/category` with optional `limit`
  - `getServicesGroupedByDepartment` — GET `/v1/services/grouped/department` with optional `limit`
  - `getServicesByCategory` — GET `/v1/services/category/{categoryId}` with optional `page`, `limit`
  - `getServicesByDepartment` — GET `/v1/services/department/{departmentId}` with optional `page`, `limit`
  - `getServiceById` — GET `/v1/services/{id}`
  - `updateService` — PATCH `/v1/services/{id}` with partial body matching create fields
  - `deleteService` — DELETE `/v1/services/{id}`
  - `activateService` — PATCH `/v1/services/{id}/activate`
  - `deactivateService` — PATCH `/v1/services/{id}/deactivate`
- Query endpoints must use `providesTags: ["Services"]`.
- Mutation endpoints (`createService`, `updateService`, `deleteService`, `activateService`, `deactivateService`) must use `invalidatesTags: ["Services"]`.
- All twelve hooks must be exported from the `api` slice.

## Possible edge cases (only if referenced)

- `getServices` accepts `includeInactive` which is admin-only — the type must reflect this as an optional boolean.
- `searchServices` requires a non-empty `q` param — the backend returns 400 for missing/empty queries; the type should enforce `q: string`.
- `updateService` body fields are all optional (partial update) — use a `Partial<CreateServicePayload>` equivalent type.
- `getServicesByCategory` and `getServicesByDepartment` both accept `page` and `limit` alongside a path param — the query builder must append path and query params correctly.

## Acceptance Criteria

- `app/types/service.ts` exists and exports typed interfaces for all service payloads and responses.
- All twelve endpoints are registered in `app/state/api.ts` under the `endpoints` builder.
- All twelve hooks are exported from the api slice and callable from components without TypeScript errors.
- `tagTypes` in the API slice includes `"Services"`.
- Query endpoints provide the `Services` tag; write mutations invalidate it.
- TypeScript compilation (`npm run build`) passes with no type errors.

## Open Questions

- Should paginated list responses share a common generic `PaginatedResponse<T>` wrapper type, or be defined individually per endpoint? common
- Does `getServicesGroupedByCategory` return a flat list with a `category` field, or a nested structure keyed by category? This affects the response type shape. {success: boolean, message: string, data:{groups: [{category: {id: string, name: string}, services: [service objects]}]}}
- Are `activateService` and `deactivateService` responses identical in shape to a standard service object, or just a status message? identical

## Testing Guidelines

Create `tests/state/services-api.test.ts`. Keep tests minimal and focused on the API slice configuration.

- Test that `getServices` builds the correct URL with and without query params.
- Test that `searchServices` includes the `q` param in the request URL.
- Test that `getServicesByCategory` and `getServicesByDepartment` correctly combine path and query params.
- Test that `createService` sends the correct method and body.
- Test that `deleteService`, `activateService`, and `deactivateService` send requests to the correct URLs with the correct HTTP methods.
