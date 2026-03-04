import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import VerifyEmailCard from "@/components/auth/verify-email";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("VerifyEmailCard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading state initially", () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));
    render(<VerifyEmailCard token="abc123" />);
    expect(screen.getByText(/verifying your email/i)).toBeDefined();
  });

  it("shows success state after successful verification", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
    );
    render(<VerifyEmailCard token="abc123" />);
    await waitFor(() => {
      expect(screen.getByText(/email verified successfully/i)).toBeDefined();
    });
    expect(screen.getByRole("link", { name: /proceed to login/i })).toBeDefined();
  });

  it("shows error state when verification fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Token expired" }),
      }),
    );
    render(<VerifyEmailCard token="bad-token" />);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeDefined();
      expect(screen.getByText(/token expired/i)).toBeDefined();
    });
  });

  it("shows error when token is null", async () => {
    render(<VerifyEmailCard token={null} />);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeDefined();
      expect(
        screen.getByText(/invalid or missing verification token/i),
      ).toBeDefined();
    });
  });
});
