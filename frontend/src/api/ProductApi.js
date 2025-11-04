import axios from "axios";
const PRODUCT_API_URL =
  import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:4000";

export const fetchProducts = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/products`);
  return response.data;
};