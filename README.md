
````markdown
<a id="readme-top"></a>

<h1 align="center">Welcome to serri-youtube-backend 👋</h1>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img alt="Node.js" src="https://img.shields.io/badge/node.js-20-blue?logo=node.js&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/docker-yes-blue?logo=docker&logoColor=white" />
</p>

> Backend app to fetch and search latest YouTube videos. It continuously fetches latest videos for a predefined search query using YouTube API, stores them in MongoDB, and exposes APIs for paginated listing, searching, and Swagger documentation.

---

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Run Locally](#run-locally)
  - [Run with Docker](#run-with-docker)
- [API Endpoints & Swagger](#api-endpoints--swagger)
- [Notes](#notes)
- [Author](#author)

---

## Description

<a id="description"></a>

This backend service is designed to:  

- Continuously fetch the latest YouTube videos for a given search query (e.g., football, news).  
- Store video details like title, description, published datetime, thumbnails, channel name in MongoDB.  
- Provide a **paginated GET API** to list videos sorted by published datetime.  
- Provide a **search API** to search videos by partial match in title or description.  
- Rotate multiple YouTube API keys automatically when quota is exceeded.  
- Expose a **Swagger dashboard** for interactive API documentation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Built With

<a id="built-with"></a>

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Prerequisites

<a id="prerequisites"></a>

To run the project locally or via Docker, you need:

- Node.js and npm installed
- MongoDB (Atlas cluster or local instance)
- YouTube Data API v3 key(s)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Installation & Setup

<a id="installation--setup"></a>

### Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/viraat0700/serri-youtube-backend.git
cd serri-youtube-backend
````

2. **Install dependencies:**

```bash
npm install
```

3. **Add `.env` file:**

> I will be providing the `.env` file, so you can set up your environment easily.
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

* Server runs on the port specified in `.env` (default: `8081`).
* Cron job fetches latest YouTube videos automatically every 10 seconds.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Run with Docker

1. **Ensure Docker is installed.**
2. **Build and start the Docker container:**

```bash
docker-compose up --build
```

* Server accessible at `http://localhost:8081`.
* Cron job inside the container will fetch YouTube videos automatically.

3. **Stop the container:**

```bash
docker-compose down
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## API Endpoints & Swagger

<a id="api-endpoints--swagger"></a>

### 1. Swagger Dashboard

* Swagger UI is available to explore all API endpoints interactively.
* URL (when running locally):

```
http://localhost:<PORT>/api-docs
```

Replace `<PORT>` with the port in your `.env` (default: 8081).

* It provides full request/response examples and allows testing the APIs directly from the browser.

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Notes

<a id="notes"></a>

* Multiple YouTube API keys are supported to prevent quota exhaustion.
* Partial, case-insensitive search is supported on title and description.
* MongoDB indexes optimize sorting and search performance.
* `.env` file will be provided to make setup faster and easier.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Author

<a id="author"></a>

👤 **Viraat Shrivastava**

* GitHub: [@viraat0700](https://github.com/viraat0700)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
```

---