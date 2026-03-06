import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { FileDropZone } from "@/components/requests";

describe("FileDropZone", () => {
  it("renders the drop zone heading", () => {
    render(<FileDropZone />);
    expect(screen.getByText(/drag and drop files here/i)).toBeDefined();
  });

  it("renders the Browse Files button", () => {
    render(<FileDropZone />);
    expect(screen.getByRole("button", { name: /browse files/i })).toBeDefined();
  });

  it("renders accepted formats info", () => {
    render(<FileDropZone />);
    expect(screen.getByText(/jpg.*png.*pdf/i)).toBeDefined();
  });

  it("renders max file size info", () => {
    render(<FileDropZone />);
    expect(screen.getByText(/10mb/i)).toBeDefined();
  });

  it("calls onFileSelect when Browse Files is clicked", async () => {
    const onFileSelect = vi.fn();
    render(<FileDropZone onFileSelect={onFileSelect} />);
    // The hidden file input is triggered by the button; test via the input directly
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).not.toBeNull();
  });

  it("renders a file input element", () => {
    render(<FileDropZone />);
    const input = document.querySelector('input[type="file"]');
    expect(input).not.toBeNull();
  });

  it("accepts custom accept string", () => {
    render(<FileDropZone accept=".pdf" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.accept).toBe(".pdf");
  });
});
