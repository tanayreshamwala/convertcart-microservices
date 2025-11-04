import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import segmentRoutes from "./routes/segments.routes.js";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/segments", segmentRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Segment service running on port ${PORT}`));
}

export default app;
