import React, { useEffect } from "react";
import { Navigate } from "react-router"
import Home from "../pages/Home/Home.js";
import { useProfile } from "../Context/Profile.context";
import { Container, Loader } from "rsuite";
import Signin from "../pages/sign";

const PrivateRoute = ({children, ...routerProps}) => {
    
    const {profile,isLoading} = useProfile();
    

    if(isLoading && !profile){
        return <Container>
            <Loader center vertical size="md" content="Loading" speed="slow" />
        </Container>
    }
    if(!profile && !isLoading){
        return <Navigate to="/signin"/> ? <Navigate to="/signin"/> : <Navigate to="/"/>
    }
    return(
       <Home/>
    )
} 

export default PrivateRoute