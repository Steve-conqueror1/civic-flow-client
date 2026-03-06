import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TermsSection from "@/components/TermsOfService";

describe("TermsSection", () => {
  it("renders the section number badge", () => {
    render(
      <TermsSection sectionNumber={1} title="Acceptance of Terms">
        <p>Some content</p>
      </TermsSection>,
    );
    expect(screen.getByText("1")).toBeDefined();
  });

  it("renders the section title as a heading", () => {
    render(
      <TermsSection sectionNumber={2} title="User Responsibilities">
        <p>Content here</p>
      </TermsSection>,
    );
    expect(
      screen.getByRole("heading", { name: /user responsibilities/i }),
    ).toBeDefined();
  });

  it("renders children content", () => {
    render(
      <TermsSection sectionNumber={3} title="AI Usage Policy">
        <p>AI policy content</p>
      </TermsSection>,
    );
    expect(screen.getByText("AI policy content")).toBeDefined();
  });

  it("renders different section numbers", () => {
    render(
      <TermsSection sectionNumber={6} title="Governing Law">
        <p>Law content</p>
      </TermsSection>,
    );
    expect(screen.getByText("6")).toBeDefined();
  });
});
