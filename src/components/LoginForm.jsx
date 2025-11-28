import React from 'react';
import Icon from './Icon';

const LoginForm = ({ handleSignInAnonymously, handleSignInWithGoogle }) => (
    <div className="ml-4 text-center p-6 space-y-4 ">
        <h2 className="text-2xl font-bold text-gray-700">Sign In to Continue</h2>
        <p className="text-gray-500">Access your personalized fertilizer recommendations.</p>
        
        <button
            onClick={handleSignInAnonymously}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-150 transform hover:scale-[1.02]"
        >
            <Icon name="user" className="w-6 h-6 mr-2" />
            Start as Guest (Anonymous Login)
        </button>
        <button
            onClick={handleSignInWithGoogle}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
        >
            <span className="w-6 h-6 mr-2 text-lg">🔵</span>
            Sign in with Google
        </button>
        <p className="text-xs text-gray-400 pt-2">
            This prototype uses Anonymous Login or Google sign in for demonstration purposes.
        </p>
    </div>
);

export default LoginForm;