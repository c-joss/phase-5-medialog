import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItem } from '../api/apiclient';

function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItem(id)
      .then(setItem)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!item) {
    return <p>Loading item...</p>;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p>
        <strong>Category ID:</strong> {item.category_id}
      </p>
      <p>
        <strong>User ID:</strong> {item.user_id}
      </p>

      {item.image_url && (
        <p>
          <img src={item.image_url} alt={item.title} style={{ maxWidth: '300px' }} />
        </p>
      )}
    </div>
  );
}

export default ItemDetailPage;
