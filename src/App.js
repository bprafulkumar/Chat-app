import React from "react";
import  "./styles/main.scss";
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import Signin from "./pages/sign";
import PrivateRoute from "./components/privateRouter";
import PublicRouter from "./components/PublicRoute";
import { ProfileProvider } from "./Context/Profile.context";
import 'rsuite/dist/styles/rsuite-default.css';



function App() {
  return (
    <ProfileProvider>
    <Routes>
      <Route path="/signin" element={<Signin/>?<Signin/> : <Home/> }></Route>
      <Route path="/" element= {<PrivateRoute/> ? <PrivateRoute/> : <Home/> }></Route>
    </Routes>
    </ProfileProvider>
  );
      // <PrivateRoute path="/">
      //   <Home/>
      // </PrivateRoute>
}

export default App;
