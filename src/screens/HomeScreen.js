import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="home">
            <h1>Welcome to opti-lift</h1>
            <Link to="/client" className="home__button">Client Screen</Link>
            <Link to="/add_client" className="home__button">Add Client Screen</Link>
        </div>
    );
};

export default HomeScreen;