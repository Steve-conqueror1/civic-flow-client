---
title: "Categories API"
description: "Service category management endpoints for listing, creating, updating, and toggling category status"
---

# Categories

Service category management endpoints.

## GET /v1/categories

List all service categories.

- **Auth:** None (public)
- **Response 200:** List of categories

## POST /v1/categories

Create a new service category.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (required):** `name` (max 255)
- **Body (optional):** `description`, `icon` (max 255)
- **Response 201:** Category created
- **Response 400:** Validation error
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 409:** Category name already exists

## GET /v1/categories/:id

Get a category by ID.

- **Auth:** None (public)
- **Response 200:** Category details
- **Response 404:** Category not found

## PATCH /v1/categories/:id

Update a category.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (all optional):** `name` (max 255), `description`, `icon` (max 255)
- **Response 200:** Category updated
- **Response 400:** Validation error
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Category not found

## PATCH /v1/categories/:id/status

Activate or deactivate a category.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (required):** `isActive` (boolean)
- **Response 200:** Category status updated
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Category not found
