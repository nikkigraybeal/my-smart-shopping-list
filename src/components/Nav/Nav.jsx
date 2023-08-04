import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <nav className="link-div">
      <NavLink
        to="/list"
        style={({ isActive }) =>
          isActive ? { color: '#202C39' } : { color: '#A4A9AD' }
        }
      >
        Shopping List
      </NavLink>

      <NavLink
        to="/addItem"
        style={({ isActive }) =>
          isActive ? { color: '#202C39' } : { color: '#A4A9AD' }
        }
      >
        Add Item
      </NavLink>
    </nav>
  );
}
