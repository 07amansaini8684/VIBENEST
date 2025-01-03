import { LoadingSkeleton } from "@/components/skeletons/LoadingSkeleton";
import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {

  const { isLoading, error, madeForYouSongs, trendingSongs,featuredSongs, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  const {initializePlayer} = usePlayerStore()

  useEffect(() => {
    if(madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0){
      // const allSongs = {...featuredSongs, ...madeForYouSongs, ...trendingSongs};
      // initializePlayer(allSongs)
    }
  },[initializePlayer, madeForYouSongs, featuredSongs, trendingSongs])

  // console.log({isLoading, error, madeForYouSongs, featuredSongs, trendingSongs})
  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-900 to-black p-2">
      <Topbar />
      <ScrollArea className="h-full">
        {/* // todo: check what happe when we put h-[calc(100vh-180px)] instead of h-full */}
        <div className="p-4 py-2 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Good Afternoon buddy
          </h1>
          <FeaturedSection />
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} error={error} />
          <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} error={error} />
        </div>

      </ScrollArea>
    </div>
  )
}

export default HomePage