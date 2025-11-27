import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory } from '../api/apiclient';
import { useAuth } from '../context/AuthContext';

function ManageCategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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

  async function handleAddCategory(e) {
    e.preventDefault();
    if (!user || !newCategoryName.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const created = await createCategory(newCategoryName.trim(), user.id);
      setCategories((prev) => [...prev, created]);
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
      <h2 className="page-title">Manage Categories</h2>
      <p className="page-subtitle">Organise your collection into custom categories.</p>
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
