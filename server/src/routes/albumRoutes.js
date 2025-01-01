import express from "express"
import { getAlbumById, getAllAlbums } from "../controllers/albumController.js"
const router = express.Router()

router.get("/", getAllAlbums)
router.get("/:albumId", getAlbumById)


export default router