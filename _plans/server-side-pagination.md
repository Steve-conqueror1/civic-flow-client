# Plan: Server-Side Pagination for Users Table

## Context

The users table currently fetches all users at once (`useGetUsersQuery({})`) and paginates the results entirely on the client using TanStack Table's `getPaginationRowModel()`. The backend already returns `page`, `limit`, and `total` in the `PaginatedUsersData` response shape, and the `getUsers` endpoint accepts `page` and `limit` query params. This plan replaces client-side pagination with server-side pagination, ensuring the correct page of results is fetched from the API and the pagination controls reflect the true total across all pages.

---

## Files to Modify

| File                              | Change                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `app/dashboard/users/page.tsx`    | Add `page` state; pass `page`/`limit` to query; pass pagination props to `UsersTable` |
| `components/users/UsersTable.tsx` | Accept pagination props; remove TanStack pagination model; wire controls to props     |

---

## Step 1 — Lift pagination state (`app/dashboard/users/page.tsx`)

- Add `const [page, setPage] = useState(1)` — page is 1-indexed to match the API
- Change the query call from `useGetUsersQuery({})` to `useGetUsersQuery({ page, limit: 10 })`
- Extract `total`, `page` (returned), and `limit` from `data.data`:
  ```
  const total = data?.data?.total ?? 0;
  const currentPage = data?.data?.page ?? page;
  const limit = data?.data?.limit ?? 10;
  ```
- Pass these down to `UsersTable` as new props:
  - `total` — total number of users across all pages
  - `page` — current page number (from API response)
  - `limit` — page size (from API response)
  - `onPageChange: (newPage: number) => void` — calls `setPage`
- Reset `page` to `1` whenever role/status filters change (if filters are moved up to the page level — see note below)

> **Note on filters:** Role and status filters currently live inside `UsersTable` as local state and filter only the current page's data. For now, keep them as-is. A follow-up task can move them to the page level and pass them as API params.

---

## Step 2 — Update `UsersTable` to use server-side pagination (`components/users/UsersTable.tsx`)

### Props to add to `UsersTableProps`

```
total: number
page: number
limit: number
onPageChange: (page: number) => void
```

### TanStack Table changes

- Remove `getPaginationRowModel` from the import and from `useReactTable` config
- Remove `initialState: { pagination: { pageSize: 10 } }`
- Remove `pageIndex`, `pageStart`, `pageEnd` derived from TanStack table state
- Keep `getCoreRowModel`, `getFilteredRowModel`, `getSortedRowModel` (client-side filtering and sorting of the current page still work)

### Pagination UI changes

Replace the current TanStack-driven pagination values with prop-driven values:

- **Total rows displayed:** `total` prop (true total across all pages)
- **Page range display:** compute from `page` and `limit` props:
  - `pageStart = (page - 1) * limit + 1`
  - `pageEnd = Math.min(page * limit, total)`
  - Render: `Showing {pageStart}–{pageEnd} of {total}`
- **Previous button:** disabled when `page === 1`; `onClick` calls `onPageChange(page - 1)`
- **Next button:** disabled when `page * limit >= total`; `onClick` calls `onPageChange(page + 1)`

---

## Verification

1. Run `npm run dev` → navigate to `/dashboard/users`
2. Confirm the first page loads correctly
3. Click Next — confirm a new API request fires with `page=2` (visible in DevTools Network tab) and new users appear
4. Click Previous — confirm it returns to `page=1`
5. Confirm Previous is disabled on page 1 and Next is disabled on the last page
6. Confirm the "Showing X–Y of Z" display is accurate using the real total
7. Run `npx vitest tests/components/UsersTable.test.tsx` — all existing tests pass
8. Run `npm run lint` — no errors
