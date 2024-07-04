import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthState from './context/AuthState.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthState>
      <Router>
        <App />
      </Router>
    </AuthState>
  </React.StrictMode>
);

