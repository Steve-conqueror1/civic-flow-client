import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { AccessibilityFeedbackForm } from "@/components/Accessibility/AccessibilityFeedbackForm";

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

describe("AccessibilityFeedbackForm", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it("renders Full Name field", () => {
    render(<AccessibilityFeedbackForm />);
    expect(screen.getByLabelText(/full name/i)).toBeDefined();
  });

  it("renders Email Address field", () => {
    render(<AccessibilityFeedbackForm />);
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
  });

  it("renders What can we improve field", () => {
    render(<AccessibilityFeedbackForm />);
    expect(screen.getByLabelText(/what can we improve/i)).toBeDefined();
  });

  it("renders Submit Feedback button", () => {
    render(<AccessibilityFeedbackForm />);
    expect(
      screen.getByRole("button", { name: /submit feedback/i }),
    ).toBeDefined();
  });

  it("does not render a subject field", () => {
    render(<AccessibilityFeedbackForm />);
    expect(screen.queryByLabelText(/subject/i)).toBeNull();
  });

  it("shows validation errors when submitted empty", async () => {
    render(<AccessibilityFeedbackForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /submit feedback/i }),
    );
    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeDefined();
    });
  });

  it("submit button is disabled when Turnstile token is absent", () => {
    render(<AccessibilityFeedbackForm />);
    const submitBtn = screen.getByRole("button", { name: /submit feedback/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(true);
  });

  it("submit button is enabled after Turnstile verification", async () => {
    render(<AccessibilityFeedbackForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    const submitBtn = screen.getByRole("button", { name: /submit feedback/i }) as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);
  });

  it("calls mutate with subject 'Accessibility Enquiry' and maps feedback to message", async () => {
    mockMutate.mockReturnValue({ unwrap: () => Promise.resolve({ success: true, message: "OK" }) });

    render(<AccessibilityFeedbackForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email address/i), "jane@gov.ca");
    await userEvent.type(
      screen.getByLabelText(/what can we improve/i),
      "The focus indicators need to be more visible.",
    );
    await userEvent.click(screen.getByRole("button", { name: /submit feedback/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@gov.ca",
        subject: "Accessibility Enquiry",
        message: "The focus indicators need to be more visible.",
        turnstileToken: "test-token",
      });
    });
  });

  it("calls toast.success and resets form on resolved mutation", async () => {
    const { toast } = await import("sonner");
    mockMutate.mockReturnValue({ unwrap: () => Promise.resolve({ success: true, message: "OK" }) });

    render(<AccessibilityFeedbackForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email address/i), "jane@gov.ca");
    await userEvent.type(
      screen.getByLabelText(/what can we improve/i),
      "The focus indicators need to be more visible.",
    );
    await userEvent.click(screen.getByRole("button", { name: /submit feedback/i }));

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

    render(<AccessibilityFeedbackForm />);
    await userEvent.click(screen.getByRole("button", { name: /verify/i }));
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email address/i), "jane@gov.ca");
    await userEvent.type(
      screen.getByLabelText(/what can we improve/i),
      "The focus indicators need to be more visible.",
    );
    await userEvent.click(screen.getByRole("button", { name: /submit feedback/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Server error");
    });
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    expect(nameInput.value).toBe("Jane Doe");
  });
});
