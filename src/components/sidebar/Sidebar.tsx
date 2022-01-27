import { NavLink } from "react-router-dom";
import React from "react";
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/users" className="sidebar-menu-item">
            <span className="sidebar-menu-label">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/map" className="sidebar-menu-item">
            <span className="sidebar-menu-label">Map</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
