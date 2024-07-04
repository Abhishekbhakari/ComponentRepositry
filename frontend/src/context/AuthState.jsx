// frontend/src/context/AuthState.jsx
import React, { useReducer } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../utils/setAuthToken';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const decoded = jwt_decode(localStorage.token);
      dispatch({ type: 'USER_LOADED', payload: decoded });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const register = async (formData, navigate) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      localStorage.setItem('token', res.data.token);
      loadUser();
      navigate('/');
    } catch (err) {
      dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.msg });
    }
  };

  const login = async (formData, navigate) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      localStorage.setItem('token', res.data.token);
      loadUser();
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
