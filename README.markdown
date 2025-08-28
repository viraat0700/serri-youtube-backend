# Welcome to serri-youtube-backend 👋

> Backend app to fetch and search the latest YouTube videos. It continuously fetches videos for a predefined query using the YouTube API, stores them in MongoDB, and exposes APIs for paginated listing, searching, and Swagger documentation.

---

## Table of Contents

- Description
- Built With
- Prerequisites
- Installation & Setup
  - Run Locally
  - Run with Docker
- API Endpoints & Swagger
- Notes
- Author
- License

---

## Description

This backend service is designed to:

- Continuously fetch the latest YouTube videos for a given search query (e.g., football, news).
- Store video details like title, description, published datetime, thumbnails, and channel name in MongoDB.
- Provide a **paginated GET API** to list videos sorted by published datetime.
- Offer a **search API** to search videos by partial match in title or description.
- Automatically rotate multiple YouTube API keys when the quota is exceeded.
- Expose a **Swagger dashboard** for interactive API documentation.

---

## Built With

- Node.js
- Express
- MongoDB
- Docker
- Swagger UI

---

## Prerequisites

To run the project locally or via Docker, you need:

- Node.js (version 20 or higher) and npm installed
- MongoDB (Atlas cluster or local instance)
- YouTube Data API v3 key(s)

---

## Installation & Setup

### Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/viraat0700/serri-youtube-backend.git
   cd serri-youtube-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add** `.env` **file:**

   > Example `.env` content:

   ```env
   PORT=8081
   CONNECTION_STRING=<your-mongodb-connection-string>
   YOUTUBE_API_KEYS=<comma-separated-keys>
   YOUTUBE_QUERY=Football
   ```

4. **Run the server:**

   ```bash
   npm start
   ```

   - Server runs on the port specified in `.env` (default: `8081`).
   - Cron job fetches the latest YouTube videos automatically every 10 seconds.

---

### Run with Docker

1. **Ensure Docker and Docker Compose are installed.**

2. **Build and start the Docker container:**

   ```bash
   docker-compose up --build
   ```

   - Server accessible at `http://localhost:8081`.
   - Cron job inside the container fetches YouTube videos automatically.

3. **Stop the container:**

   ```bash
   docker-compose down
   ```

---

## API Endpoints & Swagger

### 1. Swagger Dashboard

- Swagger UI is available to explore all API endpoints interactively.

- URL (when running locally):

  ```
  http://localhost:<PORT>/api-docs
  ```

  Replace `<PORT>` with the port in your `.env` (default: 8081).

- It provides full request/response examples and allows testing APIs directly from the browser.

---

### 2. Get Paginated Videos

```
GET /api/videos?page=<page>&limit=<limit>
```

**Example:**

```
GET /api/videos?page=1&limit=10
```

**Response:**

```json
{
  "total": 100,
  "page": 1,
  "limit": 10,
  "videos": [
    {
      "videoId": "abc123",
      "title": "Latest Football Highlights",
      "description": "Watch the latest football matches...",
      "publishedAt": "2025-08-28T10:00:00Z",
      "thumbnails": { "default": { "url": "https://..." } },
      "channelTitle": "Football Channel"
    }
  ]
}
```

---

### 3. Search Videos

```
GET /api/videos/search?q=<search-term>
```

**Example:**

```
GET /api/videos/search?q=football
```

**Response:** Similar to paginated videos but filtered by partial matches in title or description.

---

## Notes

- Multiple YouTube API keys are supported to prevent quota exhaustion.
- Partial, case-insensitive search is supported on title and description.
- MongoDB indexes optimize sorting and search performance.
- The `.env` file is provided to simplify setup.

---

## Author

👤 **Viraat Shrivastava**

- GitHub: @viraat0700
