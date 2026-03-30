---
title: "Service Requests API"
description: "Citizen service request submission, tracking, attachment upload, and admin status management endpoints"
---

# Service Requests

Citizen service request submission and tracking endpoints.

## POST /v1/service-requests/upload

Upload attachments for a service request. Must be called before creating the request.

- **Auth:** Cookie (`access_token`)
- **Body:** `multipart/form-data` — `files[]` (max 4 files, 10 MB each; allowed types: JPEG, PNG, WebP, PDF)
- **Response 200:** Array of uploaded file URLs
- **Response 400:** Invalid file type or too many files
- **Response 401:** Not authenticated

## POST /v1/service-requests

Create a new service request.

- **Auth:** Cookie (`access_token`)
- **Body (required):** `serviceId` (uuid), `title` (max 255), `description`
- **Body (optional):** `location` (`{ address, lat, lng }`), `attachments` (array of URLs, max 4)
- **Response 201:** Service request created
- **Response 400:** Validation error
- **Response 401:** Not authenticated

## GET /v1/service-requests

List service requests. Citizens see their own; admins can filter broadly.

- **Auth:** Cookie (`access_token`)
- **Query (optional):** `status` (`open` | `in_progress` | `under_review` | `pending_review` | `resolved` | `rejected` | `closed`), `page` (default 1), `limit` (default 10, max 100)
- **Query (admin only):** `serviceId` (uuid), `departmentId` (uuid), `userId` (uuid)
- **Response 200:** Paginated list of service requests
- **Response 401:** Not authenticated

## GET /v1/service-requests/featured

Get the AI-selected featured service request. Cached for 2 minutes. Public endpoint.

- **Auth:** None
- **Response 200:** Featured case object, or `null` if no cases exist

## GET /v1/service-requests/:id

Get a service request by ID.

- **Auth:** Cookie (`access_token`)
- **Response 200:** Service request details
- **Response 401:** Not authenticated
- **Response 404:** Request not found

## PATCH /v1/service-requests/:id/cancel

Cancel a service request.

- **Auth:** Cookie (`access_token`)
- **Body (optional):** `note`
- **Response 200:** Request cancelled
- **Response 401:** Not authenticated
- **Response 404:** Request not found

## PATCH /v1/service-requests/:id/status

Update service request status (admin only).

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (required):** `status` (`open` | `in_progress` | `under_review` | `pending_review` | `resolved` | `rejected` | `closed`)
- **Body (optional):** `note`
- **Response 200:** Request status updated
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Request not found
