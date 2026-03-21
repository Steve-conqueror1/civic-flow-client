import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AppNavbar from "@/components/AppNavbar";
import { renderWithProviders } from "../utils/render-with-providers";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockLogout = vi.fn();

let mockAuth = {
  isAuthenticated: false,
  isLoading: false,
  logout: mockLogout,
  user: null,
  role: null,
  loginMutation: { mutate: vi.fn(), isPending: false, isError: false, error: null },
  registerMutation: { mutate: vi.fn(), isPending: false, isError: false, error: null },
  currentUserQuery: {} as ReturnType<typeof import("@tanstack/react-query").useQuery>,
};

vi.mock("@/app/hooks/use-auth", () => ({
  useAuth: () => mockAuth,
}));

describe("AppNavbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth = {
      isAuthenticated: false,
      isLoading: false,
      logout: mockLogout,
      user: null,
      role: null,
      loginMutation: { mutate: vi.fn(), isPending: false, isError: false, error: null },
      registerMutation: { mutate: vi.fn(), isPending: false, isError: false, error: null },
      currentUserQuery: {} as ReturnType<typeof import("@tanstack/react-query").useQuery>,
    };
  });

  it("renders the brand name", () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getByText("CivicFlow")).toBeDefined();
  });

  it("renders static navigation links", () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Services" })).toBeDefined();
    expect(screen.getByRole("link", { name: "How It Works" })).toBeDefined();
  });

  it("renders the mobile menu button", () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeDefined();
  });

  it("renders as a header landmark", () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getByRole("banner")).toBeDefined();
  });

  it("renders Sign In and Register when not authenticated", () => {
    renderWithProviders(<AppNavbar />);
    expect(screen.getAllByText("Sign In").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Register").length).toBeGreaterThan(0);
    expect(screen.queryByText("Dashboard")).toBeNull();
    expect(screen.queryByText("Logout")).toBeNull();
  });

  it("renders Dashboard and Logout when authenticated", () => {
    mockAuth.isAuthenticated = true;
    renderWithProviders(<AppNavbar />);
    expect(screen.getAllByText("Dashboard").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Logout").length).toBeGreaterThan(0);
    expect(screen.queryByText("Sign In")).toBeNull();
    expect(screen.queryByText("Register")).toBeNull();
  });

  it("does not render auth-specific items while loading", () => {
    mockAuth.isLoading = true;
    renderWithProviders(<AppNavbar />);
    expect(screen.queryByText("Sign In")).toBeNull();
    expect(screen.queryByText("Register")).toBeNull();
    expect(screen.queryByText("Dashboard")).toBeNull();
    expect(screen.queryByText("Logout")).toBeNull();
  });

  it("calls logout when Logout button is clicked", async () => {
    mockAuth.isAuthenticated = true;
    renderWithProviders(<AppNavbar />);
    const logoutButtons = screen.getAllByText("Logout");
    await userEvent.click(logoutButtons[0]);
    expect(mockLogout).toHaveBeenCalledOnce();
  });
});
