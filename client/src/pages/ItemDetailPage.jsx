import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchItem,
  fetchTags,
  fetchCreators,
  updateItemTags,
  updateItemCreators,
  deleteItem,
} from '../api/apiclient';

function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  const [allTags, setAllTags] = useState([]);
  const [allCreators, setAllCreators] = useState([]);

  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [selectedCreatorIds, setSelectedCreatorIds] = useState([]);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchItem(id)
      .then(setItem)
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    async function loadMeta() {
      try {
        const [tags, creators] = await Promise.all([fetchTags(), fetchCreators()]);
        setAllTags(tags);
        setAllCreators(creators);
      } catch (err) {
        console.error(err);
      }
    }

    loadMeta();
  }, []);

  useEffect(() => {
    if (!item) return;

    if (allTags.length > 0) {
      const tagIds = allTags
        .filter((t) => item.tags && item.tags.includes(t.name))
        .map((t) => t.id);
      setSelectedTagIds(tagIds);
    }

    if (allCreators.length > 0) {
      const creatorIds = allCreators
        .filter((c) => item.creators && item.creators.includes(c.name))
        .map((c) => c.id);
      setSelectedCreatorIds(creatorIds);
    }
  }, [item, allTags, allCreators]);

  function toggleTag(id) {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id],
    );
  }

  function toggleCreator(id) {
    setSelectedCreatorIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id],
    );
  }

  async function handleSaveAssociations(e) {
    e.preventDefault();
    if (!item) return;

    setSaving(true);
    setError(null);
    setSaveMessage('');

    try {
      let updatedItem = await updateItemTags(item.id, selectedTagIds);
      updatedItem = await updateItemCreators(item.id, selectedCreatorIds);

      setItem(updatedItem);

      setSaveMessage('Tags and creators updated.');
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update tags / creators.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!item) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteItem(item.id);
      window.alert('Item deleted successfully.');
      navigate('/items');
    } catch (err) {
      window.alert(err.message || 'Failed to delete item.');
    }
  }

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
            <span className="item-detail-value">
              {item.category_name || item.category?.name || '—'}
            </span>
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

          <div className="item-detail-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setEditing((prev) => !prev);
                setSaveMessage('');
              }}
            >
              {editing ? 'Cancel' : 'Edit tags & creators'}
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{ marginLeft: '10px' }}
              onClick={handleDelete}
            >
              Delete Item
            </button>
          </div>

          {editing && (
            <form
              onSubmit={handleSaveAssociations}
              style={{ marginTop: '12px', fontSize: '0.9rem' }}
            >
              <div style={{ marginBottom: '12px' }}>
                <strong>Tags</strong>
                <div>
                  {allTags.length === 0 && (
                    <p style={{ margin: '4px 0' }}>No tags available yet.</p>
                  )}
                  {allTags.map((tag) => (
                    <label key={tag.id} style={{ display: 'block' }}>
                      <input
                        type="checkbox"
                        checked={selectedTagIds.includes(tag.id)}
                        onChange={() => toggleTag(tag.id)}
                      />{' '}
                      {tag.name}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <strong>Creators</strong>
                <div>
                  {allCreators.length === 0 && (
                    <p style={{ margin: '4px 0' }}>No creators available yet.</p>
                  )}
                  {allCreators.map((creator) => (
                    <label key={creator.id} style={{ display: 'block' }}>
                      <input
                        type="checkbox"
                        checked={selectedCreatorIds.includes(creator.id)}
                        onChange={() => toggleCreator(creator.id)}
                      />{' '}
                      {creator.name}
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="error-text">{error}</p>}
              {saveMessage && !error && (
                <p style={{ margin: '4px 0', color: '#333' }}>{saveMessage}</p>
              )}

              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
