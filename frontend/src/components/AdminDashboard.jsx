import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import

const AdminDashboard = () => {
  const navigate = useNavigate(); // Updated hook
  const [components, setComponents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    use: '',
    technologies: '',
    tags: '',
    isDisabled: false
  });

  const { name, use, technologies, tags, isDisabled } = formData;

  useEffect(() => {
    const fetchComponents = async () => {
      const res = await axios.get('/api/components/search');
      setComponents(res.data);
    };

    fetchComponents();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/components', formData);
    navigate(0); // Reload the page
  };

  const onDisableToggle = async (id) => {
    const component = components.find((comp) => comp._id === id);
    await axios.put(`/api/components/${id}`, { ...component, isDisabled: !component.isDisabled });
    navigate(0); // Reload the page
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <form onSubmit={onSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Component Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="use">
            Use
          </label>
          <input
            type="text"
            name="use"
            value={use}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technologies">
            Technologies
          </label>
          <input
            type="text"
            name="technologies"
            value={technologies}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isDisabled">
            Disabled
          </label>
          <input
            type="checkbox"
            name="isDisabled"
            checked={isDisabled}
            onChange={(e) => setFormData({ ...formData, isDisabled: e.target.checked })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Component
        </button>
      </form>
      <ul>
        {components.map((component) => (
          <li key={component._id}>
            <div className="flex items-center justify-between">
              <span>{component.name}</span>
              <button
                onClick={() => onDisableToggle(component._id)}
                className={`ml-4 px-4 py-2 text-white ${component.isDisabled ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {component.isDisabled ? 'Enable' : 'Disable'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
