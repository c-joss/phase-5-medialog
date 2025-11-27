import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchItems } from '../api/apiclient';
import { useAuth } from '../context/AuthContext';

function ItemsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const categoryId = params.get('category_id');

  useEffect(() => {
    if (!user) return;

    fetchItems(user.id, categoryId)
      .then(setItems)
      .catch((err) => setError(err.message));
  }, [user, categoryId]);

  const heading = categoryId ? 'Your Items' : 'Your Items';

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="items-page">
      <h2 className="page-title">{heading}</h2>
      {items.length === 0 ? (
        <p className="empty-state">No items found.</p>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <Link key={item.id} to={`/items/${item.id}`} className="item-card">
              <div className="item-card-image">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} />
                ) : (
                  <span className="item-card-image-placeholder">Image</span>
                )}
              </div>

              <div className="item-card-body">
                <h3 className="item-card-title">{item.title}</h3>
                <p className="item-card-meta">Category ID: {item.category_id}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemsPage;
