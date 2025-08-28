import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEYS = process.env.YOUTUBE_API_KEYS
  ? process.env.YOUTUBE_API_KEYS.split(",").map((k) => k.trim())
  : [];

let currentKeyIndex = 0;

const getApiKey = () => {
  if (API_KEYS.length === 0) {
    throw new Error(
      "No YouTube API keys found. Please set YOUTUBE_API_KEYS in .env"
    );
  }
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
};

export const fetchYouTubeVideos = async (query, publishedAfter) => {
  console.log("API KEY : ", API_KEYS);
  const apiKey = getApiKey();
  const url = "https://www.googleapis.com/youtube/v3/search";

  const params = {
    key: apiKey,
    q: query,
    part: "snippet",
    type: "video",
    order: "date",
    maxResults: 10,
  };

  if (publishedAfter) params.publishedAfter = publishedAfter;

  try {
    const { data } = await axios.get(url, { params });
    console.log("API RESPONSE:", data); // Success case me pura response ayega mujhe
    return data.items;
  } catch (error) {
    if (error.response) {
      console.error("API ERROR RESPONSE:", error.response.data); // ERROR case main mujhe yaha se exact error milega. Abhi error arha tha ki quota khtm hgya
      console.error("STATUS:", error.response.status);
    } else {
      console.error("Error fetching YouTube videos:", error.message);
    }
    return [];
  }
};
