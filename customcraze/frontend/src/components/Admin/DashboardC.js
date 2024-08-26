import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Custom CSS for styling

const DashboardC = () => {
  const [totalUsers, setTotalUsers] = useState(0); // State to store the total number of users
  const [error, setError] = useState(null); // State to store any error message
  const [totalProduct,setTotalProduct]=useState(0)
  useEffect(() => {
    // Function to fetch the total number of users
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/'); // Use the full URL if needed
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setTotalUsers(data.length); // Assuming the API returns an array of users
        } else {
          throw new Error('Received non-JSON response');
        }
      } catch (error) {
        console.error('Error fetching total users:', error);
        setError(error.message);
      }
    };

    fetchTotalUsers(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs once after the initial render

  
  useEffect(() => {
    // Function to fetch the total number of users
    const fetchTotalProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/productapi/'); // Use the full URL if needed
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setTotalProduct(data.length); // Assuming the API returns an array of users
        } else {
          throw new Error('Received non-JSON response');
        }
      } catch (error) {
        console.error('Error fetching total users:', error);
        setError(error.message);
      }
    };

    fetchTotalProducts(); // Call the function to fetch data
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
          {error ? <p>Error: {error}</p> : <p>{totalProduct}</p>}
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

export default DashboardC;
