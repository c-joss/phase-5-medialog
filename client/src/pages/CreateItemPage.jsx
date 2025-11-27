import React, { useEffect, useState } from 'react';
import { createItem, fetchCategories } from '../api/apiclient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CreateItemPage() {
  const [form, setForm] = useState({
    title: '',
    image_url: '',
    category_id: '',
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('You must be logged in to create an item.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: form.title,
        image_url: form.image_url || null,
        category_id: Number(form.category_id),
        user_id: user.id,
      };

      const newItem = await createItem(payload);
      navigate(`/items/${newItem.id}`);
    } catch (err) {
      setError(err.message || 'Something went wrong while creating the item.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadCategories() {
      if (!user) return;

      try {
        const data = await fetchCategories(user.id);
        setCategories(data);
      } catch (err) {
        setError(err.message || 'Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    }

    loadCategories();
  }, [user]);

  return (
    <div className="form-page">
      <div className="form-card">
        <h2 className="page-title">Add New Item</h2>
        <p className="page-subtitle">Create a new entry in your collection.</p>

        <form onSubmit={handleSubmit} className="stacked-form">
          <label className="stacked-field">
            <span className="stacked-label">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="stacked-input"
              required
            />
          </label>

          <label className="stacked-field">
            <span className="stacked-label">Image URL</span>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="stacked-input"
              placeholder="Optional"
            />
          </label>

          <label className="stacked-field">
            <span className="stacked-label">Category</span>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="stacked-select"
              required
            >
              <option value="">
                {categoriesLoading ? 'Loading categories...' : 'Select a category'}
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="form-footer">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating...' : 'Create Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItemPage;
