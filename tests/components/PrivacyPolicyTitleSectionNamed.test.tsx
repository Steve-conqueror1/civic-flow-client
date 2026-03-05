import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PrivacyPolicyTitleSection } from "@/components/ProvacyPolicy";

describe("PrivacyPolicyTitleSection (named export from ProvacyPolicy)", () => {
  it("renders successfully", () => {
    render(<PrivacyPolicyTitleSection />);
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
  });

  it("renders the default privacy policy title", () => {
    render(<PrivacyPolicyTitleSection />);
    expect(screen.getByText(/privacy policy/i)).toBeDefined();
  });
});
