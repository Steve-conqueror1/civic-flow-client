import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { FeaturedServiceRequest } from "@/app/types/request";

// ---------- Mocks ----------

// Mock socket.io-client
const mockOn = vi.fn();
const mockOff = vi.fn();
const mockDisconnect = vi.fn();

vi.mock("socket.io-client", () => ({
  io: vi.fn(() => ({
    on: mockOn,
    off: mockOff,
    disconnect: mockDisconnect,
  })),
}));

// Mock MapView — avoid loading mapbox-gl in jsdom
vi.mock("@/components/maps", () => ({
  default: (props: Record<string, unknown>) => (
    <div
      data-testid="map"
      data-lat={props.latitude}
      data-lng={props.longitude}
      data-label={props.markerLabel}
    />
  ),
}));

// Mock RTK Query hook — overridden per test
const mockUseGetFeaturedServiceRequestQuery = vi.fn();
vi.mock("@/app/state/api", () => ({
  useGetFeaturedServiceRequestQuery: (...args: unknown[]) =>
    mockUseGetFeaturedServiceRequestQuery(...args),
}));

// ---------- Helpers ----------

const makeFeaturedCase = (
  overrides: Partial<FeaturedServiceRequest> = {}
): FeaturedServiceRequest => ({
  id: "req-1",
  userId: "user-1",
  serviceId: "svc-1",
  title: "Pothole Repair - Downtown",
  description: "Large pothole on main street",
  note: null,
  status: "Resolved",
  location: { lat: 53.544, lng: -113.49, address: "6 Stanton St." },
  attachments: [],
  assignedTo: null,
  priority: 1,
  aiSummary: "Routed by AI Assistant",
  submittedAt: "2026-03-10T12:00:00Z",
  resolvedAt: "2026-03-11T14:00:00Z",
  createdAt: "2026-03-10T12:00:00Z",
  updatedAt: "2026-03-11T14:00:00Z",
  ...overrides,
});

// ---------- Tests ----------

describe("HeroImageCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Must dynamic-import after mocks are established
  async function renderComponent() {
    const { HeroImageCard } = await import(
      "@/components/HeroSection/HeroMapCard"
    );
    return render(<HeroImageCard />);
  }

  it("renders title and address from the initial API response", async () => {
    const featured = makeFeaturedCase();
    mockUseGetFeaturedServiceRequestQuery.mockReturnValue({
      data: { success: true, message: "ok", data: featured },
      isLoading: false,
      isError: false,
    });

    await renderComponent();

    expect(screen.getByText("Pothole Repair - Downtown")).toBeDefined();
    expect(screen.getByText(/6 Stanton St\./)).toBeDefined();
  });

  it("shows a loading indicator while the initial fetch is pending", async () => {
    mockUseGetFeaturedServiceRequestQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    await renderComponent();

    expect(screen.getByTestId("loading-state")).toBeDefined();
    expect(screen.getByText(/Loading featured case/)).toBeDefined();
  });

  it("shows an error message when the initial fetch fails", async () => {
    mockUseGetFeaturedServiceRequestQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    await renderComponent();

    expect(screen.getByTestId("error-state")).toBeDefined();
    expect(screen.getByText(/Unable to load featured case/)).toBeDefined();
  });

  it("subscribes to new_featured_case on mount", async () => {
    mockUseGetFeaturedServiceRequestQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    await renderComponent();

    expect(mockOn).toHaveBeenCalledWith(
      "new_featured_case",
      expect.any(Function)
    );
  });

  it("cleans up socket listener and disconnects on unmount", async () => {
    mockUseGetFeaturedServiceRequestQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { unmount } = await renderComponent();
    unmount();

    expect(mockOff).toHaveBeenCalledWith("new_featured_case");
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("updates the status card when a new_featured_case event arrives", async () => {
    const initial = makeFeaturedCase();
    mockUseGetFeaturedServiceRequestQuery.mockReturnValue({
      data: { success: true, message: "ok", data: initial },
      isLoading: false,
      isError: false,
    });

    await renderComponent();

    // Grab the callback passed to socket.on
    const onCall = mockOn.mock.calls.find(
      ([event]: [string]) => event === "new_featured_case"
    );
    const callback = onCall![1] as (data: FeaturedServiceRequest) => void;

    const updated = makeFeaturedCase({
      id: "req-2",
      title: "Broken Streetlight - Southside",
      location: { lat: 53.5, lng: -113.5, address: "12 Oak Ave." },
    });

    act(() => {
      callback(updated);
    });

    expect(screen.getByText("Broken Streetlight - Southside")).toBeDefined();
    expect(screen.getByText(/12 Oak Ave\./)).toBeDefined();
  });

  it("does not update when the same case ID is emitted consecutively via socket", async () => {
    mockUseGetFeaturedServiceRequestQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    await renderComponent();

    const onCall = mockOn.mock.calls.find(
      ([event]: [string]) => event === "new_featured_case"
    );
    const callback = onCall![1] as (data: FeaturedServiceRequest) => void;

    // First socket event — should render
    const first = makeFeaturedCase({ id: "req-5", title: "First Title" });
    act(() => {
      callback(first);
    });
    expect(screen.getByText("First Title")).toBeDefined();

    // Second socket event with same ID — should be ignored
    const duplicate = makeFeaturedCase({
      id: "req-5",
      title: "Should Not Appear",
    });
    act(() => {
      callback(duplicate);
    });

    expect(screen.getByText("First Title")).toBeDefined();
    expect(screen.queryByText("Should Not Appear")).toBeNull();
  });
});
