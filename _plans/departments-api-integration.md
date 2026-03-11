# Plan: Departments API Integration

## Context

CivicFlow needs to retrieve the list of departments from the backend (`GET /api/v1/departments`) so that consuming pages (e.g. service request forms, admin filters) can display department options. The integration follows the existing RTK Query pattern already established for the contact endpoint.

---

## Files to Modify

| File                      | Change                                                                  |
| ------------------------- | ----------------------------------------------------------------------- |
| `app/types/department.ts` | **Create** — `Department` interface and API response type               |
| `app/state/api.ts`        | **Edit** — add `Departments` tag type + `getDepartments` query endpoint |

## Files to Create

| File                                  | Purpose                         |
| ------------------------------------- | ------------------------------- |
| `tests/state/departments-api.test.ts` | Unit tests for the new endpoint |

---

## Implementation Steps

### 1. Create `app/types/department.ts`

Define the `Department` interface matching the confirmed backend fields:

```
id, name, description, icon, slug, isActive, createdAt, updatedAt
```

Also define a `GetDepartmentsResponse` type matching the API response envelope:

```
{ success: boolean; message: string; data: { departments: Department[] } }
```

Follow the pattern in `app/types/contact.ts`.

### 2. Update `app/state/api.ts`

- Import `Department` and `GetDepartmentsResponse` from `app/types/department.ts`
- Add `"Departments"` to the `tagTypes` array
- Add a `getDepartments` query endpoint:
  - `GET /api/v1/departments`
  - Returns `GetDepartmentsResponse`
  - Provides the `Departments` tag
- Export `useGetDepartmentsQuery` hook

### 3. Create `tests/state/departments-api.test.ts`

Follow the reducer-level test pattern from `tests/state/authSlice.test.ts`. Cover:

- The endpoint URL resolves to `/api/v1/departments`
- A successful API response surfaces `data.departments` as an array of `Department` objects
- An error response results in `isError: true`
- The `Departments` tag type is registered in `api.tagTypes`

Use `msw` or `vi.fn()` to mock fetch — check existing test files for which mock approach is already used.

---

## Verification

1. Run `npm run lint` — no TypeScript errors
2. Run `npm run test` — `tests/state/departments-api.test.ts` passes
3. In a consuming component, call `useGetDepartmentsQuery()` and confirm `data.data.departments` is typed as `Department[]`

## Important

- Implement this API in ServiceDepartmentsSection component with icon from `DEPARTMENTS_ICONS` objects where object keys match icon names from from returned departments
