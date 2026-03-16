# Spec for Service Detail Page API Integration

branch: claude/feature/service-detail-page-api

## Summary

Wire the public service detail page (`app/(public)/services/[slug]/page.tsx`) to live API data by adding a `GET /v1/services/{slug}` endpoint to the RTK Query API layer. The page currently renders fully static/hardcoded content (title, description, requirements, FAQs). After this change it will fetch real service data from the API using the URL `slug` param and render it dynamically. Matching type definitions will be added to `app/types/service.ts`.

## Functional Requirements

- Add a `GetServiceBySlugResponse` type to `app/types/service.ts` that models the response shape for `GET /v1/services/{slug}`.
- Add a `getServiceBySlug` RTK Query endpoint in `app/state/api.ts` that calls `/v1/services/{slug}` and uses the `"Services"` cache tag.
- The `Service` type should be extended (or a new `ServiceDetail` type introduced) if the slug-based response returns richer fields not present in the current `Service` type (e.g. `faqs`, `requirements`, `category`, `department` objects).
- The `ServicePage` component must:
  - Call `getServiceBySlug` with the `slug` from route params (server component — use `fetch` or the RTK Query server-side approach consistent with the project pattern).
  - Render the `ServiceHero`, `ServiceDescriptionCard`, `ServiceRequirementsCard`, `ServiceResolutionCard`, and `ServiceFAQAccordion` components using live data from the API response.
  - Pass `resolutionTime` derived from `minResponseDays` / `maxResponseDays` on the service (e.g. "2–3 Business Days").
  - Pass `startHref={/services/${slug}/new}` as currently hardcoded.
- If the API returns a 404 or the service is inactive, the page must call Next.js `notFound()`.
- All previously hardcoded static arrays (`breadcrumbs`, `requirements`, `faqs`) and placeholder strings should be replaced with live data or removed if the API does not provide equivalents.

## Possible edge cases (only if referenced)

- The `slug` may not correspond to any service — handle with `notFound()`.
- `minResponseDays` and `maxResponseDays` may be equal — render as a single value (e.g. "2 Business Days") instead of a range.
- The API may return an inactive service; the public page should not display it (treat as not found).
- FAQs and requirements fields may be absent if the API does not yet expose them — components should gracefully handle empty arrays.

## Acceptance Criteria

- `app/types/service.ts` contains a `GetServiceBySlugResponse` type (and any supporting types) for `GET /v1/services/{slug}`.
- `app/state/api.ts` exports a `useGetServiceBySlugQuery` hook from a new `getServiceBySlug` endpoint.
- `app/(public)/services/[slug]/page.tsx` fetches service data using the slug and renders the page entirely from the API response — no hardcoded service content remains.
- Navigating to `/services/pothole-repair` (or any valid slug) renders the correct service name, description, and resolution time.
- Navigating to `/services/nonexistent-slug` triggers a Next.js 404 page.
- The breadcrumb second item ("Infrastructure" etc.) reflects the service's actual category name from the API response.
- `npm run build` and `npm run lint` pass with no new errors.

## Open Questions

- Does `GET /v1/services/{slug}` return `faqs` and `requirements` as structured arrays, or are those fields not yet available from the backend? If not available, the `ServiceFAQAccordion` and `ServiceRequirementsCard` should either be hidden or receive empty arrays. no faqs or requirements, keep them hard coded.
- Should the page be fully server-rendered (RSC) or does it need client-side data fetching (e.g. for future interactivity)? Current architecture uses RSC with `async` page components — maintain that pattern unless there is a reason to change. server render
- Does the API response include a `category` object with `name` and `slug` for the breadcrumb, or only a `categoryId`?

## API Response example

```json
{
  "success": true,
  "message": "Service retrieved successfully.",
  "data": {
    "service": {
      "id": "52745393-ca25-40ac-90b3-9f877cca61e6",
      "name": "Snow Removal Status",
      "slug": "snow-removal-status",
      "description": "Check or report snow removal and street plowing updates.",
      "instructions": "Submit the street name and area where snow removal is required.",
      "departmentId": "821147c0-bb3d-4539-91cb-50936699a251",
      "departmentName": "Roads & Traffic",
      "categoryId": "818f8cf2-0043-4125-a15b-2c1a1519736c",
      "categoryName": "Infrastructure"
    }
  }
}
```

## Testing Guidelines

Create a test file at `tests/app/(public)/services/[slug]/page.test.tsx` (or a suitable mirror path) and cover:

- Renders service name, description, and resolution time correctly when the API returns a valid service.
- Calls `notFound()` when the API returns a 404 or the service is inactive.
- Resolution time string is correctly formatted as a range ("2–5 Business Days") when `minResponseDays !== maxResponseDays`.
- Resolution time string is correctly formatted as a single value ("3 Business Days") when `minResponseDays === maxResponseDays`.
- Breadcrumb displays the correct category label from the API response.
