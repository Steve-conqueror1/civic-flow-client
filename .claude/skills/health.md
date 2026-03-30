---
title: "Health API"
description: "Server health check endpoint"
---

# Health

Server health check endpoint.

## GET /health

Check if the server is running.

- **Auth:** None
- **Response 200:**
  - `success`: boolean
  - `message`: string (`"Server is healthy"`)
