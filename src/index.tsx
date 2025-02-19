import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NavigationBar from "./components/NavigationBar"
import QuoteDisplay from './components/QuoteDisplay';
import SubmitQuote from './components/SubmitQuote';
import Settings from './components/Settings';
import './index.css';

const root = ReactDom.createRoot(document.getElementById("root")!);

root.render(
    <div>
        <React.StrictMode>
            <title>The Honered One</title>
            <Router>   
                <NavigationBar />
                <div>
                    <Routes>
                        <Route path="/" element={<QuoteDisplay />} />
                        <Route path="/submit" element={<SubmitQuote/>} />
                        <Route path="/settings" element={<Settings/>} />
                        <Route path="/contact" element={<div>Contact Page</div>} />
                    </Routes>
                </div>
            </Router>
        </React.StrictMode>
    </div>
);

