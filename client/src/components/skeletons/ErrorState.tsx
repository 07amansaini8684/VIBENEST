import { Music2 } from "lucide-react"


export const ErrorState = () => {
  return (
    <div className="relative space-y-6 p-8 bg-zinc-900 rounded-lg shadow-2xl mt-5 border-4 border-dashed border-red-500 overflow-hidden">
          {/* Header with Glitch Effect */}
          <div className="flex items-center space-x-2 text-red-500">
            <Music2 className="w-8 h-8 text-emerald-500 animate-glitch pulse-hover" />
            <div className="h-6 bg-zinc-800 rounded animate-pulse w-32" />
          </div>
      
          {/* Broken Error Message */}
          <div className="text-center text-white text-lg font-bold space-y-4">
            <div className="font-extrabold text-3xl text-red-400 mb-2 animate-glitch glitch-pulse">
              Something's Broken! 🚨
            </div>
            <div className="relative inline-block bg-red-600/50 p-6 rounded-lg border border-red-600 transform transition-all duration-300 hover:scale-105 hover:rotate-2 cursor-pointer glitch-hover">
              {/* Broken effect around the box */}
              <div className="absolute top-0 left-0 right-0 bottom-0 border-2 border-dashed border-red-600 opacity-50 animate-glitch z-10"></div>
              <div className="relative z-20">
                <div className="flex items-center justify-center space-x-2 animate-glitch">
                  <Music2 className="w-6 h-6 text-red-500 animate-spin pulse-hover" />
                </div>
              </div>
            </div>
          </div>
      
          {/* Glitchy Background with Shattered Fragments */}
          <div className="absolute inset-0 -z-10 animate-glitch fragment-hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="absolute top-0 left-0 w-40 h-40 text-red-600 opacity-30 animate-ping fragment-spin"
            >
              <circle cx="50" cy="50" r="40" fill="currentColor" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="absolute bottom-0 right-0 w-48 h-48 text-emerald-500 opacity-20 animate-ping delay-1000 fragment-spin-delay"
            >
              <circle cx="50" cy="50" r="40" fill="currentColor" />
            </svg>
          </div>
        </div>
  )
}

