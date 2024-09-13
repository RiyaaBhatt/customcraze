import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(credentials.username, credentials.password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if(credentials.username=="admin"){
        navigate("/admindashboard")
      }
      else{navigate('/dashboard');}
       // Redirect to dashboard after successful login
    }
    // Handle errors by showing a message or taking action
    if (error) {
      alert(error.message || "An error occurred");
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button type="submit">Login</button>
      {error && <p>{error.message || 'An error occurred'}</p>}
    </form></>
  );
};

export default Login;