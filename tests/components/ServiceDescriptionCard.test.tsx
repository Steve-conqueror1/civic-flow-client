import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FileText } from "lucide-react";
import { ServiceDescriptionCard } from "@/components/services/ServiceDescriptionCard";

describe("ServiceDescriptionCard", () => {
  const paragraphs = [
    "This service allows citizens to report potholes.",
    "Governed by the Municipal Government Act.",
  ];

  it("renders the section title", () => {
    render(
      <ServiceDescriptionCard
        title="Service Description"
        icon={<FileText />}
        paragraphs={paragraphs}
      />
    );
    expect(screen.getByText("Service Description")).toBeInTheDocument();
  });

  it("renders all paragraphs", () => {
    render(
      <ServiceDescriptionCard
        title="Service Description"
        icon={<FileText />}
        paragraphs={paragraphs}
      />
    );
    expect(screen.getByText("This service allows citizens to report potholes.")).toBeInTheDocument();
    expect(screen.getByText("Governed by the Municipal Government Act.")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <ServiceDescriptionCard
        title="Service Description"
        icon={<FileText data-testid="desc-icon" />}
        paragraphs={paragraphs}
      />
    );
    expect(screen.getByTestId("desc-icon")).toBeInTheDocument();
  });
});
