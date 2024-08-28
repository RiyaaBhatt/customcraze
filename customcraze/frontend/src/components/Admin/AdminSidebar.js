import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBox, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import './AdminSidebar.css'; // Ensure this file is in the same directory

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/admindashboard/dashboard" className="nav-link">
              <FaTachometerAlt className="sidebar-icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/users" className="nav-link">
              <FaUsers className="sidebar-icon" /> Users
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/products" className="nav-link">
              <FaBox className="sidebar-icon" /> Products
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/reports" className="nav-link">
              <FaChartBar className="sidebar-icon" /> Templates
            </Link>
          </li>
          <li>
            <Link to="/admindashboard/Orders" className="nav-link">
              <FaChartBar className="sidebar-icon" /> Orders
            </Link>
          </li>
          <li>
            <Link to="/logout" className="nav-link">
              <FaSignOutAlt className="sidebar-icon" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
