import React, { useEffect, useState } from 'react';
import { fetchCreators, createCreator } from '../api/apiclient';

function ManageCreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [newCreatorName, setNewCreatorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCreators()
      .then((data) => {
        setCreators(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load creators');
        setLoading(false);
      });
  }, []);

  async function handleAddCreator(e) {
    e.preventDefault();
    if (!newCreatorName.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const created = await createCreator(newCreatorName.trim());
      setCreators((prev) => [...prev, created]);
      setNewCreatorName('');
    } catch (err) {
      setError(err.message || 'Failed to create creator');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading creators...</p>;
  }

  return (
    <div className="settings-subpage manage-creators-page">
      <h2 className="page-title">Manage Creators</h2>
      <p className="page-subtitle">Maintain the list of authors, directors, artists and more.</p>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleAddCreator} className="simple-form">
        <label>
          New creator name
          <input
            type="text"
            value={newCreatorName}
            onChange={(e) => setNewCreatorName(e.target.value)}
          />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Add Creator'}
        </button>
      </form>

      <ul className="simple-list">
        {creators.map((creator) => (
          <li key={creator.id}>{creator.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCreatorsPage;
