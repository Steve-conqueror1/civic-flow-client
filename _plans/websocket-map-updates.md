# Plan: WebSocket Map Updates Integration

branch: claude/feature/websocket-map-updates
spec: \_specs/websocket-map-updates.md

## Context

`HeroImageCard` (`components/HeroSection/HeroMapCard.tsx`) already has a stub Socket.IO listener that logs `new_featured_case` events but does nothing with them. The map renders a hardcoded static marker. This plan wires up the real data flow: initial featured case from the REST API, live updates via Socket.IO, both reflected as a single map marker and status card.

The spec confirms only **one** featured service request exists at a time — the socket replaces the current case, it never accumulates.

---

## Files to Change

| File                                                | Change                                                |
| --------------------------------------------------- | ----------------------------------------------------- |
| `app/types/request.ts`                              | Define `FeaturedServiceRequest` and API response type |
| `app/state/api.ts`                                  | Add `getFeaturedServiceRequest` RTK Query endpoint    |
| `components/HeroSection/HeroMapCard.tsx`            | Full implementation                                   |
| `tests/components/HeroSection/HeroMapCard.test.tsx` | New test file                                         |

---

## Step 1 — Define Types (`app/types/request.ts`)

Add two types:

- `FeaturedServiceRequest` — the shape of a featured case returned by the API. Needs at minimum: `id`, `title`, `status`, `latitude`, `longitude`, `address`, `createdAt`.
- `GetFeaturedServiceRequestResponse` — standard wrapper: `{ success: boolean; message: string; data: { serviceRequest: FeaturedServiceRequest } }` following the existing convention in `app/types/department.ts` and `app/types/user.ts`.

---

## Step 2 — Add RTK Query Endpoint (`app/state/api.ts`)

- Add `"FeaturedServiceRequest"` to `tagTypes`.
- Add a `getFeaturedServiceRequest` query endpoint:
  - URL: `GET /service-requests/featured`
  - Return type: `GetFeaturedServiceRequestResponse`
  - Argument type: `void`
  - `providesTags: ["FeaturedServiceRequest"]`
- Export the generated `useGetFeaturedServiceRequestQuery` hook.

---

## Step 3 — Rewrite `HeroImageCard` (`components/HeroSection/HeroMapCard.tsx`)

### Remove module-level socket instantiation

The current `const socket = io(...)` at the top of the file runs at import time (including during SSR). Move socket creation inside `useEffect`.

### State

- `useState<FeaturedServiceRequest | null>` — `featuredCase`, initialised from the RTK Query result, then updated by socket events.

### Initial data

- Call `useGetFeaturedServiceRequestQuery()`.
- On success, set `featuredCase` from the response.
- While loading, show a skeleton/loading state in the status card area.
- On error, show an error message in the status card.

### Socket.IO effect

- Inside `useEffect`, create the socket: `io(process.env.NEXT_PUBLIC_BASE_URL!)`.
- Listen to `new_featured_case`. When fired, compare incoming `id` to current state via functional setter. If different, update state.
- Cleanup: `socket.off("new_featured_case")` + `socket.disconnect()` on unmount.
- Dependency array: empty `[]` — the listener reads state via the setter, not directly.

### Map + status card

- Pass `featuredCase.latitude`, `featuredCase.longitude`, and `featuredCase.address` as props to `MapView` (which already supports these via existing props).
- Replace hardcoded status card text with `featuredCase.title`, `featuredCase.status`, `featuredCase.createdAt`.
- When `featuredCase` is null (initial load or error), the map renders with its default Edmonton coordinates and no label — `MapView` already handles optional props gracefully.

---

## Step 4 — Tests (`tests/components/HeroSection/HeroMapCard.test.tsx`)

### Mock strategy

- Mock `socket.io-client` with `vi.mock("socket.io-client", ...)` — return a fake socket with `on`, `off`, `disconnect` as `vi.fn()`.
- Mock `useGetFeaturedServiceRequestQuery` via `vi.mock("@/app/state/api")` — control `isLoading`, `isError`, and `data` per test.
- Mock `@/components/maps` (MapView) with a simple `<div data-testid="map" />` so react-map-gl doesn't run in jsdom.

### Test cases

1. Renders the address/title from the initial API response in the status card.
2. Shows a loading indicator while `isLoading` is true.
3. Shows an error message when `isError` is true.
4. Calls `socket.on("new_featured_case", ...)` on mount.
5. Calls `socket.off` and `socket.disconnect` on unmount.
6. When the socket emits a new case with a different ID, the status card updates to the new data.
7. When the socket emits a case with the same ID as the current one, the status card content does not change (deduplication).

---

## Verification

1. `npm run dev` — visit the landing page; map should show the fetched featured case marker and label.
2. Trigger a `new_featured_case` socket event from the server; the map and status card should update without a page reload.
3. `npm run test` — all new tests pass, no regressions.
4. `npm run lint` — no ESLint errors.

## Important

# Response `GET /service-requests/featured` Shape

{
"success": true,
"message": "string",
"data": {
"id": "string",
"userId": "string",
"serviceId": "string",
"title": "string",
"description": "string",
"note": "string | null",
"status": "string",
"location": {
"lat": "number",
"lng": "number",
"address": "string"
},
"attachments": ["string"],
"assignedTo": "string | null",
"priority": "number",
"aiSummary": "string",
"submittedAt": "ISO date string",
"resolvedAt": "ISO date string | null",
"createdAt": "ISO date string",
"updatedAt": "ISO date string"
}
}

# Socket Emit shape

{
"id": "string",
"userId": "string",
"serviceId": "string",
"title": "string",
"description": "string",
"note": "string | null",
"status": "string",
"location": {
"lat": "number",
"lng": "number",
"address": "string"
},
"attachments": ["string"],
"assignedTo": "string | null",
"priority": "number",
"aiSummary": "string",
"submittedAt": "ISO date string",
"resolvedAt": "ISO date string | null",
"createdAt": "ISO date string",
"updatedAt": "ISO date string"
}
