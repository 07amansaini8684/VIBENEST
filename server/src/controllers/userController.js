import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    console.log("Id",currentUserId)
    const users = await User.find({ clerk: { $ne: currentUserId } });
    res.status(200).json( users );
  } catch (error) {
    console.log("Error in getAllUsers controller", error);
    next(error);
  }
};
