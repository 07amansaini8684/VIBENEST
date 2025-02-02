export interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string;
    createdAt : string;
    updatedAt : string;
}
export interface Album {
    _id: string;
    title: string;
    artist: string;
    releaseYear: number;
    imageUrl: string;
    songs: Song[];
    createdAt : Date;
    updatedAt : Date;
}

export interface Stats{
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;
}