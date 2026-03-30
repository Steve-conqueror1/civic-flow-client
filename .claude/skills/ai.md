---
title: "AI API"
description: "AI-powered analysis endpoints for CivicFlow service requests"
---

# AI

AI-powered analysis endpoints for pre-submission request evaluation.

## POST /v1/ai/analyse-request

Analyse a citizen request before submission. Uses AI to match the request to the best category and service, generate a summary, and flag potential issues.

- **Auth:** Cookie (`access_token`)
- **Body (required):** `title` (max 255), `description`
- **Body (optional):** `note`
- **Response 200:** Analysis result — includes matched category, matched service, summary, and any alerts
- **Response 400:** Validation error
- **Response 401:** Not authenticated
- **Response 503:** AI service unavailable
