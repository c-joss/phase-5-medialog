import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/apiclient';

function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load categories');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Select a category to view its items.</p>

      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <h3>
              <Link to={`/items?category_id=${category.id}`}>{category.name}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
