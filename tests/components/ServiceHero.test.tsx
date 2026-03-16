import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Construction } from "lucide-react";
import { ServiceHero } from "@/components/services/ServiceHero";

describe("ServiceHero", () => {
  it("renders the service title", () => {
    render(
      <ServiceHero
        icon={<Construction data-testid="icon" />}
        title="Pothole Repair"
        description="Report a pothole on a municipal road."
      />
    );
    expect(screen.getByRole("heading", { level: 1, name: "Pothole Repair" })).toBeInTheDocument();
  });

  it("renders the service description", () => {
    render(
      <ServiceHero
        icon={<Construction />}
        title="Pothole Repair"
        description="Report a pothole on a municipal road."
      />
    );
    expect(screen.getByText("Report a pothole on a municipal road.")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <ServiceHero
        icon={<Construction data-testid="hero-icon" />}
        title="Pothole Repair"
        description="Report a pothole."
      />
    );
    expect(screen.getByTestId("hero-icon")).toBeInTheDocument();
  });
});
