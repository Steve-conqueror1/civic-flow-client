---
title: "Geocode API"
description: "Location search and geocoding endpoint — proxies Mapbox Geocoding, scoped to Canada, cached 24 hours"
---

# Geocode

Backend proxy for Mapbox Geocoding. Resolves place names or addresses into coordinates. Results are scoped to Canada and cached for 24 hours.

## GET /v1/geocode

Search for locations by query string.

- **Auth:** Cookie (`access_token`) — any authenticated user
- **Query params (required):** `q` — address or place name (e.g. `"123 Main St"`, `"Edmonton"`)
- **Query params (optional):** `limit` — integer 1–10, default `5`
- **Response 200:** List of matching locations
  - `success`: boolean
  - `data.results[]`:
    - `placeName`: string (e.g. `"Edmonton, Alberta, Canada"`)
    - `longitude`: number
    - `latitude`: number
    - `placeType`: string[] (e.g. `["place"]`)
- **Response 400:** Validation error — missing or empty `q` param
- **Response 401:** Not authenticated
- **Response 502:** Mapbox geocoding service unavailable
