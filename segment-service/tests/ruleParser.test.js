import { parseRules } from "../util/ruleParser.js";

describe("parseRules()", () => {
  test("parses valid rules correctly", () => {
    const input = "price > 1000\nstock_status = instock";
    const result = parseRules(input);

    expect(result).toEqual([
      { field: "price", operator: ">", value: 1000 },
      { field: "stock_status", operator: "=", value: "instock" },
    ]);
  });

  test("throws error for unknown field", () => {
    const input = "weight > 10";
    expect(() => parseRules(input)).toThrow(/Unknown field/);
  });

  test("throws error for invalid numeric value", () => {
    const input = "price > abc";
    expect(() => parseRules(input)).toThrow(/Invalid numeric value/);
  });
});
