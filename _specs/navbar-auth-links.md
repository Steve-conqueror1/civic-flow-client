# Spec for Navbar Auth Links

branch: claude/feature/navbar-auth-links

## Summary

When a user is authenticated, the AppNavbar should display a **Dashboard** link and a **Logout** button in place of the existing **Login** and **Register** links. This gives authenticated users quick access to their dashboard and a clear path to sign out, without requiring them to navigate away first.

## Functional Requirements

- When the user is authenticated, the AppNavbar renders:
  - A **Dashboard** link pointing to `/dashboard`
  - A **Logout** button that triggers the logout action from `use-auth`
- When the user is not authenticated, the AppNavbar renders the existing **Login** and **Register** links unchanged
- The Logout button clears the auth state and redirects the user to `/login`
- Auth state is read from the `useAuth` hook (`isAuthenticated`, `isLoading`)
- While auth state is loading, the nav items should not flash between authenticated and unauthenticated states (avoid layout shift)

## Possible edge cases

- On initial page load, `isLoading` is true before session is resolved — nav should avoid rendering auth-specific items until loading is complete
- Logout failure should still clear local auth state and redirect to `/login`

## Acceptance Criteria

- Authenticated users see **Dashboard** and **Logout** in the navbar, not **Login** and **Register**
- Unauthenticated users see **Login** and **Register** in the navbar, not **Dashboard** and **Logout**
- Clicking **Logout** signs the user out and redirects to `/login`
- Clicking **Dashboard** navigates to `/dashboard`
- No visible flash of wrong nav items on page load while auth state resolves

## Open Questions

- Should the Logout button match the existing primary button style, or use a secondary/ghost variant? secondary, cursor pointer on hover
- Should the Dashboard link be styled as a button or a plain nav link? plain

## Testing Guidelines

Create a test file in `tests/components/AppNavbar/` and write meaningful tests for the following cases:

- Renders Login and Register links when user is not authenticated
- Renders Dashboard link and Logout button when user is authenticated
- Does not render auth-specific items while `isLoading` is true
- Clicking Logout calls the logout handler from `useAuth`
