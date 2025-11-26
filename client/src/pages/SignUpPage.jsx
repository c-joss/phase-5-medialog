import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.join(', ') || 'Sign up failed');
      }

      loginUser(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} required />
        </label>

        <label>
          First name
          <input name="first_name" value={form.first_name} onChange={handleChange} required />
        </label>

        <label>
          Last name
          <input name="last_name" value={form.last_name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">{loading ? 'Creating...' : 'Create Account'}</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignUpPage;
