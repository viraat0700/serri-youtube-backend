import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "YouTube Video API",
      version: "1.0.0",
      description: "API to fetch and search latest YouTube videos",
    },
    servers: [
      {
        url: "http://localhost:8080", 
      },
    ],
    components: {
      schemas: {
        Video: {
          type: "object",
          properties: {
            videoId: { type: "string", example: "abc123" },
            title: { type: "string", example: "How to make tea?" },
            description: { type: "string", example: "This is a tutorial video" },
            publishedAt: { type: "string", format: "date-time" },
            thumbnails: { type: "object", example: { default: { url: "https://img.youtube.com/..." } } },
            channelTitle: { type: "string", example: "TeaChannel" },
          },
        },
        PaginatedVideos: {
          type: "object",
          properties: {
            total: { type: "integer", example: 100 },
            page: { type: "integer", example: 1 },
            limit: { type: "integer", example: 10 },
            videos: { type: "array", items: { $ref: "#/components/schemas/Video" } },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")], 
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
