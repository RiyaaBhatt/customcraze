// src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload.error || 'Login failed',
      };
    
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
