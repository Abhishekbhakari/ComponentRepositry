import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      const res = await axios.get(`/api/components/search?q=${query}`);
      setComponents(res.data);
    };

    fetchComponents();
  }, [query]);

  const onChange = (e) => setQuery(e.target.value);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for components..."
        value={query}
        onChange={onChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <ul>
        {components.map((component) => (
          <li key={component._id}>
            <Link to={`/component/${component._id}`} className="text-blue-500">
              {component.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
