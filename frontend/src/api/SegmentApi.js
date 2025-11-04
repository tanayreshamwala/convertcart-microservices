import axios from "axios";

const SEGMENT_API_URL =
  import.meta.env.VITE_SEGMENT_API_URL || "http://localhost:5000";

export async function evaluateSegment(rulesText) {
  try {
    const response = await axios.post(`${SEGMENT_API_URL}/segments/evaluate`, { rulesText });
    return response.data; // { result: [...] }
  } catch (error) {
    // Handle errors consistently
    if (error.response) {
      // Server responded with a status code outside 2xx
      throw new Error(error.response.data.error || "Server error");
    } else if (error.request) {
      // No response received
      throw new Error("No response from segment service");
    } else {
      // Something else went wrong
      throw new Error(error.message || "Request failed");
    }
  }
}
