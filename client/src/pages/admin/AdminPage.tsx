import { useAuthStore } from "@/stores/useAuthStore"
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {

    const { isAdmin, isLoading } = useAuthStore();

    const { fetchStats, fetchAlbums, fetchSongs } = useMusicStore()

    useEffect(() => {
        fetchAlbums()
        fetchSongs()
        fetchStats()
    }, [fetchAlbums, fetchSongs, fetchStats])

    if (!isAdmin && !isLoading) return <div>Unauthorized..</div>
    return (
        <div className="min-h-screen w-full bg-zinc-900/70 p-5">
            <Header />
            <Dashboard />
            <Tabs defaultValue="songs" className="mt-5 space-y-6 ">
                <TabsList className="p-1 bg-zinc-800 rounded">
                    <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-700">
                        <Music className="mr-2 size-4" />
                        Songs
                    </TabsTrigger>
                    <TabsTrigger value="albums" className="data-[state=active]:bg-zinc-700">
                        <Album className="mr-2 size-4" />
                        Albums
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="songs"><SongsTabContent /></TabsContent>
                <TabsContent value="albums"><AlbumsTabContent /></TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminPage