import {Navigate, Outlet} from "react-router-dom";
import useTokenStore from "@/store.ts";

export default function AuthLayout() {

const token = useTokenStore(state => state.token)

if(token) {
    return <Navigate to={'/dashboard/home'} replace />
}


    return (
        <>
            <Outlet />
        </>
    )
}
