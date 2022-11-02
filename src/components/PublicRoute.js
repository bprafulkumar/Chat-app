import React from "react";
import { Navigate,Route } from "react-router"
import { useProfile } from "../Context/Profile.context";
import Home from "../pages/Home";
import { Container, Loader } from "rsuite";



const PublicRouter = ({children, ...routerProps}) => {

  const {profile,isLoading} = useProfile();

  if(isLoading && !profile){
      return <Container>
          <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
  }

    if(profile && !isLoading){
        return <Navigate to="/"/>
    }
    return(
  <Home/>
    )
} 

export default PublicRouter