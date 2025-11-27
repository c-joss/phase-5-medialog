import React, { useEffect, useState } from 'react';
import { fetchTags, createTag } from '../api/apiclient';

function ManageTagsPage() {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTags()
      .then((data) => {
        setTags(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load tags');
        setLoading(false);
      });
  }, []);

  async function handleAddTag(e) {
    e.preventDefault();
    if (!newTagName.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const created = await createTag(newTagName.trim());
      setTags((prev) => [...prev, created]);
      setNewTagName('');
    } catch (err) {
      setError(err.message || 'Failed to create tag');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading tags...</p>;
  }

  return (
    <div className="settings-subpage manage-tags-page">
      <h2 className="page-title">Manage Tags</h2>
      <p className="page-subtitle">Create and view tags used to describe your items.</p>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleAddTag} className="simple-form">
        <label>
          New tag name
          <input type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Add Tag'}
        </button>
      </form>

      <ul className="simple-list">
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageTagsPage;
