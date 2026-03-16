import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceFAQAccordion } from "@/components/services/ServiceFAQAccordion";

describe("ServiceFAQAccordion", () => {
  const items = [
    {
      question: "What defines a pothole?",
      answer:
        "A pothole is a depression or hollow in a road surface caused by wear or subsidence.",
    },
    {
      question: "Is my street municipal or provincial?",
      answer:
        "Most local streets are municipal. Highways are typically provincial.",
    },
  ];

  it("renders the FAQ heading", () => {
    render(<ServiceFAQAccordion items={items} />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("renders all question summaries", () => {
    render(<ServiceFAQAccordion items={items} />);
    expect(screen.getByText("What defines a pothole?")).toBeInTheDocument();
    expect(screen.getByText("Is my street municipal or provincial?")).toBeInTheDocument();
  });

  it("renders all answer texts in the DOM", () => {
    render(<ServiceFAQAccordion items={items} />);
    expect(
      screen.getByText(
        "A pothole is a depression or hollow in a road surface caused by wear or subsidence."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Most local streets are municipal. Highways are typically provincial.")
    ).toBeInTheDocument();
  });
});
