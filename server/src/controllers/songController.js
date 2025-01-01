import { Song } from "../models/songModel.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find({}).sort({ createdAt: -1 });
    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }
    res.status(200).json({ message: "success!! got all songs", songs });
  } catch (error) {
    console.log("Error in getAllSongs controller", error);
    next(error);
  }
};

export const getFeautredSongs = async (req, res, next) => {
  try {
    // fetch  5-6 random songs using mongodb's aggregation pipeline...
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }
    res.status(200).json({ message: "success!! got feautred songs", songs });
  } catch (error) {
    console.log("Error in getFeautredSongs controller", error);
    next(error);
  }
};

export const getMadeForyouSongs = async (req, res, next) => {
  try {
    // fetch  4-5 random songs using mongodb's aggregation pipeline...
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 4,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }
    res.status(200).json({ message: "success!! got songs for you", songs });
  } catch (error) {
    console.log("Error in getMadeForyouSongs controller", error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
    try {
        // fetch  4-5 random songs using mongodb's aggregation pipeline...
        const songs = await Song.aggregate([
          {
            $sample: {
              size: 4,
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              artist: 1,
              imageUrl: 1,
              audioUrl: 1,
            },
          },
        ]);
        if (!songs) {
          return res.status(404).json({ message: "No songs found" });
        }
        res.status(200).json({ message: "success!! got songs for you", songs });
      } catch (error) {
        console.log("Error in getMadeForyouSongs controller", error);
        next(error);
      }
};
