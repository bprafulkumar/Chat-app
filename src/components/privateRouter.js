import React from "react";
import { Navigate } from "react-router"
import Home from "../pages/Home";
import { useProfile } from "../Context/Profile.context";
import { Container, Loader } from "rsuite";

const PrivateRoute = ({children, ...routerProps}) => {
    
    const {profile,isLoading} = useProfile();

    if(isLoading && !profile){
        return <Container>
            <Loader center vertical size="md" content="Loading" speed="slow" />
        </Container>
    }
    if(!profile && isLoading){
        return <Navigate to="/signin"/>
    }
    return(
       <Home/>
    )
} 

export default PrivateRoute