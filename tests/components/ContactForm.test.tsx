import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import ContactForm from "@/components/Contact/ContactForm";

// Mock sonner's toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock Turnstile to expose onSuccess callback via a button
vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (t: string) => void }) => (
    <button type="button" onClick={() => onSuccess("test-token")}>
      Verify
    </button>
  ),
}));

const mockMutate = vi.fn();

vi.mock("@/app/state/api", () => ({
  useSubmitContactMutation: () => [mockMutate, { isLoading: false }],
}));

describe("ContactForm", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it("renders the form", () => {
    render(<ContactForm />);
    expect(screen.getByRole("form", { name: /contact/i })).toBeDefined();
  });

  it("renders Full Name field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/full name/i)).toBeDefined();
  });

  it("renders Email Address field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
  });

  it("renders Subject field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/subject/i)).toBeDefined();
  });

  it("renders Message field", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/message/i)).toBeDefined();
  });

  it("renders Submit Inquiry button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /submit inquiry/i }),
    ).toBeDefined();
  });

  it("renders the required fields legend", () => {
    render(<ContactForm />);
    expect(screen.getByText(/fields marked with/i)).toBeDefined();
  });

  it("renders the security note", () => {
    render(<ContactForm />);
    expect(screen.getByText(/aes-256/i)).toBeDefined();
  });

  it("all fields have required attribute", () => {
    render(<ContactForm />);
    expect(
      (screen.getByLabelText(/full name/i) as HTMLInputElement).required,
    ).toBe(true);
    expect(
      (screen.getByLabelText(/email address/i) as HTMLInputElement).required,
    ).toBe(true);
    expect(
      (screen.getByLabelText(/subject/i) as HTMLInputElement).required,
    ).toBe(true);
    expect(
      (screen.getByLabelText(/message/i) as HTMLTextAreaElement).required,
    ).toBe(true);
  });

  it("shows polite error summary when submitted with empty fields", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /submit inquiry/i }),
    );
    await waitFor(() => {
      const summaries = screen.getAllByRole("status");
      expect(summaries.length).toBeGreaterThan(0);
    });
  });

  it("error paragraphs do not use role=alert", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /submit inquiry/i }),
    );
    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeDefined();
    });
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it("submit button is disabled when Turnstile token is absent", () => {
    render(<ContactForm />);
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });

  it("submit button is enabled after Turnstile verification", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    const submitBtn = screen.getByRole("button", { name: /submit inquiry/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);
  });

  it("calls mutate with correct payload on valid submission", async () => {
    mockMutate.mockReturnValue({ unwrap: () => Promise.resolve({ success: true, message: "OK" }) });

    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email address/i), "jane@gov.ca");
    await userEvent.type(screen.getByLabelText(/subject/i), "Test Subject");
    await userEvent.type(screen.getByLabelText(/message/i), "This is a test message.");
    await userEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@gov.ca",
        subject: "Test Subject",
        message: "This is a test message.",
        turnstileToken: "test-token",
      });
    });
  });

  it("calls toast.success and resets form on resolved mutation", async () => {
    const { toast } = await import("sonner");
    mockMutate.mockReturnValue({ unwrap: () => Promise.resolve({ success: true, message: "OK" }) });

    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email address/i), "jane@gov.ca");
    await userEvent.type(screen.getByLabelText(/subject/i), "Test Subject");
    await userEvent.type(screen.getByLabelText(/message/i), "This is a test message.");
    await userEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    expect(nameInput.value).toBe("");
  });

  it("calls toast.error and preserves fields on rejected mutation", async () => {
    const { toast } = await import("sonner");
    mockMutate.mockReturnValue({
      unwrap: () => Promise.reject({ data: { message: "Server error" } }),
    });

    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email address/i), "jane@gov.ca");
    await userEvent.type(screen.getByLabelText(/subject/i), "Test Subject");
    await userEvent.type(screen.getByLabelText(/message/i), "This is a test message.");
    await userEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Server error");
    });
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    expect(nameInput.value).toBe("Jane Doe");
  });
});
