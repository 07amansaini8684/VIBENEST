import express from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();

// optimizing!! #clean code
router.use(protectRoute, requireAdmin);
// adming check
router.get("/check", checkAdmin);
// songs
router.post("/songs", createSong);
router.delete("/songs/:songId", deleteSong);

// albums
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
