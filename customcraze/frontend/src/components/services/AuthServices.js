// src/services/AuthService.js
import { store } from '../../redux/store'; // Import the Redux store
import { logout as logoutAction } from '../../redux/actions/authActions'; // Import the logout action

const AuthService = {
  

  logout: () => {
    // Dispatch the logout action to clear the Redux state
    store.dispatch(logoutUser());

    // Remove token from local storage
    localStorage.removeItem('token');

    // Redirect to login page
    window.location.href = '/login';
  },

 
};

export default AuthService;
