import { useContext } from "react"
import { userContext } from "../userContext/userContext"
import { Navigate, Outlet } from "react-router-dom"

function PublicRoutes(){
    const {state} = useContext(userContext)
    
    if(state.isUserLogin === true) {
        return <Navigate to = '/' />
    }

    return <Outlet/>
}

export default PublicRoutes