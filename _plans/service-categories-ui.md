# Plan: Service Categories UI

## Context

The services page (`app/(public)/services/page.tsx`) currently renders the "Browse by Category" section using a hardcoded `categories` array. The API layer is already wired — `useGetServicesGroupedByCategoryQuery` exists and returns `{ data: { groups: [{ category: { id, name }, services: Service[] }] } }`. This plan replaces the static data with live API data, handles all UI states (loading, error, empty), and aligns the `ServiceCategoryCard` component with the spec's requirement that service items are plain text (not links).

---

## Step 1 — Update `ServiceCategoryCard` props

**File:** `components/services/ServiceCategoryCard.tsx`

- Remove `href` from the `ServiceLink` interface — it becomes `{ name: string }` only.
- Replace `<Link href={service.href} ...>` with a plain `<span>` styled the same way (keep the `ChevronRight` icon and text, drop hover/link classes).
- No other changes to the component.

---

## Step 2 — Create `lib/category-icons.ts`

**File to create:** `lib/category-icons.ts`

Define a `getCategoryIcon(name: string)` function that returns `{ icon: ComponentType<LucideProps>, iconBgClass: string, iconColorClass: string }`.

Use case-insensitive keyword matching on the category name. Suggested mappings:

| Keyword                               | Icon          | BgClass                                 | ColorClass                               |
| ------------------------------------- | ------------- | --------------------------------------- | ---------------------------------------- |
| "infrastructure" / "road" / "traffic" | `TrafficCone` | `bg-blue-100 dark:bg-blue-900/30`       | `text-primary`                           |
| "permit" / "licens"                   | `FileText`    | `bg-indigo-100 dark:bg-indigo-900/30`   | `text-indigo-600 dark:text-indigo-400`   |
| "social" / "housing" / "family"       | `Users`       | `bg-purple-100 dark:bg-purple-900/30`   | `text-purple-600 dark:text-purple-400`   |
| "safety" / "emergency" / "fire"       | `Shield`      | `bg-red-100 dark:bg-red-900/30`         | `text-red-600 dark:text-red-400`         |
| "environment" / "park" / "waste"      | `Leaf`        | `bg-emerald-100 dark:bg-emerald-900/30` | `text-emerald-600 dark:text-emerald-400` |
| fallback                              | `HelpCircle`  | `bg-slate-100 dark:bg-slate-800`        | `text-slate-500 dark:text-slate-400`     |

The function checks the name string against each keyword group (using `toLowerCase().includes()`) and returns the first match, or the fallback.

---

## Step 3 — Create `ServiceCategoriesSection`

**File to create:** `components/services/ServiceCategoriesSection.tsx`

This is a `"use client"` component. It:

1. Calls `useGetServicesGroupedByCategoryQuery({ limit: 2 })`.
2. **Loading state**: Renders 3 `<Skeleton>` placeholder cards (`components/ui/skeleton`) with a fixed height matching a typical card.
3. **Error state**: Renders an inline error message within the section.
4. **Empty state**: Renders a fallback message when `groups` is an empty array.
5. **Success state**: Maps each group to a `ServiceCategoryCard` with:
   - `name` → `group.category.name`
   - `description` → `"Explore services in this category."` (static placeholder per spec)
   - `responseTime` → derived from the first service in `group.services`: if `minResponseDays === maxResponseDays`, format as `"Response: X days"`; otherwise `"Response: X–Y days"`. If the group has no services, show `"Response: varies"`.
   - `services` → `group.services.slice(0, 2).map(s => ({ name: s.name }))`
   - `icon`, `iconBgClass`, `iconColorClass` → from `getCategoryIcon(group.category.name)`
   - `viewAllHref` → `/services/${group.category.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`
   - `viewAllLabel` → `"View all ${group.category.name} services"`

The section heading markup ("Browse by Category" + subtext + border) should be included in this component, so the services page can drop it in cleanly.

---

## Step 4 — Export from barrel

**File:** `components/services/index.ts`

Add `export { ServiceCategoriesSection } from "./ServiceCategoriesSection"`.

---

## Step 5 — Update the services page

**File:** `app/(public)/services/page.tsx`

- Remove the hardcoded `categories` array and its imports (`TrafficCone`, `FileText`, `Users`, `Shield`, `Leaf`).
- Remove the `ServiceCategoryCard` import (no longer used directly in the page).
- Replace the `{categories.map(...)}` block and section heading markup with `<ServiceCategoriesSection />`.
- The rest of the page (popular services, sidebar) is unchanged.

---

## Step 6 — Update and add tests

### `tests/components/ServiceCategoryCard.test.tsx`

- Fix the broken import: change `import ServiceCategoryCard from "@/components/services"` to `import { ServiceCategoryCard } from "@/components/services"`.
- Remove `href` from `services` in `defaultProps`.
- Replace the "renders all service links" test: since services are no longer `<Link>`, assert with `screen.getByText()` instead of `getByRole("link")`.
- Add test: renders without crashing when `services` is empty.
- Add test: no `<a>` elements are rendered for service items (they are plain text).

### `tests/components/ServiceCategoriesSection.test.tsx` (new file)

Mock `useGetServicesGroupedByCategoryQuery` via `vi.mock("@/app/state/api", ...)` — following the existing pattern in `tests/components/` that mocks RTK Query hooks.

Tests:

- Renders skeleton cards when `isLoading: true`.
- Renders an error message when `isError: true`.
- Renders a fallback when groups is empty.
- Renders the correct number of `ServiceCategoryCard` instances for a non-empty groups array.
- Renders correct category name from API data.
- Renders correct response time when `minResponseDays === maxResponseDays`.
- Renders correct response time when `minResponseDays !== maxResponseDays`.

---

## Critical Files

| Action | File                                                 |
| ------ | ---------------------------------------------------- |
| Modify | `components/services/ServiceCategoryCard.tsx`        |
| Create | `lib/category-icons.ts`                              |
| Create | `components/services/ServiceCategoriesSection.tsx`   |
| Modify | `components/services/index.ts`                       |
| Modify | `app/(public)/services/page.tsx`                     |
| Modify | `tests/components/ServiceCategoryCard.test.tsx`      |
| Create | `tests/components/ServiceCategoriesSection.test.tsx` |

**Reference patterns:**

- `components/ui/skeleton.tsx` — Skeleton component for loading state
- `tests/utils/render-with-providers.tsx` — test render helper with Redux + QueryClient
- Existing component tests in `tests/components/` — vi.mock RTK Query hook pattern

---

## Verification

1. `npm run build` — TypeScript compiles with no errors.
2. `npx vitest tests/components/ServiceCategoryCard.test.tsx` — all tests pass.
3. `npx vitest tests/components/ServiceCategoriesSection.test.tsx` — all tests pass.
4. `npm run dev` — visit `/services`; category cards render with live data, loading skeletons appear on first load, "view all" links navigate to `/services/{slug}`.
