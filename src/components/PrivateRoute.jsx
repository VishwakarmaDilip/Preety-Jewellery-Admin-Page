// components/PrivateRoute.jsx
import React from "react";
import {useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
  const token = useSelector((state) => state.owner.isLoggedIn)
  const loading = useSelector((state) => state.owner.loading)

  if (loading) return <div>Loading...</div>;
  return token ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;
