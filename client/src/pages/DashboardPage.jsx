import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/apiclient';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetchCategories(user.id)
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard-page">
      <h2 className="page-title">Dashboard</h2>
      <p className="page-subtitle">Select a category to view its items.</p>

      <div className="dashboard-grid">
        {categories.map((category) => (
          <div key={category.id}>
            <Link
              key={category.id}
              to={`/items?category_id=${category.id}`}
              className="dashboard-tile"
            >
              <span className="dashboard-tile-name">{category.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
