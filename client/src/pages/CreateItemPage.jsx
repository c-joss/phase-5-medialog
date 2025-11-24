import React, { useState } from 'react';

function CreateItemPage() {
  const [form, setForm] = useState({
    title: '',
    image_url: '',
    category_id: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitting form:', form);
  }

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
          Category ID{' '}
          <input name="category_id" value={form.category_id} onChange={handleChange} required />
        </label>

        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}

export default CreateItemPage;
