import React from 'react';
import NavBar from '../pages/NavBar';

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
