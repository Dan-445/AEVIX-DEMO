import React from 'react';
import TestConnection from '../components/TestConnection';

const Home = () => {
    return (
        <div>
            <h1>Welcome to AVERIX</h1>
            <div style={{ padding: '20px', color: 'green' }}>
                Frontend is running! (Database not connected)
            </div>
            {/* Rest of your home page content */}
        </div>
    );
};

export default Home; 