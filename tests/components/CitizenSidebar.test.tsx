import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import CitizenSidebar from "@/components/CitizenSidebar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/citizen/dashboard",
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

function renderWithProvider(ui: React.ReactElement) {
  return render(
    <TooltipProvider>
      <SidebarProvider>{ui}</SidebarProvider>
    </TooltipProvider>
  );
}

describe("CitizenSidebar", () => {
  it("renders the sidebar container", () => {
    const { container } = renderWithProvider(<CitizenSidebar />);
    expect(container.querySelector("[data-slot='sidebar']")).toBeDefined();
  });

  it("renders the user name", () => {
    renderWithProvider(<CitizenSidebar />);
    expect(screen.getByText("Alex")).toBeDefined();
  });

  it("renders the citizen role label", () => {
    renderWithProvider(<CitizenSidebar />);
    expect(screen.getByText("Citizen")).toBeDefined();
  });

  it("renders all navigation links", () => {
    renderWithProvider(<CitizenSidebar />);
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /new request/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /my requests/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /messages/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /profile/i })).toBeDefined();
  });

  it("renders the logout button", () => {
    renderWithProvider(<CitizenSidebar />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeDefined();
  });
});
