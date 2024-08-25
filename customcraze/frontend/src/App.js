// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute"; // Your custom PrivateRoute component
import Signup from "./components/Signup";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminDash from "./components/Admin/AdminSidebar";
import User from "./components/Admin/User";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminLayout from "./components/Admin/AdminLayout";
import Products from './components/admin/Products'
import Reports from './components/admin/Reports'
const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admindashboard"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminSidebar />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<User/>} />
            <Route path="products" element={<Products />} />
            <Route path="reports" element={<Reports />} />
            {/* <Route path="logout" element={<Logout/>}/> */}
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
