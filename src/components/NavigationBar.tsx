import React from "react";
import { Link } from "react-router-dom"; // Optional if you are using React Router for navigation
import "./MenuBar.css"; // Import the CSS file for styling

const MenuBar: React.FC = () => {
    return (
        <div className="menu-bar">
            <div className="menu-logo">
                <h1>MyApp</h1>
            </div>
            <div className="menu-links">
                {/* Replace Link with <a> if you're not using React Router */}
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </div>
    );
};

export default MenuBar;