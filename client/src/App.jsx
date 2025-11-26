import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/:id"
            element={
              <ProtectedRoute>
                <ItemDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/new"
            element={
              <ProtectedRoute>
                <CreateItemPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/export"
            element={
              <ProtectedRoute>
                <ExportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/tags"
            element={
              <ProtectedRoute>
                <ManageTagsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/categories"
            element={
              <ProtectedRoute>
                <ManageCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/creators"
            element={
              <ProtectedRoute>
                <ManageCreatorsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
