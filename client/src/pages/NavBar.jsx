import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">Medialog</Link>
      </div>
      <div>
        <Link to="/items">Items</Link>
        {user ? (
          <>
            <span>{user.first_name || user.username}</span>
            <button onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
