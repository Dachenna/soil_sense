import React, { useState, useEffect } from 'react';

import { useAuth } from './Auth/useAuth';
import RecommendationEngine from './components/RecommendationEngine';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Icon from './components/Icon';
import PwaInstallPrompt from './components/PwaInstallPrompt'; // <-- New Import

export default function App() {
    const { user, loading, error: authError, handleSignInAnonymously, handleSignOut, handleSignInWithGoogle } = useAuth();
    
    // State to control the visibility of the PWA install prompt
    const [showPwaPrompt, setShowPwaPrompt] = useState(true); 

    // Effect to check screen size and determine if the prompt should be shown.
    // We only want to show the PWA prompt on small screens (mobile).
    useEffect(() => {
        // Only show if the user hasn't logged in yet AND it's a small screen
        const checkScreenSize = () => {
            // Using a basic check: if the screen width is less than Tailwind's 'sm' breakpoint (640px)
            if (window.innerWidth < 640 && !user) {
                setShowPwaPrompt(true);
            } else {
                setShowPwaPrompt(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [user]); // Re-run when user state changes

    // Function to close the prompt
    const handleClosePwaPrompt = () => {
        setShowPwaPrompt(false);
    };

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
                    {/* Show PWA Prompt Modal ONLY on small screens if not logged in */}
                    {showPwaPrompt && <PwaInstallPrompt onClose={handleClosePwaPrompt} />}
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