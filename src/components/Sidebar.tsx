import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import settings from '../icons/settings.svg';
import menu from '../icons/menu.svg';

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="collapse-button" onClick={toggleSidebar}>
                <img className='collapse-image' src={menu} alt="Collapse" />
                {isCollapsed ? 'Expand' : 'Collapse'}
            </button>
            <h2>Navigation</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/submit">Submit Quote</Link></li>
                <li className='li-settings'>
                    <img className='settings-image' src={settings}/>
                    <Link to="/settings">Settings</Link>
                </li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;