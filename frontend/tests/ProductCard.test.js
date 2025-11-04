import { describe, test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../src/components/ProductCard.jsx";

const mockProduct = {
  id: 1,
  title: "iPhone 16",
  price: 1500,
  stock_status: "instock",
  category: "electronics",
  on_sale: true,
};

describe("ProductCard", () => {
  test("renders product details correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/iPhone 16/i)).toBeInTheDocument();
    expect(screen.getByText(/₹1500/i)).toBeInTheDocument();
    expect(screen.getByText(/In Stock/i)).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/On Sale/i)).toBeInTheDocument();
  });
});
