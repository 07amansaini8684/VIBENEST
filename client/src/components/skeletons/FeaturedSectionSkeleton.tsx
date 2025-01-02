import { Loader2, Music2 } from "lucide-react"


const FeaturedSectionSkeleton = () => {
    return (
        <div className="space-y-4 mt-4 px-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Music2 className="w-8 h-8 text-emerald-500" />
                    <div className="h-6 bg-zinc-800 rounded animate-pulse w-32" />
                </div>
                <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
            </div>
            <div className="h-5 bg-zinc-800 rounded animate-pulse w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 ">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-zinc-800/50 rounded-lg p-2 flex items-center hover:ring-4 hover:ring-emerald-500/70 transition-all duration-300 w-full cursor-progress">
                        <div className="w-20 h-20 bg-zinc-800 rounded animate-pulse flex-shrink-0" />
                        <div className="ml-2 flex-1 gap-2 flex flex-col">
                            <div className="h-3.5 bg-zinc-800 rounded animate-pulse w-3/4" />
                            <div className="h-3.5 bg-zinc-800 rounded animate-pulse w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedSectionSkeleton