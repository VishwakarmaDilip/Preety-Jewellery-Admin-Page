// components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const token = Cookies.get("refreshToken") || Cookies.get("accessToken");
  
  return token ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;
