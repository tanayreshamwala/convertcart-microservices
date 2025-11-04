export function parseRules(rulesText) {
  // ✅ Define allowed fields
  const validFields = ["price", "stock_status", "category", "on_sale", "title"];

  // ✅ Define which fields are numeric
  const numericFields = ["price"];

  return rulesText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      // Supports =, !=, >, <, >=, <=
      const match = line.match(/^(\w+)\s*(=|!=|>=|<=|>|<)\s*(.+)$/);
      if (!match) {
        throw new Error(`Invalid rule format: "${line}"`);
      }

      const [, field, operator, valueRaw] = match;
      let value = valueRaw.trim();

      // ✅ Validate field
      if (!validFields.includes(field)) {
        throw new Error(
          `Unknown field: "${field}". Allowed fields: ${validFields.join(", ")}`
        );
      }

      // ✅ Convert types and validate numeric values
      if (!isNaN(value)) {
        value = Number(value);
      } else if (value.toLowerCase() === "true") {
        value = true;
      } else if (value.toLowerCase() === "false") {
        value = false;
      }

      const numericOperators = [">", "<", ">=", "<="];
      if (
        (numericFields.includes(field) ||
          numericOperators.includes(operator)) &&
        typeof value !== "number"
      ) {
        throw new Error(`Invalid numeric value for "${field}": "${valueRaw}"`);
      }

      return { field, operator, value };
    });
}
