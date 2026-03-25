# Spec for User Table Actions

branch: claude/feature/user-table-actions

## Summary

The users table already renders an action button (three-dot icon) in the "Action" column for each row, but it is currently inert. This feature wires that button up to a dropdown menu giving admins four status-change actions and a navigation link to the user's detail page. All status mutations hit existing backend endpoints. The delete action is destructive and requires a confirmation step.

## Functional Requirements

- Clicking the action button on a user row opens a dropdown menu anchored to that button
- The dropdown contains the following options:
  - **View Profile** — navigates to `/dashboard/users/:id`
  - **Set Active** — calls `PATCH /v1/users/{id}/activate` to set the user's status to `active`
  - **Set Inactive** — calls `PATCH /v1/users/{id}/deactivate` to set the user's status to `inactive`
  - **Set Suspended** — calls `PATCH /v1/users/{id}` with `{ status: "suspended" }`
  - **Delete User** — calls `DELETE /v1/users/{id}` (soft-delete); requires confirmation before firing
- Only one dropdown may be open at a time; clicking elsewhere closes it
- After a successful status mutation, the users table data should refresh (invalidate the `"Users"` RTK Query cache tag)
- The delete action must show a confirmation dialog before proceeding; cancelling the dialog must not trigger the API call
- Status actions that match the user's current status should be visually disabled or hidden to avoid redundant calls
- All actions require Admin or Super Admin role; the component is only rendered in authenticated admin routes so no additional auth guard is needed inside the component

## Possible edge cases (only if referenced)

- API returns 403 (insufficient permissions): surface a user-facing error toast or message
- API returns 404 (user not found): surface an error and refresh the table
- Network failure during mutation: surface an error; do not optimistically update the row status
- Clicking delete and then cancelling the confirmation dialog: no API call should fire

## Acceptance Criteria

- The action button on each user row opens a dropdown with all five options
- "View Profile" navigates to the correct `/dashboard/users/:id` URL
- Each status action calls the correct endpoint and refreshes the table on success
- The delete action shows a confirmation dialog before calling the delete endpoint
- Cancelling the delete confirmation fires no API call
- Actions matching the user's current status are visually disabled
- Only one dropdown is open at a time
- The dropdown closes when clicking outside it

## Open Questions

- Should disabled (current-status) actions be hidden entirely or greyed out? hiden
- Should the "Delete User" option use a modal dialog or an inline confirm prompt? inline prompt
- Should a success toast be shown after status changes? yes, show toast

## Testing Guidelines

Create a test file at `tests/components/UsersTable.test.tsx` covering the following cases, without going too heavy:

- Clicking the action button opens a dropdown with the expected menu items
- "View Profile" renders a link pointing to `/dashboard/users/:id`
- A status action calls the correct RTK Query mutation hook
- The delete action does not fire the API when the confirmation is cancelled
- A status action matching the user's current status is disabled
