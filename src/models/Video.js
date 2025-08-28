import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: { type: String, unique: true, index: true },
    title: { type: String, text: true },
    description: { type: String, text: true },
    publishedAt: { type: Date, index: true },
    thumbnails: Object,
    channelTitle: String,
  },
  { timestamps: true }
);

// Indexes for faster search
videoSchema.index({ title: "text", description: "text" });

export default mongoose.model("Video", videoSchema);
