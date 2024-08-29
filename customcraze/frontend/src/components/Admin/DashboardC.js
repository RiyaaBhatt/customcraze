import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Custom CSS for styling

const DashboardC = () => {
  const [totalUsers, setTotalUsers] = useState(0); // State to store the total number of users
  const [totalProducts, setTotalProducts] = useState(0); // State to store the total number of products
  const [pendingOrders, setPendingOrders] = useState(0); // State to store the number of pending orders
  const [totalSales, setTotalSales] = useState(0); // State to store the total sales from completed orders
  const [error, setError] = useState(null); // State to store any error message

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalUsers(data.length);
      } catch (error) {
        console.error('Error fetching total users:', error);
        setError(error.message);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/productapi/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalProducts(data.length);
      } catch (error) {
        console.error('Error fetching total products:', error);
        setError(error.message);
      }
    };

    fetchTotalProducts();
  }, []);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        
        // Count pending orders
        const pendingOrdersCount = data.filter(order => order.status === 'pending').length;
        setPendingOrders(pendingOrdersCount);
  
        // Calculate total sales from completed orders
        const totalSalesAmount = data
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + parseFloat(order.price) || 0, 0);
        setTotalSales(totalSalesAmount);
        
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      }
    };
  
    fetchPendingOrders();
  }, []);
  

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Overview</h1>
      </header>
      <section className="cards-container">
        <div className="card">
          <h3>Total Users</h3>
          {error ? <p>Error: {error}</p> : <p>{totalUsers}</p>}
        </div>
        <div className="card">
          <h3>Total Products</h3>
          {error ? <p>Error: {error}</p> : <p>{totalProducts}</p>}
        </div>
        <div className="card">
          <h3>Sales Today</h3>
          {error ? <p>Error: {error}</p> : <p>${totalSales}</p>}
        </div>
        <div className="card">
          <h3>Orders Pending</h3>
          {error ? <p>Error: {error}</p> : <p>{pendingOrders}</p>}
        </div>
        <div className="card">
          <h3>New Reviews</h3>
          <p>12</p> {/* Placeholder for new reviews */}
        </div>
      </section>
    </div>
  );
};

export default DashboardC;
