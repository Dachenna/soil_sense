import React from 'react';

import { useAuth } from './Auth/useAuth';
import RecommendationEngine from './components/RecommendationEngine';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Icon from './components/Icon';

export default function App() {
    const { user, loading, error: authError, handleSignInAnonymously, handleSignOut, handleSignInWithGoogle } = useAuth();

    // --- RENDER LOGIC ---

    const content = () => {
        if (loading) {
            return (
                <div className="text-center p-8">
                    <div className="animate-spin inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mb-3"></div>
                    <p className="text-gray-600">Loading application...</p>
                </div>
            );
        }

        if (user) {
            // Logged In: Show the main recommendation app
            return <RecommendationEngine userId={user.uid} handleSignOut={handleSignOut} />;
        } else {
            // Logged Out: Show the login form
            return (
                <>
                    <LoginForm handleSignInAnonymously={handleSignInAnonymously}  handleSignInWithGoogle = {handleSignInWithGoogle}/>
                    {authError && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm flex items-center justify-center">
                            <Icon name="alert-triangle" className="w-4 h-4 mr-1" />
                            <span>{authError}</span>
                        </div>
                    )}
                </>
            );
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-8 flex justify-center items-start bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 shadow-2xl rounded-2xl border border-green-200">
                <Header user={user} />
                {content()}
            </div>
        </div>
    );
}