import { Loader2, Music2 } from "lucide-react"


const SectionGridSkeleton = () => {
    return (
        <div className="space-y-4 mt-5 px-2">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Music2 className="w-8 h-8 text-emerald-500" />
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-32" />
            </div>
            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
          </div>
            <div className="h-5 bg-zinc-800 rounded animate-pulse w-40" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-5 ">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-zinc-800/50 rounded-lg p-3 hover:ring-4 hover:ring-emerald-500 transition-all duration-300 w-full cursor-grab">
                        <div className="w-full aspect-square bg-zinc-800 rounded animate-pulse mb-2" />
                        <div className="space-y-1.5">
                            <div className="h-3.5 bg-zinc-800 rounded animate-pulse w-3/4" />
                            <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2 opacity-70" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SectionGridSkeleton