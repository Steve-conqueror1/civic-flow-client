import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Construction } from "lucide-react";
import PopularServiceCard from "@/components/PopularServiceCard";

describe("PopularServiceCard", () => {
  const defaultProps = {
    title: "Report Pothole",
    href: "/services/infrastructure/pothole",
    icon: Construction,
  };

  it("renders the service title", () => {
    render(<PopularServiceCard {...defaultProps} />);
    expect(screen.getByText("Report Pothole")).toBeInTheDocument();
  });

  it("renders as a link with the correct href", () => {
    render(<PopularServiceCard {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/services/infrastructure/pothole");
  });
});
