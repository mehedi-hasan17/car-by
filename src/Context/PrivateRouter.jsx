import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "./Loading";

const PriviteRouts = ({ children }) => {
  const location = useLocation();
  console.log(location);

  const { user, loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user.email) {
    return children;
  } 
  else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PriviteRouts;