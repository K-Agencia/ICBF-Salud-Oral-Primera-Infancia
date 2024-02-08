import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouterLinks } from '../constants/RouterLinks';
import { useAuthContext } from '../context/authContext';

const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={RouterLinks.Home} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoute;