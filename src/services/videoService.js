import Video from "../models/Video.js";

export const getPaginatedVideos = async (page, limit) => {
  const skip = (page - 1) * limit;
  const videos = await Video.find()
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Video.countDocuments();
  return {
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    videos,
  };
};

export const searchVideos = async (query) => {
  return Video.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  }).sort({ publishedAt: -1 });
};

export const saveVideos = async (videos) => {
  for (const v of videos) {
    await Video.updateOne(
      { videoId: v.id.videoId },
      {
        $set: {
          title: v.snippet.title,
          description: v.snippet.description,
          publishedAt: v.snippet.publishedAt,
          thumbnails: v.snippet.thumbnails,
          channelTitle: v.snippet.channelTitle,
        },
      },
      { upsert: true }
    );
  }
};
