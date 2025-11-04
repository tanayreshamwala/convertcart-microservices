import { jest, describe, test, expect } from "@jest/globals";
import { render, screen, fireEvent, waitFor, beforeEach } from "@testing-library/react";
import "@testing-library/jest-dom";
import SegmentEditor from "../src/components/SegmentEditor.jsx";
import { evaluateSegment } from "../src/api/SegmentApi.js";

jest.mock("../src/api/SegmentApi");

describe("SegmentEditor", () => {
  beforeEach(() => jest.clearAllMocks());

  test("renders text field and buttons", () => {
    render(<SegmentEditor />);
    expect(screen.getByText(/Segment Editor/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Evaluate Filter/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
  });

  test("calls evaluateSegment and displays results", async () => {
    const mockProducts = [
      { id: 1, title: "MacBook", price: 2000, stock_status: "instock", category: "electronics", on_sale: true },
    ];
    evaluateSegment.mockResolvedValueOnce({ result: mockProducts });

    render(<SegmentEditor />);

    const textArea = screen.getByLabelText(/Enter filter rules/i);
    fireEvent.change(textArea, { target: { value: "price > 1000" } });

    fireEvent.click(screen.getByRole("button", { name: /Evaluate Filter/i }));

    await waitFor(() => {
      expect(evaluateSegment).toHaveBeenCalledWith("price > 1000");
      expect(screen.getByText(/MacBook/i)).toBeInTheDocument();
    });
  });

  test("shows error alert when API fails", async () => {
    evaluateSegment.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<SegmentEditor />);

    fireEvent.change(screen.getByLabelText(/Enter filter rules/i), { target: { value: "price > 1000" } });
    fireEvent.click(screen.getByRole("button", { name: /Evaluate Filter/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });
  });
});
