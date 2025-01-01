import { Album } from "../models/albumModel.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find({});
    if (!albums) {
      return res.status(404).json({ message: "No albums found" });
    }
    res.status(200).json(albums);
  } catch (error) {
    console.log("Error in getAllAlbums controller", error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    console.log("Error in getAlbumById controller", error);
    next(error);
  }
};
