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
    <div className="item-detail-page">
      <h2 className="page-title">{item.title}</h2>
      <div className="item-detail-card">
        <div className="item-detail-image">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} />
          ) : (
            <span className="item-detail-image-placeholder">Image</span>
          )}
        </div>

        <div className="item-detail-info">
          <div className="item-detail-row">
            <span className="item-detail-label">Category:</span>
            <span className="item-detail-value">{item.category_id}</span>
          </div>

          <div className="item-detail-row">
            <span className="item-detail-label">Owner:</span>
            <span className="item-detail-value">User {item.user_id}</span>
          </div>

          <div className="item-detail-row">
            <span className="item-detail-label">Tags:</span>
            <span className="item-detail-value">
              {item.tags && item.tags.length > 0 ? item.tags.join(', ') : '—'}
            </span>
          </div>

          <div className="item-detail-row">
            <span className="item-detail-label">Creators:</span>
            <span className="item-detail-value">
              {item.creators && item.creators.length > 0 ? item.creators.join(', ') : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
