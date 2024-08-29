import React from 'react';
import './style.css';  // Import the carousel CSS file
import bag from './bag.jpg';
import cap from './cap.jpeg';
import bottle from './bottle.jpg';
import mug from './mug.jpg';
import template2 from './template2.jpeg';

const Carousel = () => {
    return (
        <div className="gallery-container">
            <div className="gallery">
                <img src={bag} alt="Bag" />
                <img src={cap} alt="Cap" />
                <img src={bottle} alt="Bottle" />
                <img src={mug} alt="Mug" />
                <img src={template2} alt="Template 1" />
                <img src={template2} alt="Template 2" />
            </div>
        </div>
    );
};

export default Carousel;
