import React from 'react';
import NavBar from '../components/NavBar';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <NavBar />
      <main>{children}</main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} MediaLog</p>
      </footer>
    </div>
  );
}

export default Layout;
