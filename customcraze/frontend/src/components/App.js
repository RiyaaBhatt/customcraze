import React from 'react'
import ReactDOM from 'react-dom/client';
import Login from '../screens/Login';
export default function App() {
  return (
    <div>
    <Login/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
