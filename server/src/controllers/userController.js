import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.status(200).json({ message: "success!! got all users", users });
  } catch (error) {
    console.log("Error in getAllUsers controller", error);
    next(error);
  }
};
