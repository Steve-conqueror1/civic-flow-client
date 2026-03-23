import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavUser from "@/components/dashboard/NavUser";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

const mockUser = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
};

function renderNavUser(props?: { onLogout?: () => void }) {
  return render(
    <TooltipProvider>
      <SidebarProvider>
        <NavUser user={mockUser} onLogout={props?.onLogout ?? vi.fn()} />
      </SidebarProvider>
    </TooltipProvider>,
  );
}

describe("NavUser", () => {
  it("renders the user name and email", () => {
    renderNavUser();
    expect(screen.getByText("Jane Doe")).toBeDefined();
    expect(screen.getByText("jane.doe@example.com")).toBeDefined();
  });

  it("renders avatar fallback with correct initials", () => {
    renderNavUser();
    expect(screen.getByText("JD")).toBeDefined();
  });

  it("calls onLogout when Log out is clicked", async () => {
    const onLogout = vi.fn();
    renderNavUser({ onLogout });

    // Open the dropdown menu
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);

    // Click "Log out"
    const logoutItem = screen.getByText("Log out");
    await userEvent.click(logoutItem);

    expect(onLogout).toHaveBeenCalledOnce();
  });
});
