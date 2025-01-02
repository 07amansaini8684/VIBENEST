import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/stores/useMusicStore"
import { SignedIn } from "@clerk/clerk-react"
import { HomeIcon, Library, MessageSquareIcon } from "lucide-react"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const LeftSidebar = () => {
    // data fetching =...
    const { albums, fetchAlbums, isLoading, error } = useMusicStore();
    useEffect(() => { fetchAlbums() }, [fetchAlbums])
    // console the data
    // console.log(albums)
    if (error) {
        toast.error(error)
    }
    return (
        <div className="h-full flex flex-col gap-2">
            {/* // navigation menu */}
            <div className="rounded-md bg-zinc-900 p-4">
                <div className="space-y-2">
                    <Link to={"/"} className={cn(buttonVariants({ variant: "ghost", size: "sm", className: "w-full justify-start text-white hover:bg-zinc-800/75 " }))}><HomeIcon className="size-5 " /> <span className="hidden md:inline">Home</span></Link>

                    <SignedIn>
                        <Link to={"/chat"} className={cn(buttonVariants({ variant: "ghost", size: "sm", className: "w-full justify-start text-white hover:bg-zinc-800/75 " }))}><MessageSquareIcon className="size-5 " /> <span className="hidden md:inline">Messages</span></Link>
                    </SignedIn>
                </div>
            </div>
            {/* // library section  */}
            <div className="flex-1 rounded-md bg-zinc-900 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-white px-2">
                        <Library className="size-5 mr-2" />
                        <span className="hidden md:inline">Playlists</span>
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album) => (
                                <Link to={`/album/${album._id}`} key={album._id} className="p-2 hover:bg-zinc-800/75 rounded-md flex items-center gap-3 group cursor-pointer">
                                    <img src={album?.imageUrl ? album.imageUrl : "https://i.pinimg.com/474x/20/b9/2d/20b92d0cf87f5f88418d075f8fd4c506.jpg"} alt="album img" className="size-12 rounded-md flex-shrink-0 hover:animate-pulse object-cover" />
                                    <div className="flex-1 min-w-0 hidden md:block">
                                        <p className="font-medium truncate">{album?.title ? album.title : "Dattebayo" }</p>
                                        <p className="text-zinc-400 text-xs  truncate">Album · {album?.artist ? album.artist : "Naruto" }</p>
                                    </div>
                                </Link>
                            ))  
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default LeftSidebar