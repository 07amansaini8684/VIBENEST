export interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string;
    createdAt : Date;
    updatedAt : Date;
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