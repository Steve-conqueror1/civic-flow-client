import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { UsersPageHeader } from "@/components/users/UsersPageHeader";

describe("UsersPageHeader", () => {
  it("renders the page heading", () => {
    render(<UsersPageHeader />);
    expect(screen.getByRole("heading", { name: /system users/i })).toBeDefined();
  });

  it("renders the breadcrumb", () => {
    render(<UsersPageHeader />);
    expect(screen.getByText("Platform")).toBeDefined();
    expect(screen.getByText("User Management")).toBeDefined();
  });

  it("renders the Export List button", () => {
    render(<UsersPageHeader />);
    expect(screen.getByRole("button", { name: /export list/i })).toBeDefined();
  });

  it("renders the Invite User button", () => {
    render(<UsersPageHeader />);
    expect(screen.getByRole("button", { name: /invite user/i })).toBeDefined();
  });

  it("calls onInvite when Invite User is clicked", async () => {
    const onInvite = vi.fn();
    render(<UsersPageHeader onInvite={onInvite} />);
    await userEvent.click(screen.getByRole("button", { name: /invite user/i }));
    expect(onInvite).toHaveBeenCalledOnce();
  });

  it("calls onExport when Export List is clicked", async () => {
    const onExport = vi.fn();
    render(<UsersPageHeader onExport={onExport} />);
    await userEvent.click(screen.getByRole("button", { name: /export list/i }));
    expect(onExport).toHaveBeenCalledOnce();
  });
});
