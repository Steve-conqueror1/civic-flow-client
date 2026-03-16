import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MapPin, Camera, FileText } from "lucide-react";
import { ServiceRequirementsCard } from "@/components/services/ServiceRequirementsCard";

describe("ServiceRequirementsCard", () => {
  const items = [
    {
      icon: <MapPin data-testid="icon-location" />,
      label: "Location",
      description: "Street name, nearby intersection, or exact address.",
    },
    {
      icon: <Camera />,
      label: "Photo (Optional but recommended)",
      description: "A clear picture showing the size and context of the pothole.",
    },
    {
      icon: <FileText />,
      label: "Description",
      description: "Brief details about the severity.",
    },
  ];

  it("renders the section heading", () => {
    render(<ServiceRequirementsCard items={items} />);
    expect(screen.getByText("What You'll Need")).toBeInTheDocument();
  });

  it("renders all requirement labels", () => {
    render(<ServiceRequirementsCard items={items} />);
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Photo (Optional but recommended)")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders all requirement descriptions", () => {
    render(<ServiceRequirementsCard items={items} />);
    expect(
      screen.getByText("Street name, nearby intersection, or exact address.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("A clear picture showing the size and context of the pothole.")
    ).toBeInTheDocument();
  });

  it("renders the location icon", () => {
    render(<ServiceRequirementsCard items={items} />);
    expect(screen.getByTestId("icon-location")).toBeInTheDocument();
  });
});
