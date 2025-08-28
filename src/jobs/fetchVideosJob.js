import cron from "node-cron";
import dotenv from "dotenv";
import { fetchYouTubeVideos } from "../config/youtube.js";
import * as videoService from "../services/videoService.js";

dotenv.config();

const QUERY = process.env.YOUTUBE_QUERY || "Cricket";
console.log("YOUTUBE_QUERY :", process.env.YOUTUBE_QUERY);

let lastFetchTime = new Date().toISOString();

const fetchAndStoreVideos = async () => {
  try {
    const videos = await fetchYouTubeVideos(QUERY, lastFetchTime);

    if (videos.length > 0) {
      await videoService.saveVideos(videos);

      videos.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
      );

      const latestPublishedAt = videos[0].snippet.publishedAt;
      lastFetchTime = latestPublishedAt;

      console.log(
        `Fetched & stored ${videos.length} new videos. Updated lastFetchTime: ${lastFetchTime}`
      );
    } else {
      console.log("No new videos found");
    }
  } catch (err) {
    console.error("Error fetching videos:", err.message);
  }
};

export const fetchVideosJob = cron.schedule(
  "*/10 * * * * *",
  fetchAndStoreVideos,
  { scheduled: false }
);
