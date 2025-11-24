import React from 'react';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
  const navigate = useNavigate();

  function goTo(path) {
    navigate(path);
  }

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="settings-panel">
        <button type="button" className="settings-button" onClick={() => goTo('/settings/export')}>
          Export to Excel
        </button>

        <button type="button" className="settings-button" onClick={() => goTo('/settings/tags')}>
          Manage Tags
        </button>

        <button
          type="button"
          className="settings-button"
          onClick={() => goTo('/settings/categories')}
        >
          Manage Categories
        </button>

        <button
          type="button"
          className="settings-button"
          onClick={() => goTo('/settings/creators')}
        >
          Manage Creators
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
