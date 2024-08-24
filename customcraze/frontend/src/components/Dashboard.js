import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { error } = useSelector(state => state.auth); // Ensure `error` is defined in the state

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>} {/* Display error if it exists */}
    </div>
  );
};

export default Dashboard;