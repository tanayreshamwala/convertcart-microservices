import axios from "axios";
import { parseRules } from "../util/ruleParser.js";
import { evaluateRules } from "../util/ruleEvaluator.js";

export const evaluateSegmentRules = async (req, res) => {
  try {
    const { rulesText } = req.body;
    if (!rulesText || typeof rulesText !== "string") {
      return res.status(400).json({ error: "rulesText is required" });
    }

    // Parse rules
    const rules = parseRules(rulesText);

    // Fetch products from product-service
    const { data: products } = await axios.get("http://product-service:4000/products");

    // Apply rules
    const filtered = evaluateRules(products, rules);

    res.json({ result: filtered });
  } catch (err) {
    console.error("Error in /segments/evaluate:", err.message);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
