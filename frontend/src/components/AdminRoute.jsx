import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Navigate to="/login" />
        ) : user && user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
