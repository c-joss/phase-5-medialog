import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiclient';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
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
      const data = await login(form.email, form.password);
      loginUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-title-block">
        <h1 className="app-title">MediaLog</h1>
        <p className="app-subtitle">your personal library</p>
      </div>
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button type="button" onClick={() => navigate('/signup')} className="btn-secondary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
