// src/components/Signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(username, password,firstname,email));
      Navigate("/dashboard")
      // Redirect or update UI on success if needed
    } catch (error) {
      // Set error state or handle it
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
<input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}"/>
<label>
        Name:
        <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
  
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Signup</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
