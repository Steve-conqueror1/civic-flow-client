# Spec for Turnstile Contact Forms

branch: claude/feature/turnstile-contact-forms

## Summary

Integrate Cloudflare Turnstile bot protection into the ContactForm and Accessibility Statement form. Both forms must collect name, email, subject, message, and a Turnstile token, then submit them to `POST /api/v1/contact`. The Accessibility form's subject field is pre-filled and fixed to "Accessibility Enquiry" and should not be editable by the user.

## Functional Requirements

- Add a Cloudflare Turnstile widget to the ContactForm component
- Add a Cloudflare Turnstile widget to the Accessibility Statement form component
- Both forms must submit the following fields to `POST /api/v1/contact`:
  - `name` (string, required)
  - `email` (string, required, valid email format)
  - `subject` (string, required)
  - `message` (string, required)
  - `turnstileToken` (string, required — the token returned by the Turnstile widget)
- The Turnstile widget must render visibly within each form before the submit button
- The form submit button must be disabled until the Turnstile widget has successfully verified and returned a token
- On successful Turnstile verification, store the token in form state and enable form submission
- In the Accessibility form, the `subject` field must be hardcoded to "Accessibility Enquiry" and hidden from or read-only to the user
- On successful form submission (2xx response), display a success notification (Sonner toast) and reset the form including the Turnstile widget
- On submission failure (non-2xx or network error), display an error notification (Sonner toast) and do not reset the form
- If the Turnstile token expires before submission, the widget must allow re-verification and the token in state must be cleared until re-verified

## Possible edge cases (only if referenced)

- Turnstile widget fails to load (e.g. ad blocker, network issue) — show a visible error message and prevent form submission
- User attempts to submit before Turnstile completes — submit button remains disabled
- Turnstile token expires mid-session — token cleared from state, user must re-verify before re-submitting
- API returns a 422 or validation error — surface error to user without resetting form

## Acceptance Criteria

- Both the ContactForm and Accessibility form render the Turnstile widget
- Neither form can be submitted without a valid Turnstile token
- The Accessibility form's subject is always sent as "Accessibility Enquiry" regardless of user input
- A successful submission shows a Sonner toast and clears the form
- A failed submission shows a Sonner toast and preserves current field values
- The `turnstileToken` is included in every POST request body sent to `/api/v1/contact`
- The Turnstile widget resets after a successful submission
- Forms remain accessible: Turnstile container is labeled appropriately for screen readers

## Open Questions

- Should the Turnstile site key be stored as a `NEXT_PUBLIC_` environment variable? (Assumed yes — Turnstile site keys are public) yes, already stored as NEXT_PULBIC_TURNSTILE_SITE_KEY
- Is server-side token verification handled by the backend, or does the frontend need to verify via Cloudflare's siteverify API? (Assumed backend handles verification) already handled by the backend
- What is the exact shape of the API error response for validation failures? {success: boolean, message: string, errors: {[string]: string}}

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- ContactForm renders the Turnstile widget
- ContactForm submit button is disabled when no Turnstile token is present
- ContactForm submit button becomes enabled after Turnstile token is received
- ContactForm sends correct payload (name, email, subject, message, turnstileToken) on submit
- ContactForm shows success toast and resets on successful submission
- ContactForm shows error toast and preserves fields on failed submission
- Accessibility form renders with subject pre-filled as "Accessibility Enquiry"
- Accessibility form subject cannot be changed by the user
- Accessibility form sends "Accessibility Enquiry" as subject in the POST body

## Important

- Do not add subject field to the accessibility form. But upon submission, add subject to the API
