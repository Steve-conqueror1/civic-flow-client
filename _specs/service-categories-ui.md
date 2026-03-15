# Spec for Service Categories UI

branch: claude/feature/service-categories-ui

## Summary

Replace the hardcoded `categories` array in `app/(public)/services/page.tsx` with live data fetched from the API using `useGetServicesGroupedByCategoryQuery`. Each category group should include up to 2 services, and the data should be passed into the existing `ServiceCategoryCard` component. The card's current props interface must be reconciled with what the API returns — some fields (icon, color classes) will require a client-side mapping strategy.

The `ServiceCategoryCard` component currently receives: `name`, `description`, `responseTime`, `icon`, `iconBgClass`, `iconColorClass`, `services` (array of `{ name, href }`), `viewAllHref`, and `viewAllLabel`. The API grouped response provides `category.id`, `category.name`, and `services[]` (Service objects with `minResponseDays`, `maxResponseDays`, etc.). The gap between the two must be bridged.

## Functional Requirements

- Replace the static `categories` array in the services page with a call to `useGetServicesGroupedByCategoryQuery({ limit: 2 })`.
- Each category group returned by the API must be mapped to a `ServiceCategoryCard`.
- The `services` prop passed to the card must contain the first 2 services from the group's `services` array, each with a `name` and a constructed `href` (e.g. `/submit?serviceId={service.id}` or `/services/{categoryId}/{service.id}`).
- The `responseTime` string must be derived from the `minResponseDays` and `maxResponseDays` of the first service in the group (e.g. `"Response: 2-5 days"`).
- The `viewAllHref` must link to a filtered services page or category route using the `category.id`.
- The `viewAllLabel` must read "View all {category.name} services".
- A client-side icon map must associate category names or IDs with a Lucide icon component, a background class, and a color class. Categories not found in the map must fall back to a generic icon.
- While the query is loading, the category section must render skeleton placeholders in place of the cards.
- If the query returns an error or an empty groups array, a fallback message must be shown in the category section.

## Possible edge cases (only if referenced)

- A category group returned by the API may have zero services — the card must still render without the services list.
- `minResponseDays` and `maxResponseDays` may be equal — the response time string should handle this (e.g. `"Response: 3 days"` rather than `"Response: 3-3 days"`).
- A category name not present in the icon map must not crash the render — it must silently fall back to a default icon.
- The API may return more than the expected number of groups — all groups must be rendered, not just the first N.

## Acceptance Criteria

- The services page fetches categories from the API on load — no static `categories` array remains.
- Each `ServiceCategoryCard` renders with live `name`, `description` (if available from API, otherwise a sensible default), `responseTime`, up to 2 service links, and a working "view all" link.
- Loading state: skeleton cards are shown while `isLoading` is true.
- Error state: a visible error message is shown when `isError` is true.
- Empty state: a fallback message is shown when the groups array is empty.
- Icon and color classes are applied via a local mapping; unmapped categories render with a fallback icon without errors.
- TypeScript compiles with no errors (`npm run build`).

## Open Questions

- Does the `category` object from the grouped API response include a `description` field, or only `id` and `name`? If not, should `description` be omitted from the card or replaced with a static placeholder? Static place holder for now, it will be added later.
- What should the `href` for each service link point to — a service detail page, the submission wizard pre-filled with that service, or another route? remove the link, just a normal text.
- Should the icon/color map be defined inline in the page, or extracted to a shared utility (e.g. `lib/category-icons.ts`)? shared utility
- Should the `viewAllHref` use the category `id` or `name` (slugified) in the URL path? name (slugified)

## Testing Guidelines

Create or update `tests/components/ServiceCategoryCard.test.tsx` and add a test file for the services page data-fetching logic.

- Test that `ServiceCategoryCard` renders the category name, description, response time, and service links correctly given valid props.
- Test that `ServiceCategoryCard` renders without crashing when `services` is an empty array.
- Test that the response time string displays correctly when `minResponseDays === maxResponseDays`.
- Test that the services page renders skeleton placeholders when the query is loading.
- Test that the services page renders an error message when the query returns an error.
- Test that the services page renders the correct number of `ServiceCategoryCard` instances matching the number of groups returned.
