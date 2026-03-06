import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ReviewSection } from "@/components/requests";

describe("ReviewSection", () => {
  it("renders the section title", () => {
    render(
      <ReviewSection title="Request Details" icon="info">
        <p>content</p>
      </ReviewSection>,
    );
    expect(screen.getByText("Request Details")).toBeDefined();
  });

  it("renders children", () => {
    render(
      <ReviewSection title="Location" icon="location_on">
        <p>123 Main St</p>
      </ReviewSection>,
    );
    expect(screen.getByText("123 Main St")).toBeDefined();
  });

  it("renders an Edit button", () => {
    render(
      <ReviewSection title="Details" icon="info">
        <span />
      </ReviewSection>,
    );
    expect(screen.getByRole("button", { name: /edit/i })).toBeDefined();
  });

  it("calls onEdit when Edit button is clicked", async () => {
    const onEdit = vi.fn();
    render(
      <ReviewSection title="Details" icon="info" onEdit={onEdit}>
        <span />
      </ReviewSection>,
    );
    await userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("does not render Edit button when showEdit is false", () => {
    render(
      <ReviewSection title="Details" icon="info" showEdit={false}>
        <span />
      </ReviewSection>,
    );
    expect(screen.queryByRole("button", { name: /edit/i })).toBeNull();
  });
});
