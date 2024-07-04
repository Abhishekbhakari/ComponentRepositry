// frontend/src/components/Signup.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee' // Default role
  });

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    register(formData, navigate);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <select
          name="role"
          value={role}
          onChange={onChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
