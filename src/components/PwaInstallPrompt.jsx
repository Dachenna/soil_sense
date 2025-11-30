import React from 'react';
import Icon from './Icon';

/**
 * PwaInstallPrompt component displays instructions on how to install the PWA
 * to the home screen on different mobile devices (iOS/Android).
 * It is displayed as a modal over the login form on mobile screen sizes.
 */
const PwaInstallPrompt = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-5 transform transition-all scale-100">
                
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-xl font-bold text-green-700 flex items-center">
                        <Icon name="download" className="w-6 h-6 mr-2" />
                        Install SoilSense App
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-700 transition"
                        aria-label="Close Install Prompt"
                    >
                        <Icon name="x" className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                        For the best experience, install SoilSense directly to your phone's home screen. It will open full-screen like a native app!
                    </p>

                    {/* iOS Instructions */}
                    <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-800 flex items-center mb-2">
                            <Icon name="apple" className="w-5 h-5 mr-2 text-gray-900" />
                            iPhone / iPad Users
                        </h3>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                            <li>Tap the **Share** <Icon name="share" className="w-4 h-4 inline-block text-blue-600" /> button in your browser's bottom toolbar.</li>
                            <li>Scroll down and select **"Add to Home Screen."**</li>
                            <li>Confirm the name and tap **"Add."**</li>
                        </ol>
                    </div>

                    {/* Android Instructions */}
                    <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-800 flex items-center mb-2">
                            <Icon name="android" className="w-5 h-5 mr-2 text-green-600" />
                            Android Users
                        </h3>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                            <li>Tap the **Menu** <Icon name="menu" className="w-4 h-4 inline-block text-gray-600" /> (3 dots) icon in the top right corner.</li>
                            <li>Select **"Install app"** or **"Add to Home Screen."**</li>
                            <li>Confirm the installation.</li>
                        </ol>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150"
                >
                    Continue to Website
                </button>
            </div>
        </div>
    );
};

export default PwaInstallPrompt;