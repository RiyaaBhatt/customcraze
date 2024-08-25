import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css'; // Optional: Add any additional styling for the layout

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
    </div>
  );
};

export default AdminLayout;
