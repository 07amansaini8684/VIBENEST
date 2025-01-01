import { User } from "../models/userModel.js";

export const authCallback =  async (req, res, next) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;
      const user = await User.findOne({ clerk: id });
  
      if (!user) {
        // signup
        await User.create({
          fullName: `${firstName} ${lastName}`,
          imageUrl: imageUrl,
          clerk: id,
        });
      }
  
      res.status(200).json({ message: "success" });
  
    } catch (error) {
      console.error("error in the auth callback",error);
      next(error)
    }
  }