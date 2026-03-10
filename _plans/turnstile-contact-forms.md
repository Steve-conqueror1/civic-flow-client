# Plan: Turnstile Contact Forms

## Context
Both the ContactForm and AccessibilityFeedbackForm currently mock their submissions (console.log + success toast only). This plan wires them up to `POST /api/v1/contact` via RTK Query and adds Cloudflare Turnstile bot protection. The Accessibility form omits a subject field from the UI but always sends `"Accessibility Enquiry"` as the subject in the API payload.

---

## Files to Modify

| File | Change |
|---|---|
| `.env` | Fix typo: `NEXT_PULBIC_` → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` |
| `app/state/api.ts` | Add `submitContact` RTK Query mutation endpoint |
| `components/Contact/ContactForm.tsx` | Add Turnstile widget, wire to API mutation |
| `components/Accessibility/AccessibilityFeedbackForm.tsx` | Add Turnstile widget, wire to API mutation |
| `tests/components/ContactForm.test.tsx` | Update tests for Turnstile + API mutation |
| `tests/components/AccessibilityFeedbackForm.test.tsx` | Update tests for Turnstile + API mutation |

---

## Step-by-Step Implementation

### 1. Fix `.env` typo
Change `NEXT_PULBIC_TURNSTILE_SITE_KEY` → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env`.

---

### 2. Add RTK Query mutation — `app/state/api.ts`

Add a `submitContact` mutation:

```
endpoint: build.mutation<ContactApiResponse, ContactApiPayload>({
  query: (body) => ({ url: "/contact", method: "POST", body }),
})
```

**Types** (inline or in a new `app/types/contact.ts`):
- `ContactApiPayload`: `{ name: string; email: string; subject: string; message: string; turnstileToken: string }`
- `ContactApiResponse`: `{ success: boolean; message: string; errors?: Record<string, string> }`

Export the generated hook: `useSubmitContactMutation`.

---

### 3. Update `ContactForm.tsx`

**State:**
- `const [turnstileToken, setTurnstileToken] = useState<string | null>(null)`
- `const turnstileRef = useRef<TurnstileInstance | null>(null)` (for widget reset)

**RTK Query:**
- `const [submitContact, { isLoading }] = useSubmitContactMutation()`

**`onSubmit` handler:**
1. Build payload: `{ name: data.fullName, email: data.email, subject: data.subject, message: data.message, turnstileToken }`
2. Call `await submitContact(payload).unwrap()`
3. On success: `toast.success(...)`, `reset()`, `turnstileRef.current?.reset()`
4. On error: `toast.error(err.data?.message ?? "Something went wrong. Please try again.")` — do NOT reset form

**Turnstile widget** (before the submit button):
```jsx
<Turnstile
  ref={turnstileRef}
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
  onSuccess={(token) => setTurnstileToken(token)}
  onExpire={() => setTurnstileToken(null)}
  onError={() => setTurnstileToken(null)}
/>
```

**Submit button** disabled condition:
- `disabled={isLoading || !turnstileToken}`

**Note:** `isSubmitting` from RHF is only true for synchronous handlers. Since we `await` the mutation, the handler is async — `isLoading` from RTK Query is the correct loading flag to use.

---

### 4. Update `AccessibilityFeedbackForm.tsx`

Same changes as ContactForm, with these differences:
- No subject field rendered in the UI
- Payload maps `feedback` → `message`, hardcodes `subject: "Accessibility Enquiry"`
- Use `a11y-` prefixed IDs for the Turnstile wrapper for consistency

**`onSubmit` handler payload:**
```
{ name: data.fullName, email: data.email, subject: "Accessibility Enquiry", message: data.feedback, turnstileToken }
```

---

### 5. Update `ContactForm.test.tsx`

Mock `@marsidev/react-turnstile` to expose `onSuccess` callback:
```ts
vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (t: string) => void }) => (
    <button onClick={() => onSuccess("test-token")}>Verify</button>
  ),
}));
```

Mock `@/app/state/api` for `useSubmitContactMutation`:
```ts
const mockMutate = vi.fn();
vi.mock("@/app/state/api", () => ({
  useSubmitContactMutation: () => [mockMutate, { isLoading: false }],
}));
```

**New/updated tests:**
- Submit button is disabled when Turnstile token is absent
- Submit button is enabled after clicking "Verify" (triggering `onSuccess`)
- `mockMutate` is called with correct payload on valid submission (name, email, subject, message, turnstileToken)
- `toast.success` is called and form resets on resolved mutation
- `toast.error` is called and fields are preserved on rejected mutation

---

### 6. Update `AccessibilityFeedbackForm.test.tsx`

Same mocking strategy. Additional/updated tests:
- Subject field is NOT rendered
- `mockMutate` is called with `subject: "Accessibility Enquiry"` in the payload
- `mockMutate` payload maps `feedback` field to `message` key

---

## Field Mapping Summary

| Form field | API payload key | AccessibilityForm note |
|---|---|---|
| `fullName` | `name` | same |
| `email` | `email` | same |
| `subject` (input) | `subject` | hardcoded `"Accessibility Enquiry"`, not rendered |
| `message` (textarea) | `message` | Accessibility uses `feedback` → `message` |
| Turnstile state | `turnstileToken` | same |

---

## Verification

1. Run `npm run dev` — open Contact page, confirm Turnstile widget renders and submit button is disabled until verified
2. Fill and submit Contact form — confirm API call in Network tab with correct payload
3. Open Accessibility Statement page — confirm Turnstile renders, no subject field visible
4. Submit Accessibility form — confirm payload includes `subject: "Accessibility Enquiry"`
5. Run `npm run test` — all tests pass (including updated ContactForm and AccessibilityFeedbackForm tests)
6. Test error case by temporarily modifying the endpoint — confirm error toast shows and form values are preserved
