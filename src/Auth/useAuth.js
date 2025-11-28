import { useState, useEffect } from 'react';
import firebaseInit from './firebase';
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    onAuthStateChanged,
    signOut 
} from 'firebase/auth';

// Mandatory global variables check
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

export const useAuth = () => {
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const app = firebaseInit && firebaseInit.app ? firebaseInit.app : null;
            if (!app) throw new Error('Firebase app not initialized. Check src/firebase.jsx');
            
            const firebaseAuth = getAuth(app);
            setAuth(firebaseAuth);

            const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            });

            const initialSignIn = async () => {
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(firebaseAuth, initialAuthToken);
                        console.log("Signed in with custom token.");
                    }
                } catch (e) {
                    setError("Failed initial sign-in. Please use the manual login button.");
                    console.error("Initial sign-in error:", e);
                    setLoading(false); 
                }
            };
            
            initialSignIn();

            return () => unsubscribe();
        } catch (e) {
            setError("Firebase initialization failed. Check your config.");
            setLoading(false);
            console.error("Firebase Init Error:", e);
        }
    }, []);

    const handleSignInAnonymously = async () => {
        if (!auth) return;
        setError(null);
        setLoading(true);
        try {
            await signInAnonymously(auth);
        } catch (err) {
            setError("Login failed. Check console for details.");
            console.error("Anonymous Sign In Error:", err);
            setLoading(false);
        }
    };

    const handleSignInWithGoogle = async () => {
        setError(null);
        setLoading(true);
        try {
            await firebaseInit.signInWithGoogle();
            // onAuthStateChanged listener will handle state update
        } catch (err) {
            setError("Google Sign-In failed. Check console for details.");
            console.error("Google Sign In Error:", err);
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (err) {
            setError("Logout failed. Check console for details.");
            console.error("Sign Out Error:", err);
        }
    };

    return { user, loading, error, handleSignInAnonymously, handleSignInWithGoogle, handleSignOut };
};