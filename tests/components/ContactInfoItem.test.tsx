import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContactInfoItem } from "@/components/Contact/ContactInfoItem";
import { MapPin } from "lucide-react";

describe("ContactInfoItem", () => {
  it("renders the title", () => {
    render(
      <ContactInfoItem icon={<MapPin />} title="Main Office">
        <p>10235 101 St NW</p>
      </ContactInfoItem>,
    );
    expect(screen.getByText("Main Office")).toBeDefined();
  });

  it("renders the children content", () => {
    render(
      <ContactInfoItem icon={<MapPin />} title="Main Office">
        <p>10235 101 St NW, Suite 1500</p>
      </ContactInfoItem>,
    );
    expect(screen.getByText("10235 101 St NW, Suite 1500")).toBeDefined();
  });

  it("renders the icon", () => {
    render(
      <ContactInfoItem icon={<MapPin data-testid="icon" />} title="Main Office">
        <p>Content</p>
      </ContactInfoItem>,
    );
    expect(screen.getByTestId("icon")).toBeDefined();
  });

  it("defaults to h3 heading level", () => {
    render(
      <ContactInfoItem icon={<MapPin />} title="Main Office">
        <p>Content</p>
      </ContactInfoItem>,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Main Office" }),
    ).toBeDefined();
  });

  it("renders h2 when headingLevel=2", () => {
    render(
      <ContactInfoItem icon={<MapPin />} title="Main Office" headingLevel={2}>
        <p>Content</p>
      </ContactInfoItem>,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Main Office" }),
    ).toBeDefined();
  });
});
