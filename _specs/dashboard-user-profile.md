# Spec for Dashboard User Profile

branch: claude/feature/dashboard-user-profile

## Summary

Implement a user profile section within the dashboard that displays the authenticated citizen's first name, last name, and email address. The profile section should also provide a functional logout action that ends the user's session and redirects them appropriately.

## Functional Requirements

- Fetch and display the currently authenticated user's first name, last name, and email from the API
- Show the user's initials as an avatar fallback when no profile image is available
- Display the full name and email in the NavUser sidebar footer component
- Implement a logout action that clears the user's session/auth token and redirects to the login or home page
- The logout option should be accessible from the NavUser dropdown menu in the sidebar footer
- Replace the hardcoded placeholder user object in AppSidebar with real authenticated user data via the `use-auth` hook

## Possible edge cases (only if referenced)

- User data is not yet loaded (show a loading skeleton or placeholder)
- Auth token is expired or missing — redirect to login
- Logout API call fails — handle gracefully without leaving the user in a broken state

## Acceptance Criteria

- The dashboard sidebar footer displays the real logged-in user's first name, last name, and email
- Avatar fallback shows the user's initials (first letter of first name + first letter of last name)
- Clicking "Log out" in the NavUser dropdown ends the session and redirects to `/` or `/login`
- No hardcoded user data remains in AppSidebar or NavUser
- The `use-auth` hook is implemented (or stubbed appropriately) and used to provide user state

## Open Questions

- Should logout call a backend `/auth/logout` endpoint, or only clear client-side tokens? call and clear
- Where should the user be redirected after logout — home (`/`) or login (`/login`)? home
- Is there a `/auth/me` or `/users/me` endpoint to fetch the current user, or is it embedded in the auth token/session? yes, there is `/auth/me` endpoint

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- NavUser renders the correct first name, last name, and email from props
- Avatar fallback shows correct initials when no avatar image is provided
- Clicking "Log out" triggers the logout handler
- AppSidebar passes real user data (mocked) to NavUser rather than hardcoded values
