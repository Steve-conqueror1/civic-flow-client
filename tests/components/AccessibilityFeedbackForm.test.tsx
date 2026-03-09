import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { AccessibilityFeedbackForm } from "@/components/Accessibility/AccessibilityFeedbackForm";

// Mock sonner's toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("AccessibilityFeedbackForm", () => {
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

  it("shows validation errors when submitted empty", async () => {
    render(<AccessibilityFeedbackForm />);
    await userEvent.click(
      screen.getByRole("button", { name: /submit feedback/i }),
    );
    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeDefined();
    });
  });

  it("calls toast.success and logs on valid submit", async () => {
    const { toast } = await import("sonner");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<AccessibilityFeedbackForm />);
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "jane@gov.ca",
    );
    await userEvent.type(
      screen.getByLabelText(/what can we improve/i),
      "The focus indicators need to be more visible.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /submit feedback/i }),
    );

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it("clears form after valid submission", async () => {
    render(<AccessibilityFeedbackForm />);
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(nameInput, "Jane Doe");
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "jane@gov.ca",
    );
    await userEvent.type(
      screen.getByLabelText(/what can we improve/i),
      "The focus indicators need to be more visible.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /submit feedback/i }),
    );
    await waitFor(() => {
      expect(nameInput.value).toBe("");
    });
  });
});
