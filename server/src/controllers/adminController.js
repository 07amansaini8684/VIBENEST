import { Album } from "../models/albumModel.js";
import { Song } from "../models/songModel.js";
import cloudinary from "../lib/cloudinary.js";
// helper funtion  for cloudinary uploads



// uploading stuff on cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error in uploadToCloudinary");
  }
};

// creating a function to create a song
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Please upload both audio and image files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      duration,
      audioUrl,
      imageUrl,
      albumId: albumId || null,
    });
    await song.save();

    // if song belongs to an album, update the album's songs array
    if (albumId) {
      const album = await Album.findByIdUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.log("Error in createSong controller", error);
    next(error);
  }
};

// creating a function to delete a song
export const deleteSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    // if song belongs to an album, remove it from the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    await Song.findByIdAndDelete(songId);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSong controller", error);
    next(error);
  }
};

// creating a function to create an album

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;
    const imageUrl = await uploadToCloudinary(imageFile);
    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    await album.save();
    res.status(201).json({ message: "Album created successfully", album });
  } catch (error) {
    console.log("Error in createAlbum controller", error);
    next(error);
  }
};

// creating a function to delete an album
export const deleteAlbum = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const songDeleted = await Song.deleteMany({ albumId });
    const album = await Album.findByIdAndDelete(albumId);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum controller", error);
    next(error);
  }
};

// checking if user is Admin...
export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ message: "You are an admin", admin:true });
}