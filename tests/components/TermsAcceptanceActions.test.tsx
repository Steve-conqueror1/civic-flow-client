import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TermsAcceptanceActions from "@/components/TermsAcceptanceActions";

describe("TermsAcceptanceActions", () => {
  it("renders the Decline button", () => {
    render(<TermsAcceptanceActions />);
    expect(screen.getByRole("button", { name: /decline/i })).toBeDefined();
  });

  it("renders the I Accept button", () => {
    render(<TermsAcceptanceActions />);
    expect(screen.getByRole("button", { name: /i accept/i })).toBeDefined();
  });

  it("calls onDecline when Decline is clicked", async () => {
    const onDecline = vi.fn();
    render(<TermsAcceptanceActions onDecline={onDecline} />);
    await userEvent.click(screen.getByRole("button", { name: /decline/i }));
    expect(onDecline).toHaveBeenCalledOnce();
  });

  it("calls onAccept when I Accept is clicked", async () => {
    const onAccept = vi.fn();
    render(<TermsAcceptanceActions onAccept={onAccept} />);
    await userEvent.click(screen.getByRole("button", { name: /i accept/i }));
    expect(onAccept).toHaveBeenCalledOnce();
  });
});
