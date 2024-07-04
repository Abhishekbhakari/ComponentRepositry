// frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout(navigate);
  };

  const authLinks = (
    <>
      {user && user.role === 'admin' && (
        <Link to="/admin" className="mr-4">Admin Dashboard</Link>
      )}
      <a onClick={onLogout} href="#!" className="mr-4">Logout</a>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/login" className="mr-4">Login</Link>
      <Link to="/signup" className="mr-4">Sign Up</Link>
    </>
  );

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-2xl">Component Repository</h1>
      <div>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;
