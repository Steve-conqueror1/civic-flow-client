# Spec for Issue Location Selection

branch: claude/feature/issue-location-selection

## Summary

At step 2 of the new request wizard ("Issue Location"), the citizen must be able to set a precise map location for their issue — either by typing an address in the search box or by pressing "Use My Location" to detect their GPS position. The selected coordinates and resolved address must be persisted in shared wizard state so that step 4 ("Issue Review") can display and ultimately submit the location alongside the rest of the request data.

## Functional Requirements

- The `LocationPicker` component at step 2 must accept and call back with a resolved address string, latitude, and longitude.
- Typing in the address search box should trigger a geocoding lookup (Mapbox Geocoding API) and move the map pin to the first matching result.
- Pressing "Use My Location" should call the browser Geolocation API, obtain the user's coordinates, reverse-geocode them to a human-readable address, and move the map pin to those coordinates.
- The map marker must update in real time as the resolved location changes.
- The resolved location data (address, latitude, longitude) must be stored in shared wizard state that survives step navigation (moving forward to step 3, backward to step 1, then back to step 2).
- Step 4 ("Issue Review") must read and display the saved location — address label, and a small static map preview or coordinate display.
- The location data must be included in the final submission payload sent when the user confirms at step 4.
- Step 2 must be considered complete (allowing progression to step 3) only when a location has been selected.

## Possible Edge Cases

- The browser Geolocation API is denied or unavailable — show a clear inline error and leave the map at its default position.
- The geocoding API returns no results for the typed address — show an inline "No results found" message without crashing.
- The user clears the search box after previously selecting a location — reset the confirmed location state and block progression.
- The user navigates away from step 2 and returns — the previously selected location must be restored in both the input and the map pin.
- Network failure during geocoding — surface a user-friendly error and allow retry.

## Acceptance Criteria

- [ ] Typing a valid address and selecting a result moves the map pin and stores the location in wizard state.
- [ ] Pressing "Use My Location" (with permission granted) moves the pin to the user's GPS position and stores the resolved address.
- [ ] Pressing "Use My Location" when permission is denied shows an inline error message.
- [ ] Navigating away from step 2 and returning restores the previously selected address and pin position.
- [ ] Step 2's "Next" button is disabled until a location is confirmed.
- [ ] Step 4 displays the confirmed address.
- [ ] The final submission payload includes latitude, longitude, and address.

## Open Questions

- Should address search use Mapbox Geocoding directly from the client, or go through a backend proxy? use backend proxy, endpoint already implemented
- Should the user be able to drag the map pin to fine-tune the location, and if so, does drag also update the stored address via reverse geocoding? yes
- Is a country/province bounding box filter required for address search (e.g., restrict results to Alberta)?, restrict to alberta

## Testing Guidelines

Create a test file in `tests/components/requests/` covering:

- `LocationPicker` calls `onAddressChange` with the typed value when the search input changes.
- `LocationPicker` calls `onUseMyLocation` when the "Use My Location" button is clicked.
- Wizard state correctly stores and restores location data when navigating between steps.
- Step 2 blocks progression (`canProceed: false`) when no location is confirmed, and allows it when one is set.
- Step 4 renders the confirmed address from wizard state.
