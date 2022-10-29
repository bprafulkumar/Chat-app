import React from "react";
import  "./styles/main.scss";
import {Route,Routes} from "react-router-dom"
// import Home from "./pages/Home";
import Signin from "./pages/sign";
// import Home from "./pages/Home";
import PrivateRoute from "./components/privateRouter";
// import PublicRouter from "./components/PublicRoute";


function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/" element= {<PrivateRoute/>}></Route>
    </Routes>
  );
      // <PrivateRoute path="/">
      //   <Home/>
      // </PrivateRoute>
}

export default App;
