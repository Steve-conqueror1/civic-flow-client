# Spec for websocket-map-updates

branch: claude/feature/websocket-map-updates

## Summary

Integrate real-time WebSocket updates into the HeroMapCard component. The map initially loads featured service request data from the REST API, then stays live by listening for `new_featured_case` Socket.IO events. When a new event is received, the map pins/markers are updated without a full reload.

## Functional Requirements

- On mount, fetch featured service requests from `GET /service-requests/featured` and render them as map markers
- Establish a Socket.IO connection and subscribe to the `new_featured_case` event
- When a `new_featured_case` event is received, add or update the corresponding marker on the map without clearing existing ones
- Disconnect the Socket.IO listener cleanly on component unmount to prevent memory leaks
- Display a loading state while the initial API fetch is in progress
- Display an error state if the initial API fetch fails
- The Socket.IO connection must use the same base URL as the REST API (`NEXT_PUBLIC_API_BASE_URL`)

## Possible edge cases (only if referenced)

- Duplicate events: the same featured case may be emitted more than once; the map should deduplicate by case ID
- Stale data: a `new_featured_case` event may arrive before the initial API fetch completes; buffered events should be applied after the initial load finishes
- Connection loss: Socket.IO will attempt reconnection automatically; no special UI is required for reconnect attempts beyond what Socket.IO provides by default
- Empty featured list: the API may return an empty array; the map should render without markers and handle the empty state gracefully

## Acceptance Criteria

- The map renders featured service request markers on initial page load from `GET /service-requests/featured`
- New markers appear on the map in real time when a `new_featured_case` Socket.IO event is received
- No duplicate markers appear if the same case ID is received more than once
- The Socket.IO connection is closed when the component unmounts
- Loading and error states are visible to the user during and after the initial fetch

## Open Questions

- Should `new_featured_case` events replace existing markers for the same case ID, or only add new ones? only one case is emmited(featured)
- Is there a maximum number of featured cases to display on the map at once? always one, one marker
- Should the map auto-pan/zoom to include a newly received marker, or remain at the current viewport? - Always one marker

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Renders map markers from the initial `GET /service-requests/featured` response
- Shows a loading indicator while the initial fetch is pending
- Shows an error message when the initial fetch fails
- Adds a new marker when a `new_featured_case` Socket.IO event is received
- Does not add a duplicate marker when the same case ID is emitted twice
- Disconnects the Socket.IO listener on component unmount

## IMPORTANT

- Only one marker to be shown on the map
- Only one service request is returned by the API `GET /service-requests/featured`
