import React, { useState } from 'react';

function ExportPage() {
  const [message, setMessage] = useState('');

  async function handleExport() {
    setMessage('Export to Excel placeholder.');
  }
  return (
    <div className="settings-subpage export-page">
      <h2>Export Collections to Excel</h2>
      <button type="button" onClick={handleExport}>
        Export Collections
      </button>

      {message && <p className="info-message">{message}</p>}
    </div>
  );
}

export default ExportPage;
