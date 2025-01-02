import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore"
import { useUser } from "@clerk/clerk-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";


const FriendsActivity = () => {
    const { users, fetchUsers, isLoading } = useChatStore();
    const { user } = useUser();

    useEffect(() => {
        if (user) fetchUsers();
    }, [fetchUsers, user])

    // console.log(users)
    const isPlaying = true;

    if (isLoading) {
        return (
          <div className="h-screen w-full flex flex-col items-center justify-center text-3xl text-zinc-500 bg-zinc-900/70">
            <Music className="animate-spin mb-4 text-zinc-400" size={48} />
            <p>Loading...</p>
          </div>
        );
      }
    
    return (
        <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
            <div className="p-4 flex justify-between items-center broder-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Users className="size-5 shrink-0" />
                    <h2 className="text-lg font-semibold text-white">What they're playing</h2>
                </div>
            </div>
            {!user && <LoginPrompt />}

            <ScrollArea className="flex-1 p-4 overflow-hidden">
                <div className="p-4 space-y-4 ">
                    {users.map((user) => (
                        <div key={user._id} className="cursor-pointer hover:bg-zinc-800/50 p-4 rounded-md transition-colors group">
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <Avatar className="w-10 h-10 border-zinc-800">
                                        <AvatarImage src={user?.imageUrl || "https://i.pinimg.com/236x/b4/73/af/b473af6236a70bdd809b8e80afc19f0c.jpg"} alt={user.fullName} />
                                        <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-zinc-400 bg-zinc-800 rounded-full" aria-hidden="true" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-white truncate">{user.fullName}</span>
                                        {isPlaying && (
                                            <Music className=" size-4 text-emerald-400 shrink-0" />
                                        )}
                                    </div>
                                    {isPlaying ? (
                                        <div className="flex items-center gap-2">
                                            <div className=" text-sm text-white font-medium truncate">Enemy</div>
                                            <div className="text-xs text-zinc-400 font-semibold truncate">• eminem</div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="mt-1 text-sm text-zinc-400 font-medium truncate">dattebayo</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default FriendsActivity

const LoginPrompt = () => (
    <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
        <div className='relative'>
            <div
                className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
                aria-hidden='true'
            />
            <div className='relative bg-zinc-900 rounded-full p-4'>
                <HeadphonesIcon className='size-8 text-emerald-400' />
            </div>
        </div>

        <div className='space-y-2 max-w-[250px]'>
            <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
            <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
        </div>
    </div>
);