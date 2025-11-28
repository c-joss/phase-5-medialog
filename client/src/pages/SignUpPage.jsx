import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signup } from '../api/apiclient';

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
      const user = await signup(form);

      loginUser(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h2 className="page-title">Sign Up</h2>
        <p className="page-subtitle">Create a new MediaLog account.</p>
        <form onSubmit={handleSubmit} className="stacked-form">
          <label className="stacked-field">
            <span className="stacked-label">Username</span>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="stacked-input"
              required
            />
          </label>

          <label className="stacked-field">
            <span className="stacked-label">First name</span>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="stacked-input"
              required
            />
          </label>

          <label className="stacked-field">
            <span className="stacked-label">Last name</span>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="stacked-input"
              required
            />
          </label>

          <label className="stacked-field">
            <span className="stacked-label">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="stacked-input"
              required
            />
          </label>

          <label className="stacked-field">
            <span className="stacked-label">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="stacked-input"
              required
            />
          </label>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-footer">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
