# Plan: Mapbox Map Component (MapView)

## Context

The CivicFlow platform needs a reusable interactive map component for location-based features (e.g. service request submission, request detail view). The spec calls for a `MapView` component using Mapbox GL, defaulting to a marker on Sylvan Lake, Alberta. Both `mapbox-gl` (v3) and `react-map-gl` (v8) are already installed. The `components/maps/` directory exists but is empty — it was scaffolded as a stub and is ready to fill.

---

## Implementation Steps

### 1. Create `components/maps/MapView.tsx`

- Add `"use client"` directive (Mapbox GL requires browser APIs / WebGL)
- Define props interface:
  - `longitude?: number` — default: `-114.097` (Sylvan Lake)
  - `latitude?: number` — default: `52.309` (Sylvan Lake)
  - `zoom?: number` — default: `11`
  - `markerLabel?: string` — optional popup label on the marker
  - `height?: string` — default: `"400px"`
- Read token from `process.env.NEXT_PUBLIC_MAPBOX_TOKEN`
- If token is falsy → render a visible fallback `<div>` with an error message (no map attempt)
- If token is present → render `<Map>` from `react-map-gl` with:
  - `mapboxAccessToken` prop
  - `initialViewState` set from props/defaults
  - `mapStyle="mapbox://styles/mapbox/streets-v12"`
  - A `<Marker>` from `react-map-gl` at the given coordinates using a Lucide `MapPin` icon
  - If `markerLabel` is provided, render a `<Popup>` anchored to the marker

### 2. Create `components/maps/index.ts`

Simple default re-export barrel matching the existing project pattern:
```
export { default } from "./MapView"
```

### 3. Create `tests/components/MapView.test.tsx`

Mapbox GL requires WebGL which jsdom doesn't support. Mock both `mapbox-gl` and `react-map-gl` at the module level using `vi.mock`.

Mock strategy:
- `vi.mock("mapbox-gl", ...)` — stub out the Map class and its methods
- `vi.mock("react-map-gl", ...)` — return lightweight stub components (`Map`, `Marker`, `Popup`) that render their children as plain divs

Test cases (minimal):
1. Renders a container element without crashing when a valid token env var is set
2. Renders a fallback/error element when the token env var is absent
3. Accepts custom `longitude`, `latitude`, `zoom` props without throwing
4. Renders a marker element in the DOM when coordinates are provided

### 4. Update `app/preview/page.tsx`

Add a labeled `MapView` section at the bottom with a wrapping `<div className="px-4">`. Import `MapView` from `@/components/maps`.

---

## Critical Files

| File | Action |
|---|---|
| `components/maps/MapView.tsx` | Create (new) |
| `components/maps/index.ts` | Create (new) |
| `tests/components/MapView.test.tsx` | Create (new) |
| `app/preview/page.tsx` | Edit — add MapView preview section |

---

## Reuse / Dependencies

- `react-map-gl` (`^8.1.0`) — use `Map`, `Marker`, `Popup` components
- `mapbox-gl` (`^3.19.1`) — peer dep of react-map-gl, already installed
- `NEXT_PUBLIC_MAPBOX_TOKEN` — confirmed present in `.env`
- `MapPin` from `lucide-react` — marker pin visual
- Tailwind classes following existing card/surface patterns

---

## Verification

1. `npm run dev` → visit `/preview`, confirm map renders centred on Sylvan Lake with a visible marker pin
2. Temporarily remove token from `.env` → confirm a non-crashing fallback UI appears
3. `npm test tests/components/MapView.test.tsx` → all tests pass
4. `npm run build` → no SSR errors (Mapbox GL must not be imported server-side)
