# Plan: Service Detail Page API Integration

## Context

The service detail page (`app/(public)/services/[slug]/page.tsx`) currently renders entirely hardcoded content — title, description, requirements, and FAQs are all static placeholder data. This plan wires it to the live `GET /v1/services/{slug}` API endpoint so each service page renders real data. Requirements and FAQs stay hardcoded as confirmed in the spec (the API does not return those fields).

---

## Key observations

- The API response wraps the service under `data.service` (not `data` directly like the existing `SingleServiceResponse`).
- The slug endpoint returns: `id`, `name`, `slug`, `description`, `instructions`, `departmentId`, `departmentName`, `categoryId`, `categoryName`, `minResponseDays`, `maxResponseDays`.
- The page is an RSC (`async` function) — RTK Query hooks cannot be used here. Data fetching must use `fetch()` directly.
- The RTK Query endpoint is still added to `api.ts` for potential client-side use elsewhere.
- No existing `notFound()` usage in the project — this will be the first.

---

## Files to modify

| File                                    | Change                                                             |
| --------------------------------------- | ------------------------------------------------------------------ |
| `app/types/service.ts`                  | Add `ServiceDetail` type and `GetServiceBySlugResponse`            |
| `app/state/api.ts`                      | Add `getServiceBySlug` endpoint, export `useGetServiceBySlugQuery` |
| `app/(public)/services/[slug]/page.tsx` | Fetch from API, replace all hardcoded content                      |

---

## Step-by-step implementation

### 1. `app/types/service.ts` — add new types

Add a `ServiceDetail` type capturing the slug endpoint's richer response shape (flat `departmentName`/`categoryName` fields not present on `Service`):

```
ServiceDetail {
  id, name, slug, description, instructions,
  departmentId, departmentName,
  categoryId, categoryName,
  minResponseDays, maxResponseDays
}
```

Add `GetServiceBySlugResponse`:

```
{
  success: boolean;
  message: string;
  data: { service: ServiceDetail };
}
```

### 2. `app/state/api.ts` — add RTK Query endpoint

Add `getServiceBySlug` query endpoint:

- URL: `/services/${slug}` (slug arg is a `string`)
- `providesTags: ["Services"]`
- Response type: `GetServiceBySlugResponse`
- Import `GetServiceBySlugResponse` and `ServiceDetail` at the top
- Export `useGetServiceBySlugQuery` in the destructured exports at the bottom

### 3. `app/(public)/services/[slug]/page.tsx` — wire to API

**Data fetching** (RSC — use `fetch()` directly, not a hook):

- Fetch `${process.env.NEXT_PUBLIC_API_BASE_URL}/services/${slug}`
- If `!response.ok` or `data.success === false` → call `notFound()` from `next/navigation`

**Hardcoded data to move inside component** (not remove):

- `requirements` array stays hardcoded inside the component body
- `faqs` array stays hardcoded inside the component body

**Build breadcrumb** from API response:

```
[
  { label: "Services", href: "/services" },
  { label: service.categoryName, href: `/services?category=${service.categoryId}` },
  { label: service.name },
]
```

**Resolution time helper** (small inline helper):

- If `min === max` → `"${min} Business Day${min === 1 ? '' : 's'}"`
- Otherwise → `"${min}–${max} Business Days"`

**Component props mapping**:

- `ServiceHero`: `title=service.name`, `description=service.description`, keep a default icon (e.g. `<Wrench>` from lucide-react; remove `Construction` import)
- `ServiceDescriptionCard`: `paragraphs=[service.instructions]`
- `ServiceRequirementsCard`: pass hardcoded `requirements` array unchanged
- `ServiceResolutionCard`: `resolutionTime=formatResolutionTime(min, max)`, `serviceName=service.name`, `startHref=/services/${slug}/new`, keep existing `note` text
- `ServiceFAQAccordion`: pass hardcoded `faqs` array unchanged

---

## Verification

1. `npm run lint` — no new type or lint errors
2. `npm run build` — clean build
3. `npm run test` — new test file covers:
   - Correct render from mocked API response (name, description, resolution time)
   - `notFound()` called on non-ok fetch response
   - Resolution time range: `"2–5 Business Days"` when min ≠ max
   - Resolution time single: `"3 Business Days"` when min === max
   - Breadcrumb second item uses `categoryName` from API
