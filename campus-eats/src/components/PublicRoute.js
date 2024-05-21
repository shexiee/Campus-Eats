import React from "react";
// import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginSignUp from "./LoginSignUp";
import Home from "./Home";

const PrivateRoute = ({Component}) => {
    const {currentUser} = useAuth();
    // const navigate = useNavigate();

    return currentUser ? <Home /> : <Component/>
}

export default PrivateRoute;