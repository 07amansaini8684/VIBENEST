import { Song } from "../models/songModel.js";
import { User } from "../models/userModel.js";
import { Album } from "../models/albumModel.js";

export const getStats = async (req, res, next) => {
    try {
      // const totalSong = await Song.countDocuments();
      // const totalUsers = await User.countDocuments();
      // const totalAlbums = await Album.countDocuments();
  
      // optimization....
      const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
        await Promise.all([
          Song.countDocuments(),
          User.countDocuments(),
          Album.countDocuments(),
  
          /// but it is very costly operation... || looking forward for better approach
          Song.aggregate([
            {
              $unionWith: {
                coll: "albums",
                pipeline: [],
              },
            },
            {
              $group: {
                _id: "artist",
              },
            },
            {
              $count: "count",
            },
          ]),
        ]);
      res.json({
        totalSongs,
        totalUsers,
        totalAlbums,
        totalArtists: uniqueArtists[0]?.count || 0,
      });
  
  
      /// i will check if this work or not ...
      // const [songArtists, albumArtists] = await Promise.all([
      //     Song.distinct("artist"),
      //     Album.distinct("artist")
      // ]);
      
      //! Combine both arrays and remove duplicates
      // const uniqueArtists = new Set([...songArtists, ...albumArtists]);
      // const totalUniqueArtists = uniqueArtists.size;
      
      
    } catch (error) {
      console.log("Error in getTotalSongs controller", error);
      next(error);
    }
  }