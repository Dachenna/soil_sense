import React from 'react';
import Icon from './Icon';

const Header = ({ user }) => {
    return (
        <header className="text-center mb-6">
            <div className="flex justify-center items-center text-green-700 mb-2">
                <Icon name="sprout" className="w-8 h-8 mr-2" />
                <h1 className="text-3xl font-extrabold text-green-800">SoilSense</h1>
            </div>
            <p className="text-sm text-gray-500">
                {user ? "Fertilizer and pH Advisor" : "Secure Access"}
            </p>
        </header>
    );
};

export default Header;