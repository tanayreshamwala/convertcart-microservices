import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { startProductIngestCron } from "./util/productIngestCron.js";
import productsRouter from "./routes/products.routes.js";
configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;
const DB_URI =
  process.env.MONGODB_URL || "mongodb://localhost:27017/convertcart";

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productsRouter);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to DB at", DB_URI);
    app.listen(PORT, () => {
      console.log(`Product Service is running on port ${PORT}`);
      startProductIngestCron();
    });
  })
  .catch((error) => console.log("Failed to connect to DB\n", error));
