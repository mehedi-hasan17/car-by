import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";
import { AuthContext } from "./AuthContext";

export const PriviteRouts = ({ children }) => {
  const location = useLocation();
  // console.log(location);

  const {user, loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>

  }
  if (user) {
    return children;
  } 
  else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PriviteRouts;