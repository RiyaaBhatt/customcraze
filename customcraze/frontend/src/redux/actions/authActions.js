// src/redux/actions/authActions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGOUT } from './types';

// Set up the base URL for API requests
const API_BASE_URL = 'http://localhost:8000/api'; // Update with your Django backend URL
// src/redux/actions/authActions.js


export const login = (username, password) => async dispatch => {
  try {
    const response = await axios.post('/api/token/', { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data : { message: 'Login failed' }
    });
  }
};

// Signup action
export const signup = (username, password) => async (dispatch) => {
  try {
    // Get CSRF token from the HTML
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Make a POST request to the signup endpoint
    await axios.post(`${API_BASE_URL}/signup/`, 
      { username, password },
      {
        headers: {
          'X-CSRFToken': csrfToken // Include CSRF token in the request headers
        }
      }
    );

    // Dispatch success action if request is successful
    dispatch({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {
    // Dispatch failure action if request fails
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response ? error.response.data : 'An error occurred',
    });
  }
};