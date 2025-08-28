import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import videoRoutes from "./routes/videoRoutes.js";
import { fetchVideosJob } from "./jobs/fetchVideosJob.js";
import { setupSwagger } from "./config/swagger.js";

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/videos", videoRoutes);

// Swagger UI
setupSwagger(app);

// Connect DB
connectDB();

// Start cron job
fetchVideosJob.start();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});

export default app;
