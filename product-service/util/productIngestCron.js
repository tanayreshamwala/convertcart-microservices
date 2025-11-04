import axios from "axios";
import cron from "node-cron";
import { configDotenv } from "dotenv";
import Product from "../models/product.model.js";
configDotenv();

const BASE = "https://wp-multisite.convertcart.com/wp-json/wc/v3/products";
const AUTH_PARAMS = `?consumer_key=${process.env.CONSUMER_KEY}&consumer_secret=${process.env.CONSUMER_SECRET}`;

const ingestProducts = async () => {
  console.log("Starting product ingestion cron job");
  try {
    console.log(BASE + AUTH_PARAMS);
    const { data } = await axios.get(BASE + AUTH_PARAMS);
    for (const product of data) {
      await Product.findOneAndUpdate(
        { id: product.id },
        {
          id: product.id,
          title: product.name,
          price: parseFloat(product.price) || 0,
          stock_status: product.stock_status,
          stock_quantity: product.stock_quantity,
          category:
            product.categories.length > 0
              ? product.categories[0].name
              : "Uncategorized",
          tags: product.tags.map((tag) => tag.name),
          on_sale: product.on_sale,
          createdAt: new Date(product.date_created),
        },
        { upsert: true, new: true }
      );
    }
    console.log(`Ingested ${data.length} products from WooCommerce`);
  } catch (err) {
    console.error("Error fetching products from WooCommerce:", err.message);
  }
};

export const startProductIngestCron = () => {
  ingestProducts(); // Initial run
  cron.schedule("0 */6 * * *", ingestProducts);
};
