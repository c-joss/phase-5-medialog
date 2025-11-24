import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import ItemsPage from './pages/ItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateItemPage from './pages/CreateItemPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ExportPage from './pages/ExportPage';
import ManageTagsPage from './pages/ManageTagsPage';
import ManageCategoriesPage from './pages/ManageCategoriesPage';
import ManageCreatorsPage from './pages/ManageCreatorsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route path="/items/new" element={<CreateItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/export" element={<ExportPage />} />
          <Route path="/settings/tags" element={<ManageTagsPage />} />
          <Route path="/settings/categories" element={<ManageCategoriesPage />} />
          <Route path="/settings/creators" element={<ManageCreatorsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
