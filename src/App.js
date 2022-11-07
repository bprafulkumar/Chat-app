import React from "react";
import  "./styles/main.scss";
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home/Home.js";
import Signin from "./pages/sign";
import PrivateRoute from "./components/privateRouter";
import PublicRouter from "./components/PublicRoute";
import { ProfileProvider, } from "./Context/Profile.context";
import 'rsuite/dist/styles/rsuite-default.css';
import Chat from "./pages/Home/Chat";



function App() {
  return (
    <ProfileProvider>
    <Routes>
      <Route path="/signin" element={<Signin/>?<Signin/> : <Home/> }></Route>
      <Route path="/" element= {<PrivateRoute/> ? <PrivateRoute/> : <Home/> }></Route>
      <Route exact path="/chat/:id" element= {<PrivateRoute/> ? <PrivateRoute/> : <Home/> }></Route>
      <Route exact path="/chat/:id" element= {<Chat/> ? <Home/> : <Chat/>}></Route>




      {/* <Route path="/" element= {<Home/>} />
      <Route path="/" element = {<PrivateRoute/>} /> */}
    </Routes>
    </ProfileProvider>
  );
      // <PrivateRoute path="/">
      //   <Home/>
      // </PrivateRoute>
}

export default App;
