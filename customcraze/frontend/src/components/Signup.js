import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(username, password,email));
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
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
    
      <label>
        email:
        <input type="Email" value={email} onChange={(e) => setemail(e.target.value)} />
      </label>
      <button type="submit">Signup</button>
      {error && <p>{error}</p>}
      ALready have account?
      <Link to="/login">Login</Link>
    </form>

  );
};

export default Signup;