# Docker Specification – CivicFlow Frontend (v1.1)

## Goal

Containerize the Next.js frontend for consistent environments across the lifecycle.

## Requirements

- **Base Image:** `node:20-alpine` (Small footprint, security-focused).
- **Multi-stage Build:** 1. `deps`: Install only production/dev dependencies. 2. `builder`: Run `next build` with `output: 'standalone'`. 3. `runner`: Final production image containing only necessary artifacts.
- **Port:** Expose and listen on **8080** (Set `ENV PORT 8080`).
- **Optimization:** Image size < 150MB; use `.dockerignore` to exclude `node_modules` and `.git`.

## Dev Mode (docker-compose.dev.yml)

- **Command:** `npm run dev` / `pnpm dev`.
- **Features:** - Hot Module Replacement (HMR) enabled.
  - Bind mount: `./` to `/app` (excluding `node_modules`).
  - Access to `.env.local`.

## Production Mode (Dockerfile)

- **Environment:** `NODE_ENV=production`.
- **Artifacts:** Copy only `.next/standalone`, `.next/static`, and `public`.
- **Execution:** `node server.js` (The standalone entry point).
