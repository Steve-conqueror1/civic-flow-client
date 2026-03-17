# Plan: Wire Popular Services to Live API

## Context

The `PopularServiceCard` component and the "Popular Services" section on the services page (`/services`) currently use hardcoded mock data (4 static entries with hand-picked Lucide icons). The backend exposes a live `GET /api/v1/services/popular` endpoint that returns active services ranked by request volume. This plan wires the section to that endpoint using RTK Query, consistent with the pattern used by every other service endpoint in the app.

One mismatch to address: the API returns service data (name, slug, etc.) but no icons. The `PopularServiceCard` component currently requires a Lucide icon as a prop, so we'll make `icon` optional with a fallback default.

---

## Files to Change

| File                                         | Change                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `app/types/service.ts`                       | Add `GetPopularServicesQuery` and `GetPopularServicesResponse`                                   |
| `app/state/api.ts`                           | Import new types + add `getPopularServices` endpoint                                             |
| `components/services/PopularServiceCard.tsx` | Make `icon` prop optional, default to `Layers`                                                   |
| `app/(public)/services/page.tsx`             | Replace static data with `useGetPopularServicesQuery`, add loading skeletons, add `"use client"` |

---

## Step-by-Step

### 1. `app/types/service.ts` — Add types

Append after the existing query/response types:

```ts
// GET /api/v1/services/popular
export type GetPopularServicesQuery = {
  limit?: number;
};

export type GetPopularServicesResponse = {
  success: boolean;
  message: string;
  data: {
    services: Service[];
  };
};
```

---

### 2. `app/state/api.ts` — Add RTK Query endpoint

Add to the existing service type import block:

```ts
GetPopularServicesQuery,
GetPopularServicesResponse,
```

Add the endpoint alongside the other public service queries:

```ts
getPopularServices: build.query<GetPopularServicesResponse, GetPopularServicesQuery | void>({
  query: (params) => ({
    url: "/services/popular",
    params: params ?? undefined,
  }),
  providesTags: ["Services"],
}),
```

Exports `useGetPopularServicesQuery` automatically.

---

### 3. `components/services/PopularServiceCard.tsx` — Make `icon` optional

```ts
import { Layers, type LucideProps } from "lucide-react";

interface PopularServiceCardProps {
  title: string;
  href: string;
  icon?: ComponentType<LucideProps>;
}
```

In the component body, before the return:

```tsx
const Icon = icon ?? Layers;
```

---

### 4. `app/(public)/services/page.tsx` — Replace hardcoded data

- Add `"use client"` directive at the top
- Remove the static `popularServices` array and unused icon imports (`Construction`, `CalendarDays`, `Receipt`, `Store`)
- Call `useGetPopularServicesQuery()` (no args — backend defaults to 4)
- Map `data.data.services` → `{ title: service.name, href: \`/services/${service.slug}\` }`
- Show loading skeletons while `isLoading` is true (4 skeleton cards in the same grid)
- Skip the section on error (non-critical UI — no error message needed)

Loading skeleton (matches card dimensions):

```tsx
{
  Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse"
    >
      <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-3" />
      <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  ));
}
```

---

## Verification

1. `npm run dev` → navigate to `/services`
2. Network tab: confirm `GET /api/v1/services/popular` fires and returns data
3. Confirm skeletons appear briefly, then real service cards render
4. `npm run build` — no TypeScript errors
5. `npm run lint` — no lint errors

## IMPORTANT

- use same default icon
