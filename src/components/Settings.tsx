import React, { useState } from "react";
import "./Settings.css";

const Settings: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark" | "pink">("light");
    const [primaryColor, setPrimaryColor] = useState<string>("#ff6f61"); // Default: Soft pink

    const handleThemeChange = (newTheme: "light" | "dark" | "pink") => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const handleColorChange = (color: string) => {
        setPrimaryColor(color);
        document.documentElement.style.setProperty("--primary-color", color);
    };

    return (
        <html className="settings-html">
            <div className="settings-container">
                <h2>Settings</h2>
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
        </html>
    );
};

export default Settings;