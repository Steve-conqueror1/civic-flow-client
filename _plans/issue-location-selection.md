# Plan: Issue Location Selection (Step 2 Wizard)

## Context

Step 2 of the new request wizard renders `IssueLocation` / `LocationPicker` but the selected location is never captured — there are no callbacks wired, no shared state, and `IssueReview` (step 4) displays hardcoded placeholder data. This plan wires up real geocoding, geolocation, draggable pin, and shared wizard state so the confirmed location flows through to step 4 and the final submission.

---

## Architecture Decision

Follow the existing callback-lifting pattern (same as `hasAnalysis` in step 1): a `useRequestWizard` hook owns wizard state; the page component holds it and passes it down as props to the step content JSX (which closes over it). No Context or Redux needed — all step content is defined inside the page component body.

**Reverse geocoding note:** The backend only has forward geocoding (`GET /v1/geocode`). Drag-end and "Use My Location" will call the Mapbox REST reverse-geocode API directly from the client using `NEXT_PUBLIC_MAPBOX_TOKEN` (already exposed in `MapView.tsx`).

**Alberta scoping:** Append `", Alberta"` to the search query string in `LocationPicker` before calling the RTK Query trigger — not inside the endpoint definition.

---

## Implementation Steps (in dependency order)

### 1. Create `app/types/geocode.ts` (new file)

Define:

- `GeocodeResult` — `{ placeName, longitude, latitude, placeType: string[] }`
- `SearchGeocodesQuery` — `{ q: string; limit?: number }`
- `SearchGeocodesResponse` — `{ success: boolean; data: { results: GeocodeResult[] } }`
- `WizardLocation` — `{ address: string; latitude: number; longitude: number }`

### 2. Update `app/state/api.ts`

- Add `"Geocode"` to `tagTypes`
- Add `searchGeocodes` lazy query: `GET /v1/geocode?q=<q>&limit=<limit>` using `URLSearchParams` (same pattern as `searchServices`)
- Export `useLazySearchGeocodesQuery`

### 3. Implement `app/hooks/use-request-wizard.ts`

Replace the empty stub with a hook that returns:

- `location: WizardLocation | null` (init `null`)
- `setLocation: (loc: WizardLocation) => void` (useCallback)
- `clearLocation: () => void` (useCallback)

Export `UseRequestWizardReturn` type.

### 4. Add draggable marker to `components/maps/MapView.tsx`

Add optional props (all existing call sites unaffected):

- `draggable?: boolean`
- `onLocationChange?: (longitude: number, latitude: number) => void`

On `<Marker>`: add `draggable={draggable ?? false}` and `onDragEnd` handler that extracts `event.lngLat.lng/lat` and calls `onLocationChange?.()`.
`onLocationChange` must be wrapped in `useCallback` at the call site (LocationPicker) to keep `React.memo` effective.

### 5. Overhaul `components/requests/LocationPicker.tsx`

**Updated props:**

- Replace loose event callbacks with `onLocationConfirm: (loc: WizardLocation) => void` and `onLocationClear: () => void`
- Keep `selectedAddress?`, `longitude?`, `latitude?`, `height?` as controlled display props

**New internal state:** `searchInput`, `searchResults`, `showDropdown`, `isSearching`, `isLocating`, `isReverseGeocoding`, `geoError`

**Debounced search (300ms):** `useEffect` on `searchInput` → call `triggerSearchGeocodes({ q: \`${input}, Alberta\`, limit: 5 })` → populate dropdown

**Dropdown:** Absolute-positioned `<ul>` below search input (`z-20`). Use `onMouseDown` + `preventDefault` on items to prevent blur-before-click. Selecting an item calls `onLocationConfirm` and closes dropdown.

**Use My Location:**

1. `navigator.geolocation.getCurrentPosition`
2. On success → `fetch` Mapbox reverse-geocode REST API → extract `features[0].place_name` → call `onLocationConfirm`
3. On error → set `geoError` with user-friendly message per error code

**Drag end (`handleDragEnd`):**

1. `fetch` Mapbox reverse-geocode REST API with new coords
2. On success → call `onLocationConfirm` with new address + coords; update `searchInput`
3. On failure → show `geoError`, leave existing confirmed location unchanged

**Edit button:** Calls `onLocationClear()` + resets all local state

**Pass to MapView:** `draggable={true}`, `onLocationChange={handleDragEnd}` (stable `useCallback`)

### 6. Update `components/requests/IssueLocation.tsx`

Add props: `location: WizardLocation | null`, `onLocationConfirm`, `onLocationClear`
Pass through to `<LocationPicker>` (`selectedAddress={location?.address}`, `longitude={location?.longitude}`, `latitude={location?.latitude}`)

### 7. Update `components/requests/IssueReview.tsx`

Add props: `location: WizardLocation | null`

- Replace `REVIEW_DATA.address` with `location?.address ?? "No location selected"`
- Activate the commented-out `<MapView />` placeholder — pass `longitude`, `latitude`, `height="128px"`. Read-only (no `draggable`).

### 8. Wire `app/dashboard/requests/new/page.tsx`

```
const { location, setLocation, clearLocation } = useRequestWizard()
```

- Step 2: `content: <IssueLocation location={location} onLocationConfirm={handleLocationConfirm} onLocationClear={handleLocationClear} />`, `canProceed: location !== null`
- Step 4: `content: <IssueReview location={location} />`
- Wrap handlers in `useCallback`

---

## Key Behavioral Notes

- `MapView`'s existing `flyTo` effect already animates to new coords whenever `longitude`/`latitude` props change — drag, search result selection, and geolocation all get the fly animation for free.
- `forceMount` renders all steps simultaneously — `location` state changes re-render both `IssueLocation` (step 2) and `IssueReview` (step 4) even when only one is visible. This is correct.
- RTK Query `isError` from the lazy query should show an inline error below the search input.

---

## Verification

1. Run `npm run dev` and navigate to `/dashboard/requests/new`
2. Complete step 1 → advance to step 2
3. Type an address → confirm dropdown appears with Alberta-scoped results → select result → map pin moves → "Next" unlocks
4. Click "Use My Location" (allow) → pin moves to GPS position → address populates
5. Drag pin → address updates via reverse geocode
6. Click "Edit" → location resets, "Next" re-locks
7. Navigate forward to step 4 → confirm address displayed and small map shows correct pin
8. Run `npm run test` — all existing tests still pass
