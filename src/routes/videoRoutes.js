import express from "express";
import { getVideos, searchVideos } from "../controller/videoController.js";

const router = express.Router();

/**
 * @swagger
 * /api/videos:
 *   get:
 *     summary: Get paginated videos sorted by publish date
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of videos per page (default 10)
 *     responses:
 *       200:
 *         description: List of paginated videos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedVideos'
 */
router.get("/", getVideos);

/**
 * @swagger
 * /api/videos/search:
 *   get:
 *     summary: Search videos by title or description
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of matching videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       400:
 *         description: Query parameter is required
 */
router.get("/search", searchVideos);

export default router;
