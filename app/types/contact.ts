export interface ContactApiPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}
