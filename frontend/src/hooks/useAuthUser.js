import {authUser} from "../lib/api.js"
import { useQuery } from "@tanstack/react-query";


const useAuthUser = () => {

    const yourAuthUser= useQuery({
        queryKey: ["authUser"],
        queryFn: authUser,
        retry: false
    })


    return { isLoading : yourAuthUser.isLoading, authUser : yourAuthUser.data?.user};
}

export default useAuthUser

