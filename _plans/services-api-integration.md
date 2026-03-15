# Plan: Services API Integration

## Context

The backend exposes a full set of services endpoints (documented in `backend_apis/services.md`). The RTK Query API slice in `app/state/api.ts` already wires users, departments, and contact endpoints using the same pattern. This task adds the services data layer — typed interfaces and RTK Query endpoints — so UI components can consume them in a later phase. No UI changes are in scope.

---

## Step 1 — Create `app/types/service.ts`

Define all TypeScript types for services. Follow the naming conventions in `app/types/user.ts`. Use a common `PaginatedResponse<T>` generic since multiple list endpoints share the same envelope shape.

**Core model:**

- `Service` — `id`, `name`, `description`, `instructions`, `categoryId`, `departmentId`, `minResponseDays`, `maxResponseDays`, `isActive`, `createdAt`, `updatedAt`

**Shared generics:**

- `PaginatedResponse<T>` — `{ success, message, data: { services: T[]; total; page; limit } }`
- `SingleServiceResponse` — `{ success, message, data: Service }`

**Query param shapes:**

- `GetServicesQuery` — `page?`, `limit?`, `includeInactive?`
- `SearchServicesQuery` — `q: string`, `page?`, `limit?`
- `GetServicesGroupedQuery` — `limit?`
- `GetServicesByCategoryQuery` — `categoryId: string`, `page?`, `limit?`
- `GetServicesByDepartmentQuery` — `departmentId: string`, `page?`, `limit?`

**Mutation payloads:**

- `CreateServicePayload` — `name`, `description`, `instructions`, `categoryId`, `departmentId`, `minResponseDays`, `maxResponseDays`
- `UpdateServicePayload` — `Partial<CreateServicePayload>`

**Response types:**

- `GetServicesResponse` = `PaginatedResponse<Service>`
- `SearchServicesResponse` = `PaginatedResponse<Service>`
- `GetServicesByCategoryResponse` = `PaginatedResponse<Service>`
- `GetServicesByDepartmentResponse` = `PaginatedResponse<Service>`
- `GetServiceByIdResponse` = `SingleServiceResponse`
- `CreateServiceResponse` = `SingleServiceResponse`
- `UpdateServiceResponse` = `SingleServiceResponse`
- `DeleteServiceResponse` = `{ success: boolean; message: string }`
- `ActivateServiceResponse` = `SingleServiceResponse`
- `DeactivateServiceResponse` = `SingleServiceResponse`
- `GetServicesGroupedByCategoryResponse` — `{ success, message, data: { groups: Array<{ category: { id, name }; services: Service[] }> } }`
- `GetServicesGroupedByDepartmentResponse` — `{ success, message, data: { groups: Array<{ department: { id, name }; services: Service[] }> } }`

---

## Step 2 — Update `app/state/api.ts`

**Files to modify:** `app/state/api.ts`

### 2a. Add `"Services"` to `tagTypes`

### 2b. Import all new types from `@/app/types/service`

### 2c. Add 12 endpoints

Follow the URLSearchParams builder pattern from `getUsers` for optional params; follow `getUserById` for path params.

| Endpoint                         | Method | Path                                             | Cache             |
| -------------------------------- | ------ | ------------------------------------------------ | ----------------- |
| `getServices`                    | GET    | `/services?page&limit&includeInactive`           | `providesTags`    |
| `createService`                  | POST   | `/services`                                      | `invalidatesTags` |
| `searchServices`                 | GET    | `/services/search?q&page&limit`                  | `providesTags`    |
| `getServicesGroupedByCategory`   | GET    | `/services/grouped/category?limit`               | `providesTags`    |
| `getServicesGroupedByDepartment` | GET    | `/services/grouped/department?limit`             | `providesTags`    |
| `getServicesByCategory`          | GET    | `/services/category/{categoryId}?page&limit`     | `providesTags`    |
| `getServicesByDepartment`        | GET    | `/services/department/{departmentId}?page&limit` | `providesTags`    |
| `getServiceById`                 | GET    | `/services/{id}`                                 | `providesTags`    |
| `updateService`                  | PATCH  | `/services/{id}`                                 | `invalidatesTags` |
| `deleteService`                  | DELETE | `/services/{id}`                                 | `invalidatesTags` |
| `activateService`                | PATCH  | `/services/{id}/activate`                        | `invalidatesTags` |
| `deactivateService`              | PATCH  | `/services/{id}/deactivate`                      | `invalidatesTags` |

### 2d. Export all 12 hooks

```
useGetServicesQuery, useCreateServiceMutation, useSearchServicesQuery,
useGetServicesGroupedByCategoryQuery, useGetServicesGroupedByDepartmentQuery,
useGetServicesByCategoryQuery, useGetServicesByDepartmentQuery,
useGetServiceByIdQuery, useUpdateServiceMutation, useDeleteServiceMutation,
useActivateServiceMutation, useDeactivateServiceMutation
```

---

## Step 3 — Create `tests/state/services-api.test.ts`

Follow `tests/state/departments-api.test.tsx` exactly:

- `vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://localhost:3001")` before dynamic imports
- Dynamic import of `makeStore` and hooks
- `mockFetchResponse()` and `createWrapper()` helpers
- `afterEach(() => vi.restoreAllMocks())`

**Tests (one `describe` per group):**

1. Tag type check — `api.util.invalidateTags([{ type: "Services" }])`
2. `getServices` — URL with no params; URL with page/limit/includeInactive
3. `searchServices` — URL contains `?q=`
4. `getServicesByCategory` — URL is `/services/category/{id}` with query params
5. `getServicesByDepartment` — URL is `/services/department/{id}` with query params
6. `getServiceById` — URL is `/services/{id}`
7. `createService` — method is POST, body contains required fields
8. `updateService` — method is PATCH, URL is `/services/{id}`
9. `deleteService` — method is DELETE, URL is `/services/{id}`
10. `activateService` — method is PATCH, URL is `/services/{id}/activate`
11. `deactivateService` — method is PATCH, URL is `/services/{id}/deactivate`

---

## Critical Files

| Action | File                               |
| ------ | ---------------------------------- |
| Create | `app/types/service.ts`             |
| Modify | `app/state/api.ts`                 |
| Create | `tests/state/services-api.test.ts` |

**Reference (patterns only):**

- `app/types/user.ts` — type naming conventions
- `app/state/api.ts` — URLSearchParams query builder pattern
- `tests/state/departments-api.test.tsx` — test helpers and structure

---

## Verification

1. `npm run build` — no TypeScript errors
2. `npx vitest tests/state/services-api.test.ts` — all tests pass
