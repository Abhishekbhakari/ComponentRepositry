// frontend/src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ adminOnly }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
