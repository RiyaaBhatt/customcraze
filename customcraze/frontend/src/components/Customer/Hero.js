import React from 'react';
import './Hero.css';  // Import the hero CSS file

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    <strong>  Customize Your Style  </strong>
                </h1>
                <p className="hero-subtitle">AI-powered design for T-shirts, Hoodies, Mugs & More.</p>
                <button className="hero-button">Start Designing Now</button>
            </div>
        </section>
    );
};

export default Hero;
