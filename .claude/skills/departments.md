---
title: "Departments API"
description: "Government department management endpoints for listing, creating, updating, and toggling department status"
---

# Departments

Government department management endpoints.

## GET /v1/departments

List all departments.

- **Auth:** None (public)
- **Query (optional):** `includeInactive` (boolean, admin only)
- **Response 200:** List of departments

## POST /v1/departments

Create a new department.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (required):** `name` (max 255)
- **Body (optional):** `description` (max 2000), `icon` (max 255)
- **Response 201:** Department created
- **Response 400:** Validation error
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 409:** Department name already exists

## GET /v1/departments/:id

Get a department by ID.

- **Auth:** None (public)
- **Response 200:** Department details
- **Response 404:** Department not found

## PATCH /v1/departments/:id

Update a department.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (all optional):** `name` (max 255), `description` (max 2000), `icon` (max 255)
- **Response 200:** Department updated
- **Response 400:** Validation error
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Department not found

## PATCH /v1/departments/:id/status

Activate or deactivate a department.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (required):** `isActive` (boolean)
- **Response 200:** Department status updated
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Department not found
