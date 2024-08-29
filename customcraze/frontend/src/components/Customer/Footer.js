import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>About Us</h2>
                    <p>CustomCraze is your go-to platform for AI-powered product customization.</p>
                </div>
                <div className="footer-section">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#terms">Terms of Service</a></li>
                        <li><a href="#refunds">Refund Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2>Contact Us</h2>
                    <p>Email: support@customcraze.com</p>
                    <p>Phone: +123-456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 CustomCraze. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
