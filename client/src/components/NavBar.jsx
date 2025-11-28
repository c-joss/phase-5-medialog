import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="nav-wrapper">
      <nav>
        <div>
          <Link to="/">MediaLog</Link>
        </div>
        <div>
          {user && <Link to="/items">Items</Link>}

          {user && <Link to="/items/new">Add Item</Link>}

          {user && <Link to="/settings">Settings</Link>}

          {user ? (
            <>
              <span className="nav-divider">|</span>
              <span>{user.first_name || user.username}</span>
              <button type="button" onClick={logoutUser}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
