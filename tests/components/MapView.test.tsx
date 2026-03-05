import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("mapbox-gl", () => {
  const Map = vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    off: vi.fn(),
    remove: vi.fn(),
    getCanvas: vi.fn().mockReturnValue({ style: {} }),
    resize: vi.fn(),
  }));
  return { default: { Map } };
});

vi.mock("react-map-gl/mapbox", () => ({
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="mock-map">{children}</div>
  ),
  Marker: ({
    children,
    longitude,
    latitude,
  }: {
    children?: React.ReactNode;
    longitude: number;
    latitude: number;
  }) => (
    <div
      data-testid="mock-marker"
      data-lng={longitude}
      data-lat={latitude}
    >
      {children}
    </div>
  ),
  Popup: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="mock-popup">{children}</div>
  ),
}));

// suppress mapbox-gl CSS import
vi.mock("mapbox-gl/dist/mapbox-gl.css", () => ({}));

import MapView from "@/components/maps/MapView";

describe("MapView", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, NEXT_PUBLIC_MAPBOX_TOKEN: "pk.test_token" };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("renders a map container when a valid token is set", () => {
    render(<MapView />);
    expect(screen.getByTestId("map-container")).toBeDefined();
  });

  it("renders a fallback error element when the token is absent", () => {
    delete process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    render(<MapView />);
    expect(screen.getByTestId("map-error")).toBeDefined();
  });

  it("accepts custom longitude, latitude, and zoom props without throwing", () => {
    render(<MapView longitude={-113.5} latitude={53.5} zoom={14} />);
    expect(screen.getByTestId("map-container")).toBeDefined();
  });

  it("renders a marker in the DOM when coordinates are provided", () => {
    render(<MapView longitude={-114.097} latitude={52.309} />);
    expect(screen.getByTestId("mock-marker")).toBeDefined();
  });

  it("renders a popup when markerLabel is provided", () => {
    render(<MapView markerLabel="Sylvan Lake" />);
    expect(screen.getByTestId("mock-popup")).toBeDefined();
    expect(screen.getByText("Sylvan Lake")).toBeDefined();
  });

  it("does not render a popup when markerLabel is omitted", () => {
    render(<MapView />);
    expect(screen.queryByTestId("mock-popup")).toBeNull();
  });
});
