import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};