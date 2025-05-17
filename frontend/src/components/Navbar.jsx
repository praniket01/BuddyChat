import { useLocation, Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser"
import useLogout from "../hooks/useLogout";
import { BellIcon, LogOutIcon, BookOpenCheckIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {

    const { authUser } = useAuthUser();
    const isChatPage = useLocation().pathname?.startsWith("/chat");

    const { logoutMutation } = useLogout();

    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end w-full">

                    {isChatPage && (
                        <div className="pl-5">
                            <Link to="/" className="flex items-center gap-2.5">
                                <BookOpenCheckIcon className="size-9 text-primary" />
                                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                                    Chat Buddy
                                </span>
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4 ml-auto mr-2">
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle">
                                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                            </button>
                        </Link>
                    </div>
                    <div className="mr-5"> 

                    <ThemeSelector />
                    </div>
                    <div className="avatar">
                        <div className="w-9 rounded-full">
                            <img src={authUser?.profilepic} alt="User Avatar" rel="noreferrer" />
                        </div>
                    </div>

                    <button className="btn btn-ghost btn-circle ml-4" onClick={logoutMutation}>
                        <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar