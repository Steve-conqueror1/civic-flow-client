# Auth

Authentication and account security endpoints.

## POST /v1/auth/register

Register a new user account. Sends a verification email.

- **Auth:** None
- **Body (required):** `email`, `password` (8–128 chars), `firstName`, `lastName`
- **Body (optional):** `phoneNumber`, `address`
- **Response 201:** User registered
- **Response 400:** Validation error
- **Response 409:** Email already registered

## GET /v1/auth/verify-email

Verify an email address via token from the verification email.

- **Auth:** None
- **Query (required):** `token` (uuid)
- **Response 200:** Email verified
- **Response 400:** Invalid or expired token

## POST /v1/auth/login

Authenticate with email and password. Sets `access_token` and `refresh_token` cookies on success.

- **Auth:** None
- **Body (required):** `email`, `password`
- **Response 200:** Login successful — auth cookies set
- **Response 202:** MFA required — returns `{ mfaRequired: true, challengeToken: uuid }`
- **Response 401:** Invalid credentials
- **Response 403:** Account locked or email not verified

## POST /v1/auth/mfa/verify

Complete MFA login with a TOTP code.

- **Auth:** None
- **Body (required):** `challengeToken` (uuid), `totpCode` (6 chars)
- **Response 200:** MFA verified — auth cookies set
- **Response 400:** Invalid or expired challenge token
- **Response 401:** Invalid TOTP code

## POST /v1/auth/refresh

Refresh the access token using the `refresh_token` cookie.

- **Auth:** Cookie (`refresh_token`)
- **Response 200:** New access token issued
- **Response 401:** Invalid or revoked refresh token

## POST /v1/auth/resend-verification

Resend the email verification link.

- **Auth:** None
- **Body (required):** `email`
- **Response 200:** Verification email sent (if account exists)

## POST /v1/auth/request-password-reset

Request a password reset email.

- **Auth:** None
- **Body (required):** `email`
- **Response 200:** Reset email sent (if account exists)

## POST /v1/auth/reset-password

Reset password using token from the reset email.

- **Auth:** None
- **Body (required):** `token` (uuid), `password` (8–128 chars)
- **Response 200:** Password reset successfully
- **Response 400:** Invalid or expired token

## POST /v1/auth/mfa/setup

Initiate MFA setup. Returns TOTP secret and QR code URI.

- **Auth:** Cookie (`access_token`)
- **Response 200:** TOTP secret and `otpauth` URI
- **Response 401:** Not authenticated

## POST /v1/auth/mfa/confirm

Confirm MFA setup with a TOTP code.

- **Auth:** Cookie (`access_token`)
- **Body (required):** `totpCode` (6 chars)
- **Response 200:** MFA enabled successfully
- **Response 400:** Invalid TOTP code
- **Response 401:** Not authenticated

## GET /v1/auth/me

Get the currently authenticated user's profile.

- **Auth:** Cookie (`access_token`)
- **Response 200:** Current user profile
- **Response 401:** Not authenticated

## POST /v1/auth/logout

Log out and clear auth cookies.

- **Auth:** None
- **Response 200:** Logged out successfully
