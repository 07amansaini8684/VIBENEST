import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/stores/useMusicStore"
import { Clock, PlayIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const AlbumPage = () => {
    // generating randome colors 
    const [color, setColor] = useState<string>('');

    useEffect(() => {
        // Generate a random color
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        setColor(randomColor);
    }, []); // Empty dependency array ensures this runs only once when the component mounts


    const formatDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };


    const { albumId } = useParams<{ albumId: string }>()
    const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore()
    useEffect(() => {
        if (albumId) fetchAlbumById(albumId)
    }, [fetchAlbumById, albumId])
    if (isLoading) return <div className="h-screen w-full flex items-center justify-center text-3xl text-zinc-500">Loading...</div>


    return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-md">
                {/* // main Conent  */}
                <div className="relative min-h-full">
                    <div
                        className="absolute inset-0 bg-gradient-to-b via-zinc-900/80 pointer-events-none"
                        style={{
                            background: `linear-gradient(to bottom, ${color} 0%, rgba(24, 24, 27, 0) 100%)`
                        }}
                        aria-hidden="true"
                    />

                    {/* // content  */}
                    <div className="relative z-10">
                        <div className="flex p-6 gap-6 pb-8">
                            <img
                                src={currentAlbum?.imageUrl}
                                alt={currentAlbum?.title}
                                className="w-60 h-60 object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-end gap-2 py-2">
                                <p className="text-zinc-300 text-sm font-medium">Album</p>
                                <h2 className="text-5xl font-bold">{currentAlbum?.title}</h2>
                                <p className="text-zinc-200">{currentAlbum?.artist}</p>
                                <div className="flex items-center gap-2 text-sm text-zinc-100">
                                    <span>{currentAlbum?.songs?.length} songs</span>
                                    <span>• {currentAlbum?.releaseYear}</span>
                                </div>
                            </div>
                        </div>
                        {/* //controls -play button */}
                        <div className="px-6 pb-4 flex items-center gap-4">
                            <Button size="icon" className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 hover:scale-105 transition-all">
                                <PlayIcon className="text-zinc-900 h-7 w-7" />
                            </Button>
                        </div>
                        {/* // songs list  */}

                    </div>

                </div>
                <div className="bg-black/20 backdrop-blur-sm">
                    {/* /// list header  */}
                    <div className="grid mt-10 grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-zinc-800">
                        <div>#</div>
                        <div>Title</div>
                        <div>Release Date</div>
                        <div>
                            <Clock className='ml-3 h-4 w-4' />
                        </div>
                    </div>
                    {/* // songs */}
                    <div className="px-6">
                        <div className="space-y-2 py-4">

                            {currentAlbum?.songs?.map((song, index) => (
                                <div
                                    key={song._id}
                                    className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 py-2 text-sm border-b border-zinc-800 hover:bg-white/5 rounded-md group cursor-pointer"
                                >
                                    <div className="flex items-center justify-center text-zinc-500 group-hover:text-white">
                                        <span className="group-hover:hidden">{index + 1}</span>
                                        <PlayIcon className="hidden group-hover:block" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={song.imageUrl}
                                            alt={song.title}
                                            className="w-10 h-10 object-cover rounded-md"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-zinc-400 group-hover:text-white">{song.title}</p>
                                            <p className="text-zinc-400 group-hover:text-white">{song.artist}</p>
                                        </div>

                                    </div>
                                    <div className="flex items-center text-zinc-400">{song.createdAt.split("T")[0]}</div>
                                    <div className="  text-zinc-400">{formatDuration(song.duration)}</div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default AlbumPage