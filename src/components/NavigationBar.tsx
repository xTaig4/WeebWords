import React from "react";
import { Link } from "react-router-dom"; // Optional if you are using React Router for navigation
import "./NavigationBar.css"; // Import the CSS file for styling

const NavigationBar: React.FC = () => {
    return (
        <div className="navigation-bar">
            <div className="navigation-logo">
                <h1>Weeb Words</h1>
            </div>
            <div className="navigation-links">
                {/* Replace Link with <a> if you're not using React Router */}
                <Link to="/">Home</Link>
                <Link to="/submit">Submit</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/about">About</Link>
            </div>
        </div>
    );
};

export default NavigationBar;

