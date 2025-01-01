/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import {create} from "zustand";

type MusicStore = {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;

    fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums:[],
    songs:[],
    isLoading: false,
    error: null,

    fetchAlbums: async () => {
    set({isLoading: true, error: null});
    try {
        const response = await axiosInstance.get("/albums");
        set({albums: response.data, isLoading: false, error: null});
    } catch (error:any) {
        set({error: error.response.data.message});
    }finally{
        set({isLoading: false})
    }
    },
}))