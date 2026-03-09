import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import ContactForm from "@/components/Contact/ContactForm";

// Mock sonner's toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("ContactForm", () => {
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
    await userEvent.click(
      screen.getByRole("button", { name: /submit inquiry/i }),
    );
    await waitFor(() => {
      expect(screen.getByText(/full name is required/i)).toBeDefined();
    });
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it("calls toast.success and logs on valid submission", async () => {
    const { toast } = await import("sonner");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "jane@gov.ca",
    );
    await userEvent.type(screen.getByLabelText(/subject/i), "Test Subject");
    await userEvent.type(
      screen.getByLabelText(/message/i),
      "This is a test message.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /submit inquiry/i }),
    );

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it("clears form after valid submission", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    await userEvent.type(nameInput, "Jane Doe");
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "jane@gov.ca",
    );
    await userEvent.type(screen.getByLabelText(/subject/i), "Test Subject");
    await userEvent.type(
      screen.getByLabelText(/message/i),
      "This is a test message.",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /submit inquiry/i }),
    );
    await waitFor(() => {
      expect(nameInput.value).toBe("");
    });
  });
});
