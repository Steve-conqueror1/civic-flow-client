import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { LocationPicker } from "@/components/requests";

// MapView requires Mapbox GL which doesn't work in jsdom
vi.mock("@/components/maps", () => ({
  default: () => <div data-testid="map-view-mock" />,
}));

describe("LocationPicker", () => {
  it("renders the section heading", () => {
    render(<LocationPicker />);
    expect(screen.getByText(/where is the issue located/i)).toBeDefined();
  });

  it("renders the address search input", () => {
    render(<LocationPicker />);
    expect(
      screen.getByRole("textbox", { name: /search address/i }),
    ).toBeDefined();
  });

  it("renders the Use My Location button", () => {
    render(<LocationPicker />);
    expect(
      screen.getByRole("button", { name: /use my location/i }),
    ).toBeDefined();
  });

  it("renders the map", () => {
    render(<LocationPicker />);
    expect(screen.getByTestId("map-view-mock")).toBeDefined();
  });

  it("shows the selected location confirmation when address is provided", () => {
    render(<LocationPicker selectedAddress="102A Ave NW, Edmonton, AB" />);
    expect(screen.getByText(/102A Ave NW, Edmonton, AB/i)).toBeDefined();
    expect(screen.getByText(/location pin selected/i)).toBeDefined();
  });

  it("does not show confirmation strip when no address selected", () => {
    render(<LocationPicker />);
    expect(screen.queryByText(/location pin selected/i)).toBeNull();
  });

  it("calls onUseMyLocation when Use My Location button is clicked", async () => {
    const onUseMyLocation = vi.fn();
    render(<LocationPicker onUseMyLocation={onUseMyLocation} />);
    await userEvent.click(
      screen.getByRole("button", { name: /use my location/i }),
    );
    expect(onUseMyLocation).toHaveBeenCalledOnce();
  });

  it("calls onAddressChange when typing in search input", async () => {
    const onAddressChange = vi.fn();
    render(<LocationPicker onAddressChange={onAddressChange} />);
    await userEvent.type(
      screen.getByRole("textbox", { name: /search address/i }),
      "Main St",
    );
    expect(onAddressChange).toHaveBeenCalled();
  });
});
