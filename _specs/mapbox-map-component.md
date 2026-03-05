# Spec for Mapbox Map Component

branch: claude/feature/mapbox-map-component

## Summary

Build a reusable `MapView` component using Mapbox GL JS that renders an interactive map centred on a given location and displays a marker pin. The initial use case is displaying "Sylvan Lake, Alberta" with a marker. The component will live in `components/maps/` and be usable across citizen-facing pages (e.g. service request submission, request detail view).

## Functional Requirements

- Render a Mapbox GL map using the token from `NEXT_PUBLIC_MAPBOX_TOKEN`
- Accept a `longitude`, `latitude`, and optional `zoom` prop to control the initial viewport
- Default coordinates to Sylvan Lake, Alberta (approx. -114.097, 52.309) when no props are provided
- Display a marker pin at the specified coordinates
- Accept an optional `markerLabel` prop shown as a tooltip/popup on the marker
- The map must be responsive and fill its container width
- The component must be client-side only (`"use client"`) since Mapbox GL requires browser APIs
- Gracefully handle a missing or invalid token by rendering a visible error/fallback state instead of crashing

## Possible Edge Cases

- `NEXT_PUBLIC_MAPBOX_TOKEN` is undefined or empty — render a fallback placeholder with an error message
- Invalid coordinates (out of range) — clamp or show an error state
- Component unmount before map initialization completes — clean up the Mapbox instance to avoid memory leaks
- SSR environment — ensure no server-side import of `mapbox-gl` causes a build error

## Acceptance Criteria

- A map renders visibly in the browser centred on Sylvan Lake, Alberta by default
- A marker pin appears at the target coordinates
- Passing custom `longitude`/`latitude` props re-centres the map and moves the marker
- When `NEXT_PUBLIC_MAPBOX_TOKEN` is absent the component renders a non-crashing fallback UI
- The component is added to `app/preview/page.tsx` for visual inspection
- All Vitest tests pass

## Open Questions

- Should the marker support click interaction (e.g. open a popup with address details)? yes
- Is a fixed aspect-ratio container expected, or should height be a prop? occupy the full width and height of the container in which it's inserted
- Should the map style (streets, satellite, etc.) be configurable via a prop? yes

## Testing Guidelines

Create `tests/components/MapView.test.tsx` and cover the following cases without going too heavy:

- Renders a container element without crashing when a valid token is provided
- Renders a fallback/error element when `NEXT_PUBLIC_MAPBOX_TOKEN` is not set
- Accepts and applies custom `longitude`, `latitude`, and `zoom` props without throwing
- Marker is present in the DOM when coordinates are provided
