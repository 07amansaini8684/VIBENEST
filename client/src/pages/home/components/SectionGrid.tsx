
import { ErrorState } from "@/components/skeletons/ErrorState";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { Song } from "@/types";
import { ChevronRight } from "lucide-react";
import PlayButton from "./PlayButton";

type SectionProps = {
    title: string;
    songs: Song[];
    isLoading: boolean;
    error: string | null;

}
const SectionGrid = ({ title, songs, isLoading, error }: SectionProps) => {
    // console.log(title, songs)

    if (isLoading) return <SectionGridSkeleton />
    if (error) return <ErrorState />

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center justify-center space-x-2 px-4 py-2 w-28"
                >
                    <span className="text-sm">View all</span>
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" >
                {songs.map((song) => (
                    <div key={song?._id} className="bg-zinc-900 p-3 rounded-md hover:bg-zinc-800/90 transition-all duration-300 group cursor-pointer">
                        <div className="relative mb-4">
                            <div className="aspcet-square rounded-sm shadow-md overflow-hidden bg-zinc-700">
                                <img src={song?.imageUrl ? song?.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXu2w9IxdJUjhuovZecMR3d9f_bPnCINJl5g&s"} alt="song image" className="  w-ull h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                           <PlayButton song={song}/>
                        </div>
                        <div className="flex flex-col px-2">
                            <h3 className="text-md font-semibold">{song?.title ? song.title : "Unknown" }</h3>
                            <span className="text-xs text-zinc-400">{song?.artist ? song.artist : "Unknown" }</span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default SectionGrid