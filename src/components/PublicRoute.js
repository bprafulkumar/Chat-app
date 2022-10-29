import React from "react";
import { Link,Route,Routes } from "react-router-dom"

const PublicRouter = ({children, ...routerProps}) => {

    const profile = false;

    if(!profile){
        return <Link to="/home"/>
    }
    return(
    <Routes>
      <Route {...routerProps}>{children}</Route>
    </Routes>
    )
} 

export default PublicRouter