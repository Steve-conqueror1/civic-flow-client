import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { UploadedFileCard } from "@/components/requests";

const FILE_PROPS = {
  id: "1",
  name: "proof_of_residency.pdf",
  size: "1.2 MB",
  type: "PDF",
};

describe("UploadedFileCard", () => {
  it("renders the file name", () => {
    render(<UploadedFileCard {...FILE_PROPS} />);
    expect(screen.getByText("proof_of_residency.pdf")).toBeDefined();
  });

  it("renders the file size and type", () => {
    render(<UploadedFileCard {...FILE_PROPS} />);
    expect(screen.getByText(/1\.2 MB/i)).toBeDefined();
    expect(screen.getByText(/PDF/)).toBeDefined();
  });

  it("renders a delete button", () => {
    render(<UploadedFileCard {...FILE_PROPS} />);
    expect(screen.getByRole("button", { name: /delete/i })).toBeDefined();
  });

  it("calls onDelete with the file id when delete is clicked", async () => {
    const onDelete = vi.fn();
    render(<UploadedFileCard {...FILE_PROPS} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("renders a file icon for non-image types", () => {
    render(<UploadedFileCard {...FILE_PROPS} />);
    expect(screen.getByTestId("file-icon")).toBeDefined();
  });

  it("renders an image preview when previewUrl is provided", () => {
    render(
      <UploadedFileCard
        {...FILE_PROPS}
        name="photo.png"
        type="PNG"
        previewUrl="/preview.png"
      />,
    );
    expect(screen.getByRole("img", { name: /photo\.png/i })).toBeDefined();
  });
});
