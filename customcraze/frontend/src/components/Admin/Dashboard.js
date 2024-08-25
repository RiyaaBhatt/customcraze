import React from 'react';
import './Dashboard.css'; // Custom CSS for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Overview</h1>
      </header>
      <section className="cards-container">
        <div className="card">
          <h3>Total Users</h3>
          <p>150</p>
        </div>
        <div className="card">
          <h3>Total Products</h3>
          <p>320</p>
        </div>
        <div className="card">
          <h3>Sales Today</h3>
          <p>$1,230</p>
        </div>
        <div className="card">
          <h3>Orders Pending</h3>
          <p>45</p>
        </div>
        <div className="card">
          <h3>New Reviews</h3>
          <p>12</p>
        </div>
        
      </section>
    </div>
  );
};

export default Dashboard;
