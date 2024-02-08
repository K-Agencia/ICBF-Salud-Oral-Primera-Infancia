import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RouterLinks } from "../constants/RouterLinks";

const ProtectedRoutes = () => {

   if (localStorage.getItem('log') === 'false') {
      return <Navigate to={RouterLinks.Login} />
   } else {
      return  <Outlet />
   }

};

export default ProtectedRoutes;