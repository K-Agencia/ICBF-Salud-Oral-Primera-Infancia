import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { RouterLinks } from '../constants/RouterLinks';
import { useAuthContext } from '../context/authContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={RouterLinks.Login} />;
  }

  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default PrivateRoute;