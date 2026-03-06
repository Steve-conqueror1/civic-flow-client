import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RequestContextCard from "@/components/requests/RequestContextCard";

describe("RequestContextCard", () => {
  it("renders the AI Assistant heading", () => {
    render(<RequestContextCard />);
    expect(screen.getByText(/civicflow ai assistant/i)).toBeDefined();
  });

  it("renders the description excerpt when provided", () => {
    render(<RequestContextCard descriptionExcerpt="large crater in pavement" />);
    expect(screen.getByText(/large crater in pavement/i)).toBeDefined();
  });

  it("renders the suggested category badge when provided", () => {
    render(<RequestContextCard suggestedCategory="Road Maintenance" />);
    expect(screen.getByText(/road maintenance/i)).toBeDefined();
  });

  it("renders a placeholder state when no data is provided", () => {
    render(<RequestContextCard />);
    expect(screen.getByText(/analyzing/i)).toBeDefined();
  });
});
