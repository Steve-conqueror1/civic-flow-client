# Plan: Extract API Tag Skills into `.claude/skills/`

## Context

The `backend_apis/api.json` groups all endpoints under 8 named tags. The project already has a `.claude/skills/schemas.md` reference file documenting shared response schemas. The goal is to create one skill/reference file per API tag so Claude and developers have quick, scoped API documentation available as project-level skills.

## Files to Create

One file per tag in `.claude/skills/`:

| File | Tag | Endpoints |
|------|-----|-----------|
| `health.md` | Health | GET /health |
| `auth.md` | Auth | 11 endpoints (register, login, logout, MFA, refresh, password reset, verify-email, /me) |
| `users.md` | Users | 10 endpoints (list, get, update, delete, activate, deactivate, suspend, stats, count, me) |
| `departments.md` | Departments | 4 endpoints (list, create, get, update, status) |
| `categories.md` | Categories | 4 endpoints (list, create, get, update, status) |
| `services.md` | Services | 11 endpoints (list, create, search, grouped, by-category, by-dept, popular, by-slug, by-id, activate/deactivate, update, delete) |
| `service-requests.md` | Service Requests | 6 endpoints (upload, create, list, featured, get, cancel, update-status) |
| `contact.md` | Contact | 3 endpoints (submit, list, update-status) |

`schemas.md` already exists — no change needed.

## Format (match existing `schemas.md` style)

Each file: plain markdown with an `#` heading, brief description, then sections per endpoint listing method, path, auth required, key params/body fields, and response summary.

## Verification

After implementation, confirm:
- 8 new files exist under `.claude/skills/`
- Each file covers only its tag's endpoints
- Auth requirements and key request/response fields are accurate against `api.json`
