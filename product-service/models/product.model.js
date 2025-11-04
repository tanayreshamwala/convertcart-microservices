import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String },
    price: { type: Number },
    stock_status: { type: String },
    stock_quantity: { type: Number, default: null },
    category: { type: String },
    tags: { type: [String], default: [] },
    on_sale: { type: Boolean, default: false },
    createdAt: { type: Date },
  },
  { timestamps: true, _id: false }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
