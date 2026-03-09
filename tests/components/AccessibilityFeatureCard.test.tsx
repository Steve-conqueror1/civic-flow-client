import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AccessibilityFeatureCard } from "@/components/Accessibility/AccessibilityFeatureCard";
import { Keyboard } from "lucide-react";

describe("AccessibilityFeatureCard", () => {
  it("renders the title", () => {
    render(
      <AccessibilityFeatureCard
        icon={<Keyboard />}
        title="Navigation & Keyboard Support"
        description="Our interface is fully navigable using a keyboard."
      />,
    );
    expect(screen.getByText("Navigation & Keyboard Support")).toBeDefined();
  });

  it("renders the description", () => {
    render(
      <AccessibilityFeatureCard
        icon={<Keyboard />}
        title="Navigation & Keyboard Support"
        description="Our interface is fully navigable using a keyboard."
      />,
    );
    expect(
      screen.getByText("Our interface is fully navigable using a keyboard."),
    ).toBeDefined();
  });

  it("renders the icon", () => {
    render(
      <AccessibilityFeatureCard
        icon={<Keyboard data-testid="feature-icon" />}
        title="Title"
        description="Description"
      />,
    );
    expect(screen.getByTestId("feature-icon")).toBeDefined();
  });
});
