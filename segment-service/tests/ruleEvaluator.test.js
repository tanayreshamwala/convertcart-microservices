import { evaluateRules } from "../util/ruleEvaluator.js";

const products = [
  { id: 1, title: "iPhone 16", price: 1200, stock_status: "instock", category: "electronics", on_sale: true },
  { id: 2, title: "Shoes", price: 500, stock_status: "outofstock", category: "clothing", on_sale: false },
];

describe("evaluateRules()", () => {
  test("filters by numeric field", () => {
    const rules = [{ field: "price", operator: ">", value: 1000 }];
    const result = evaluateRules(products, rules);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("iPhone 16");
  });

  test("filters by category", () => {
    const rules = [{ field: "category", operator: "=", value: "clothing" }];
    const result = evaluateRules(products, rules);
    expect(result[0].title).toBe("Shoes");
  });

  test("filters by boolean field", () => {
    const rules = [{ field: "on_sale", operator: "=", value: true }];
    const result = evaluateRules(products, rules);
    expect(result).toHaveLength(1);
  });
});
