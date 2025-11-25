import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api/apiclient';

function ManageCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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

  async function handleAddCategory(e) {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:5000/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.join(', ') || 'Failed to create category');
      }

      setCategories((prev) => [...prev, data]);
      setNewCategoryName('');
    } catch (err) {
      setError(err.message || 'Failed to create category');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="settings-subpage manage-categories-page">
      <h2>Manage Categories</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleAddCategory} className="simple-form">
        <label>
          New category name
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Add Category'}
        </button>
      </form>

      <ul className="simple-list">
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCategoriesPage;
