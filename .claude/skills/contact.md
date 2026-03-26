# Contact

Contact enquiry endpoints.

## POST /v1/contact

Submit a contact enquiry. Rate-limited. Requires Cloudflare Turnstile CAPTCHA.

- **Auth:** None
- **Body (required):** `name` (max 255), `email`, `subject` (max 255), `message` (max 5000), `turnstileToken`
- **Response 201:** Contact message submitted
- **Response 400:** Validation error
- **Response 429:** Rate limit exceeded

## GET /v1/contact

List all contact messages.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Response 200:** List of contact messages
- **Response 401:** Not authenticated
- **Response 403:** Admin role required

## PATCH /v1/contact/:id/status

Update the status of a contact message.

- **Auth:** Cookie (`access_token`) — Admin or Super Admin
- **Body (required):** `status` (`new` | `read` | `replied` | `archived`)
- **Response 200:** Contact message status updated
- **Response 401:** Not authenticated
- **Response 403:** Admin role required
- **Response 404:** Contact message not found
