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

  const heading = categoryId ? `Your Items (Category ${categoryId})` : 'Your Items';

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>{heading}</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`/items/${item.id}`}>{item.title}</Link>{' '}
              <span>(category {item.category_id})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemsPage;
