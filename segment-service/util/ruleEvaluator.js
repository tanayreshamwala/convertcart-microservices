export function evaluateRules(products, rules) {
  return products.filter(product =>
    rules.every(rule => {
      const { field, operator, value } = rule;

      if (!(field in product)) return false;

      const productValue = product[field];

      switch (operator) {
        case "=":
          return productValue == value;
        case "!=":
          return productValue != value;
        case ">":
          return productValue > value;
        case "<":
          return productValue < value;
        case ">=":
          return productValue >= value;
        case "<=":
          return productValue <= value;
        default:
          return false;
      }
    })
  );
}
