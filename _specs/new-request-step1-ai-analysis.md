# Spec for new-request-step1-ai-analysis

branch: claude/feature/new-request-step1-ai-analysis

## Summary

Step 1 of the new request wizard (`IssueForm`) currently has an "AI Analysis" button and an `AISummaryPanel` sidebar that renders static placeholder data. This feature wires up the real `POST /v1/ai/analyse-request` API call so that pressing "AI Analysis" fetches live analysis results and populates the panel. The stepper's Next button remains disabled until a successful analysis response has been received.

## Functional Requirements

- The "AI Analysis" button in `IssueForm` is enabled only when both the `title` and `description` fields are non-empty.
- Pressing "AI Analysis" calls `POST /v1/ai/analyse-request` with `{ title, description, note }` (note is optional).
- While the request is in flight, `AISummaryPanel` renders a loading state and the "AI Analysis" button is disabled to prevent duplicate submissions.
- On a successful response, `AISummaryPanel` renders the real data: matched category, matched service, AI-generated summary bullet points, and any alerts (e.g. duplicate warnings).
- On an error (400, 401, 503, or network failure), `AISummaryPanel` renders an error state with an appropriate message. The Next button remains disabled.
- The stepper Next button is disabled on step 1 until a successful AI analysis result has been received. Once analysis succeeds, Next becomes active.
- If the user edits the `title`, `description`, or `note` fields after a successful analysis, the result is cleared and the Next button returns to disabled until AI Analysis is run again.
- The `AISummaryPanel` component must accept the analysis state as props (idle, loading, success with data, error) rather than maintaining its own fetch logic.
- The RTK Query API slice (`app/state/api.ts`) should contain the mutation endpoint for `POST /v1/ai/analyse-request`.

## Possible edge cases (only if referenced)

- User submits with only whitespace in title or description — button should remain disabled (treat as empty).
- AI service returns 503 — show a clear "AI service temporarily unavailable" message; do not block the user indefinitely.
- User navigates away from step 1 and returns — analysis result and Next button state should be preserved within the session (component state is sufficient; no persistence needed).

## Acceptance Criteria

- Pressing "AI Analysis" with valid title and description triggers the API call and shows a loading state in `AISummaryPanel`.
- On success, `AISummaryPanel` displays the real category match, service match, summary points, and any alerts returned by the API.
- The Next button is disabled on step 1 until a successful analysis result is present.
- Editing any of the three fields (title, description, note) after a successful analysis clears the result and re-disables the Next button.
- On API error, `AISummaryPanel` shows an error message and Next remains disabled.
- The "AI Analysis" button is disabled while a fetch is in-flight and re-enabled on completion (success or error).
- The "AI Analysis" button is disabled when title or description is empty.

## Open Questions

- Should the `AppStepper` accept a per-step `canProceed` flag, or should step 1 lift its analysis state up to the page and pass a custom Next handler down to the stepper? lift
- Should a failed or cleared analysis state show the panel in a distinct "idle/prompt" state (e.g. "Run AI Analysis to see results") rather than hiding it entirely? idle/prompt state
- Is there a confidence threshold below which the category match should be flagged as low confidence? less than 30%

## Testing Guidelines

Create a test file at `tests/components/IssueForm.test.tsx` and update `tests/components/AISummaryPanel.test.tsx`. Cover the following cases without going too heavy:

- `IssueForm`: "AI Analysis" button is disabled when title or description is empty.
- `IssueForm`: "AI Analysis" button is enabled when both fields have non-whitespace content.
- `IssueForm`: Clicking "AI Analysis" triggers the API mutation.
- `IssueForm`: Editing a field after successful analysis clears the result.
- `AISummaryPanel`: Renders loading state when `status` prop is `"loading"`.
- `AISummaryPanel`: Renders category match and summary when `status` prop is `"success"` with mock data.
- `AISummaryPanel`: Renders error message when `status` prop is `"error"`.
