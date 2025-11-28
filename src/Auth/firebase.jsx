// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLo2mJacY0Xo7KjMGwGyQuoH-6WQsp-1w",
  authDomain: "fertilizer-a3d8a.firebaseapp.com",
  projectId: "fertilizer-a3d8a",
  storageBucket: "fertilizer-a3d8a.firebasestorage.app",
  messagingSenderId: "643542636166",
  appId: "1:643542636166:web:436dcc2ed9b30fb2c0e307",
  measurementId: "G-40EN0PS3SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In function
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};

export default {
    app,
    analytics,
    auth,
    signInWithGoogle
};