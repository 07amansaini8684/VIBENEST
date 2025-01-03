import {SignedOut, UserButton } from "@clerk/clerk-react"
// import { SignedIn, SignOutButton } from "@clerk/clerk-react"/
import { LayoutDashboard } from "lucide-react"
import { Link } from "react-router-dom"
import SignInOAuthButtons from "./SignInOAuthButtons"
import { useAuthStore } from "@/stores/useAuthStore"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

const Topbar = () => {
    const {isAdmin} = useAuthStore();
    // console.log(isAdmin)
    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-950/75 rounded-sm backdrop-blur-md z-10">
            <div className="flex gap-2 items-center">
                <img src="/spotify.png" className="h-8 w-8" />
                Spotify
            </div>
            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link className={cn(
                        buttonVariants({ variant: "ghost", size: "sm", className: "w-full justify-start text-white hover:bg-zinc-800/75 " })
                    )} to={"/admin"}>
                        <LayoutDashboard className="size-4 mr-2" />
                        Admin Dashboard
                    </Link>
                )}
                {/* <SignedIn>
                    <SignOutButton />
                </SignedIn> */}
                <SignedOut >
                    <SignInOAuthButtons/>
                </SignedOut>
                <UserButton/>
            </div>
        </div>
    )
}

export default Topbar