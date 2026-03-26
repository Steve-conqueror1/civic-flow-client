# Services

Public services catalog endpoints.

## GET /v1/services

List all services (paginated).

- **Auth:** None (public)
- **Query (optional):** `page` (default 1), `limit` (default 10, max 100), `includeInactive` (boolean, admin only)
- **Response 200:** Paginated list of services

## POST /v1/services

Create a new service.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (required):** `name` (max 255), `categoryId` (uuid), `departmentId` (uuid)
- **Body (optional):** `description`, `instructions`, `minResponseDays` (≥1), `maxResponseDays` (≥1)
- **Response 201:** Service created
- **Response 400:** Validation error
- **Response 401:** Not authenticated
- **Response 403:** Admin role required

## GET /v1/services/search

Search services by keyword.

- **Auth:** None (public)
- **Query (required):** `q` (search string)
- **Query (optional):** `page` (default 1), `limit` (default 10, max 100)
- **Response 200:** Search results with pagination
- **Response 400:** Missing or empty search query

## GET /v1/services/grouped/category

Get services grouped by category.

- **Auth:** None (public)
- **Query (optional):** `limit` (default 10, max 50) — max services per group
- **Response 200:** Services grouped by category

## GET /v1/services/grouped/department

Get services grouped by department.

- **Auth:** None (public)
- **Query (optional):** `limit` (default 10, max 50) — max services per group
- **Response 200:** Services grouped by department

## GET /v1/services/popular

Get popular services ranked by request count.

- **Auth:** None (public)
- **Query (optional):** `limit` (default 4, min 1)
- **Response 200:** Popular services sorted by request count descending
- **Response 400:** Invalid limit parameter

## GET /v1/services/category/:categoryId

List services by category.

- **Auth:** None (public)
- **Query (optional):** `page` (default 1), `limit` (default 10, max 100)
- **Response 200:** Services in the specified category

## GET /v1/services/department/:departmentId

List services by department.

- **Auth:** None (public)
- **Query (optional):** `page` (default 1), `limit` (default 10, max 100)
- **Response 200:** Services in the specified department

## GET /v1/services/id/:id

Get a service by ID.

- **Auth:** None (public)
- **Response 200:** Service details
- **Response 404:** Service not found

## GET /v1/services/:slug

Get a service by slug. Returns department and category names.

- **Auth:** None (public)
- **Response 200:** Service details with department and category names
- **Response 404:** Service not found

## PATCH /v1/services/:id

Update a service.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (all optional):** `name`, `description`, `instructions`, `categoryId`, `departmentId`, `minResponseDays`, `maxResponseDays`
- **Response 200:** Service updated
- **Response 400:** Validation error
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Service not found

## PATCH /v1/services/:id/activate

Activate a service.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Response 200:** Service activated
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Service not found

## PATCH /v1/services/:id/deactivate

Deactivate a service.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Response 200:** Service deactivated
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Service not found

## DELETE /v1/services/:id

Delete a service.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Response 200:** Service deleted
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Service not found
