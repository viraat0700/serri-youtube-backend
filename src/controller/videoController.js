import { getPaginatedVideos, searchVideos as searchVideosService, saveVideos } from "../services/videoService.js";

export const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const videos = await getPaginatedVideos(page, limit);
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query is required" });
    const videos = await searchVideosService(q);
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
