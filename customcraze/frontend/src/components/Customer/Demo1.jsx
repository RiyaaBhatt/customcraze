import React from 'react';
import './style.css'; // Ensure this path is correct

const ImageCarousel = () => {
    return (
        <div className="container">
            <input type="radio" name="slider" id="item-1" defaultChecked />
            <input type="radio" name="slider" id="item-2" />
            <input type="radio" name="slider" id="item-3" />
            <div className="cards">
                <label htmlFor="item-1" className="card" id="img-1">
                    <img 
                        src="https://images.unsplash.com/photo-1558517286-6b7b81953cb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                        alt="Template 1"
                        style={{ width: '100%', height: '100%' }}
                    />
                </label>
                <label htmlFor="item-2" className="card" id="img-2">
                    <img 
                        src="https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                        alt="Template 2"
                        style={{ width: '100%', height: '100%' }}
                    />
                </label>
                <label htmlFor="item-3" className="card" id="img-3">
                    <img 
                        src="https://images.unsplash.com/photo-1583041745879-1d9e0b06a088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60" 
                        alt="Template 3"
                        style={{ width: '100%', height: '100%' }}
                    />
                </label>
            </div>
        </div>
    );
}

export default ImageCarousel;
