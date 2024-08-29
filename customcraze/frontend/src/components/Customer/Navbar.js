import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                CustomCraze
            </div>
            <div className="navbar-links">
                <a href="#categories">Categories</a>
                <a href="#design">Design Studio</a>
                <a href="#cart">Cart</a>
                <a href="#search">Search</a>
                <a href="/login">Logout</a>
                </div>
        </nav>
    );
};

export default Navbar;
