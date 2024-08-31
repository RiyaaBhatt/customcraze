import React from 'react';
import Carousel from './Carousel';
import Hero from './Hero';
import Navbar from './Navbar';  // Importing Navbar component
import Footer from './Footer';  // Importing Footer component
import './Customer.css';
import ProductCard from './ProductCard';


const Dashboard = () => {
    return (
        <div className='app1' >
            <Navbar />  {/* Adding Navbar at the top */}
            <div className="app-body">
                <div className="carousel-container">
                    <Carousel />
                </div>
                <div className="hero-container">
                    <Hero />
                </div>
            </div>
            <div class="background-abstract">
                <div class="sleek-gradient-layer"></div>
                <div class="content-container">
                    <h1>What do you want to create?</h1>
                    <p>Bring your ideas to life with customizable designs and easy tools.</p>
                </div>
            </div>
<ProductCard/>
            <Footer />  {/* Adding Footer at the bottom */}
        </div>
    );
};

export default Dashboard;
