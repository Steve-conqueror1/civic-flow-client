---
title: "Shared API Schemas"
description: "Shared response schema definitions (Error, ValidationError, Pagination) used across all CivicFlow API endpoints"
---

# Shared Schemas

## Error

- success: boolean
- message: string

## ValidationError

- success: boolean
- message: string
- errors: object

## Pagination

- page: number
- limit: number
- total: number
