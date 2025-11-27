import React, { useState } from 'react';
import { downloadItemsExport, emailItemsExport } from '../api/apiclient';
import { useAuth } from '../context/AuthContext';

function ExportPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleExport() {
    if (!user) {
      setError('Please log in again to export your collection.');
      return;
    }

    setError(null);
    setMessage('');
    setBusy(true);

    try {
      const blob = await downloadItemsExport(user.id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'medialog-export.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setMessage('Export downloaded.');

      const wantsEmail = window.confirm(
        `Export downloaded. Do you also want a copy emailed to ${user.email}?`,
      );

      if (wantsEmail) {
        const res = await emailItemsExport(user.id);
        setMessage(res.message || `Export downloaded and email requested for ${user.email}.`);
      }
    } catch (err) {
      setError(err.message || 'Failed to export items.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="settings-subpage export-page">
      <h2>Export Collections to Excel</h2>

      <button type="button" onClick={handleExport} disabled={busy}>
        {busy ? 'Exporting…' : 'Export Collections'}
      </button>

      {error && <p className="error-message">{error}</p>}
      {message && !error && <p className="info-message">{message}</p>}
    </div>
  );
}

export default ExportPage;
