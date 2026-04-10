import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { LocationPicker } from "@/components/requests";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/app/state/api";

// MapView requires Mapbox GL which doesn't work in jsdom
vi.mock("@/components/maps", () => ({
  default: () => <div data-testid="map-view-mock" />,
}));

function createMockStore() {
  return configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });
}

const defaultProps = {
  onLocationConfirm: vi.fn(),
  onLocationClear: vi.fn(),
};

function renderWithStore(ui: React.ReactElement) {
  return render(<Provider store={createMockStore()}>{ui}</Provider>);
}

describe("LocationPicker", () => {
  it("renders the section heading", () => {
    renderWithStore(<LocationPicker {...defaultProps} />);
    expect(screen.getByText(/where is the issue located/i)).toBeDefined();
  });

  it("renders the address search input", () => {
    renderWithStore(<LocationPicker {...defaultProps} />);
    expect(
      screen.getByRole("textbox", { name: /search address/i }),
    ).toBeDefined();
  });

  it("renders the Use My Location button", () => {
    renderWithStore(<LocationPicker {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /use my location/i }),
    ).toBeDefined();
  });

  it("renders the map", () => {
    renderWithStore(<LocationPicker {...defaultProps} />);
    expect(screen.getByTestId("map-view-mock")).toBeDefined();
  });

  it("shows the selected location confirmation when address is provided", () => {
    renderWithStore(
      <LocationPicker
        {...defaultProps}
        selectedAddress="102A Ave NW, Edmonton, AB"
      />,
    );
    expect(screen.getByText(/102A Ave NW, Edmonton, AB/i)).toBeDefined();
    expect(screen.getByText(/location pin selected/i)).toBeDefined();
  });

  it("does not show confirmation strip when no address selected", () => {
    renderWithStore(<LocationPicker {...defaultProps} />);
    expect(screen.queryByText(/location pin selected/i)).toBeNull();
  });

  it("calls onLocationClear when Edit button is clicked", async () => {
    const onLocationClear = vi.fn();
    renderWithStore(
      <LocationPicker
        {...defaultProps}
        onLocationClear={onLocationClear}
        selectedAddress="102A Ave NW, Edmonton, AB"
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /edit selected location/i }),
    );
    expect(onLocationClear).toHaveBeenCalledOnce();
  });

  it("allows typing in the search input", async () => {
    renderWithStore(<LocationPicker {...defaultProps} />);
    const input = screen.getByRole("textbox", { name: /search address/i });
    await userEvent.type(input, "Main St");
    expect(input).toHaveValue("Main St");
  });
});
