import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../api/apiclient';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Your Items</h2>
      {items.length === 0 ? (
        <p>No items yet.</p>
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
