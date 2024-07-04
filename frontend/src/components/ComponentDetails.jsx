import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ComponentDetails = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const fetchComponent = async () => {
      const res = await axios.get(`/api/components/${id}`);
      setComponent(res.data);
    };

    fetchComponent();
  }, [id]);

  if (!component) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{component.name}</h1>
      <p><strong>Use:</strong> {component.use}</p>
      <p><strong>Technologies:</strong> {component.technologies}</p>
      <p><strong>Tags:</strong> {component.tags.join(', ')}</p>
      <p><strong>Status:</strong> {component.isDisabled ? 'Disabled' : 'Active'}</p>
    </div>
  );
};

export default ComponentDetails;
