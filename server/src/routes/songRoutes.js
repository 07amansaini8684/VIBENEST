import express from "express";
import {
  getAllSongs,
  getFeautredSongs,
  getMadeForyouSongs,
  getTrendingSongs,
} from "../controllers/songController.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeautredSongs);
router.get("/made-for-you", getMadeForyouSongs);
router.get("/trending", getTrendingSongs);

export default router;
