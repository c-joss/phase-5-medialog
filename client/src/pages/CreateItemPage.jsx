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
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message || 'Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <div>
      <h2>Add New Item</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Title <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Image URL <input name="image_url" value={form.image_url} onChange={handleChange} />
        </label>

        <label>
          Category
          <select name="category_id" value={form.category_id} onChange={handleChange} required>
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

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Item'}
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default CreateItemPage;
