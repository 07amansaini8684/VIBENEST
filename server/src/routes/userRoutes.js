import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getAllUsers } from "../controllers/userController.js"
const router = express.Router()


router.get("/",protectRoute, getAllUsers)
// todo: getMessages....

export default router