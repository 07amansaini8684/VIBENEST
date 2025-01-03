import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types"
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
    const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
    const isCurrentSong = currentSong?._id === song._id
    const handlePlay = () => {
        if (isCurrentSong) togglePlay()
        else setCurrentSong(song)
    }

    return (
        <Button size={"icon"} onClick={handlePlay} className={`absolute bottom-4 rounded-full p-2 px-2.5 right-2 bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-500 translate-y-2 ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100  '} `}>
            {isCurrentSong && isPlaying ? (
                <Pause className="h-4 w-4 text-black " />
            ) : (
                <Play className="h-4 w-4 text-black " />
            )}
        </Button>
    )
}

export default PlayButton