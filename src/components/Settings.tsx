import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark" | "pink">(
        localStorage.getItem("theme") as "light" | "dark" | "pink" || "light"
    );
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const handleThemeChange = (newTheme: "light" | "dark" | "pink") => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const [primaryColor, setPrimaryColor] = useState<string>("#ff6f61"); // Default: Soft pink
    const handleColorChange = (color: string) => {
        setPrimaryColor(color);
        document.documentElement.style.setProperty("--primary-color", color);
    };

    return (
        <div className="settings-container">
            <h2><img src="Settings.svg"/>Settings</h2>
            <div className="setting-option">
                <label>Theme:</label>
                <select
                    value={theme}
                    onChange={(e) => handleThemeChange(e.target.value as "light" | "dark" | "pink")}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="pink">Pink</option>
                </select>
            </div>
            <div className="setting-option">
                <label>Primary Color:</label>
                <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Settings;