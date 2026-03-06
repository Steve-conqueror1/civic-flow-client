import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AttachmentThumbnailGrid } from "@/components/requests";

const ATTACHMENTS = [
  { id: "1", src: "/photo1.jpg", alt: "Pothole photo 1" },
  { id: "2", src: "/photo2.jpg", alt: "Pothole photo 2" },
];

describe("AttachmentThumbnailGrid", () => {
  it("renders all attachment images", () => {
    render(<AttachmentThumbnailGrid attachments={ATTACHMENTS} />);
    expect(screen.getByAltText("Pothole photo 1")).toBeDefined();
    expect(screen.getByAltText("Pothole photo 2")).toBeDefined();
  });

  it("renders the correct number of thumbnails", () => {
    render(<AttachmentThumbnailGrid attachments={ATTACHMENTS} />);
    expect(screen.getAllByRole("img").length).toBe(2);
  });

  it("renders an empty state when no attachments provided", () => {
    render(<AttachmentThumbnailGrid attachments={[]} />);
    expect(screen.getByText(/no attachments/i)).toBeDefined();
  });

  it("renders a single attachment", () => {
    render(
      <AttachmentThumbnailGrid
        attachments={[{ id: "1", src: "/doc.png", alt: "Document" }]}
      />,
    );
    expect(screen.getAllByRole("img").length).toBe(1);
  });
});
