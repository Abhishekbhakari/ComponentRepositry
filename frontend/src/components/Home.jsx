// frontend/src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Component Repository</h1>
      <p className="text-lg mb-8">Search and manage your components easily.</p>
      <div className="flex space-x-4">
        <Link
          to="/search"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Search Components
        </Link>
        <Link
          to="/admin"
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        >
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
