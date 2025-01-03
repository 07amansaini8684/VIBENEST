import { Song } from "@/types";
import { create } from "zustand"


interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentSongIndex: number;

    initializePlayer: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentSongIndex: -1,

    // write all the function
    initializePlayer: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentSongIndex: get().currentSongIndex === -1 ? 0 : get().currentSongIndex,

        })
    },
    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;
        const song = songs[startIndex];

        set({
            queue: songs,
            currentSong: song,
            currentSongIndex: startIndex,
            isPlaying: true,
        })
    },
    setCurrentSong: (song: Song | null) => {
        if (!song) return;
        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        set({
            currentSong: song,
            isPlaying: true,
            currentSongIndex: songIndex !== -1 ? songIndex : get().currentSongIndex,
        })
    },
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        set({
            isPlaying: willStartPlaying,
        })
    },
    playNext: () => {
        const { currentSongIndex, queue } = get();
        
        // If the queue is empty, stop playing
        if (queue.length === 0) {
            set({ isPlaying: false });
            return;
        }
        
        // Calculate next song index with loop
        const nextSongIndex = (currentSongIndex + 1) % queue.length;
        
        // Get the next song (will loop back to first song if at end)
        const nextSong = queue[nextSongIndex];
        
        // Update state with next song
        set({
            currentSong: nextSong,
            currentSongIndex: nextSongIndex,
            isPlaying: true
        });
    },
    playPrevious: () => { 
        const { currentSongIndex, queue } = get();
        
        // If the queue is empty, stop playing
        if (queue.length === 0) {
            set({ isPlaying: false });
            return;
        }
        const prevSongIndex = currentSongIndex - 1 ;
        if(prevSongIndex >=0){
            const prevSong = queue[prevSongIndex];
            set({
                currentSong: prevSong,
                currentSongIndex: prevSongIndex,
                isPlaying: true
            })
        }else{
            // no prev song
            set({isPlaying: true})
        }
    },

}))


