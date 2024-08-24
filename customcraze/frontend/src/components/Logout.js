import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { logout } from '../redux/actions/authActions'; // Ensure path is correct

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
