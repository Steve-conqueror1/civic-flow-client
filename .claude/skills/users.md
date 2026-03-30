---
title: "Users API"
description: "User profile management and admin user management endpoints including status actions and statistics"
---

# Users

User profiles and admin user management endpoints.

## GET /v1/users/me

Get your own profile.

- **Auth:** Cookie (`access_token`)
- **Response 200:** User profile
- **Response 401:** Not authenticated

## PATCH /v1/users/me

Update your own profile.

- **Auth:** Cookie (`access_token`)
- **Body (all optional):** `firstName`, `lastName`, `phoneNumber` (nullable), `address` (nullable), `mfaEnabled`
- **Response 200:** Profile updated
- **Response 400:** Validation error
- **Response 401:** Not authenticated

## DELETE /v1/users/me

Soft-delete your own account.

- **Auth:** Cookie (`access_token`)
- **Response 200:** Account deleted
- **Response 401:** Not authenticated
- **Response 403:** Cannot delete last super admin

## GET /v1/users/count

Get the number of active citizen users. Public endpoint.

- **Auth:** None
- **Response 200:** `{ success: boolean, count: integer }`

## GET /v1/users/stats

Get user statistics (total, staff, inactive, suspended).

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Response 200:** `{ success, message, data: { totalUsers, totalStaff, inactiveUsers, suspendedUsers } }`
- **Response 401:** Not authenticated
- **Response 403:** Admin role required

## GET /v1/users

List all users (paginated, filterable).

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Query (optional):** `page` (default 1), `limit` (default 10, max 100), `role` (`citizen` | `admin` | `super_admin`), `status` (`active` | `inactive` | `suspended` | `deleted`), `search` (name or email)
- **Response 200:** Paginated user list
- **Response 401:** Not authenticated
- **Response 403:** Admin role required

## GET /v1/users/:id

Get a user by ID.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Response 200:** User details
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** User not found

## PATCH /v1/users/:id

Admin update a user's profile.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (all optional):** `firstName`, `lastName`, `phoneNumber`, `address`, `email`, `role` (`citizen` | `admin` | `super_admin`), `status` (`active` | `inactive` | `suspended`)
- **Response 200:** User updated
- **Response 400:** Validation error
- **Response 403:** Insufficient permissions
- **Response 404:** User not found

## DELETE /v1/users/:id

Soft-delete a user account.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Response 200:** User deleted
- **Response 403:** Insufficient permissions
- **Response 404:** User not found

## PATCH /v1/users/:id/activate

Set user status to active.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (optional):** `reason` (max 500 chars)
- **Response 200:** User activated
- **Response 409:** User is already active

## PATCH /v1/users/:id/deactivate

Set user status to inactive.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (optional):** `reason` (max 500 chars)
- **Response 200:** User deactivated
- **Response 409:** User is already inactive

## PATCH /v1/users/:id/suspend

Set user status to suspended.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (optional):** `reason` (max 500 chars)
- **Response 200:** User suspended
- **Response 409:** User is already suspended

## PATCH /v1/users/:id/delete

Soft-delete a user account (set status to deleted).

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (optional):** `reason` (max 500 chars)
- **Response 200:** User deleted
- **Response 409:** User is already deleted
