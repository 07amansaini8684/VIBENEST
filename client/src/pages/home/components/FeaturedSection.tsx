import { ErrorState } from "@/components/skeletons/ErrorState";
import FeaturedSectionSkeleton from "@/components/skeletons/FeaturedSectionSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "./PlayButton";
// import { Music2 } from "lucide-react";


const FeaturedSection = () => {
    const { isLoading, featuredSongs, error } = useMusicStore();

    if (isLoading) {
        return <FeaturedSectionSkeleton />
    }
    if (error) return (
        <ErrorState />
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mt-5">
            {featuredSongs?.map((song) => (
                <div key={song._id} className="flex items-center bg-zinc-900 rounded-md overflow-hidden hover:bg-zinc-800/70 hover:ring-4 hover:ring-zinc-900/70 transition-all duration-300 p-2 group cursor-pointer relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative overflow-hidden">
                        <img src={song?.imageUrl} alt={song?.title} className="w-full h-full object-cover rounded-sm" />
                    </div>
                    <div className="flex-1 p-4">
                        <h3 className="text-sm font-semibold text-white line-clamp-1">{song?.title}</h3>
                        <p className="text-xs text-zinc-400 line-clamp-1 truncate">{song?.artist}</p>
                    </div>
                    <PlayButton song={song} />
                </div>
            ))}
        </div>
    )
}

export default FeaturedSection