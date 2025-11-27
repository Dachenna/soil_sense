import React, { useState, useEffect, useCallback } from 'react';

// Firebase Imports (using standard Canvas environment setup)
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    onAuthStateChanged, 
    signOut 
} from 'firebase/auth';
// Firestore imports are also included as the next logical step will involve data
import { getFirestore } from 'firebase/firestore';

// --- CONFIGURATION AND DATA ---

// Mandatory global variables check
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Static data structure defining optimal pH ranges and base fertilizer needs
const CROP_DATA = {
    "Corn": { name: "Corn / Maize", minPh: 6.0, maxPh: 7.5, baseFertilizer: "NPK 15-5-10 (High Nitrogen)", notes: "Corn requires significant Nitrogen (N) for rapid growth." },
    "Potatoes": { name: "Potatoes", minPh: 4.8, maxPh: 6.5, baseFertilizer: "NPK 8-10-15 (High Potassium)", notes: "Potatoes prefer slightly acidic soil and need high Potassium (K)." },
    "Blueberries": { name: "Blueberries", minPh: 4.0, maxPh: 5.5, baseFertilizer: "Acidic Fertilizer (e.g., Ammonium Sulfate)", notes: "Blueberries are highly acid-loving. Do not apply lime." },
    "Alfalfa": { name: "Alfalfa", minPh: 6.5, maxPh: 7.5, baseFertilizer: "NPK 0-20-20 (High Phosphorus & Potassium)", notes: "As a legume, it fixes its own Nitrogen (N)." },
    "Cabbage": { name: "Cabbage / Broccoli", minPh: 6.0, maxPh: 7.5, baseFertilizer: "NPK 10-5-10 (Balanced/High Nitrogen)", notes: "Leafy greens prefer neutral soil." },
    "Tomatoes": { name: "Tomatoes", minPh: 5.5, maxPh: 7.5, baseFertilizer: "NPK 5-10-10 (High Phosphorus & Potassium)", notes: "Tomatoes need P and K for flowering and fruiting." },
    "General": { name: "General Vegetables", minPh: 6.0, maxPh: 7.0, baseFertilizer: "Balanced NPK 10-10-10", notes: "Most common vegetables do well in a neutral range." }
};

// --- UTILITY COMPONENTS ---

/**
 * Renders an icon using inline SVG (standard practice in React projects without a dedicated icon library)
 * @param {string} name - The name of the icon (e.g., 'sprout', 'leaf')
 * @param {string} className - Tailwind CSS classes for styling
 */
const Icon = ({ name, className = "w-5 h-5" }) => {
    // A simplified placeholder for Lucide icons using SVGs or Emojis
    const icons = {
        sprout: <span role="img" aria-label="sprout">🌱</span>,
        leaf: <span role="img" aria-label="leaf">🌿</span>,
        droplet: <span role="img" aria-label="droplet">💧</span>,
        'clipboard-list': <span role="img" aria-label="list">📋</span>,
        'check-circle': <span role="img" aria-label="check">✅</span>,
        'alert-triangle': <span role="img" aria-label="warning">⚠️</span>,
        user: <span role="img" aria-label="user">👤</span>,
        'log-out': <span role="img" aria-label="logout">🚪</span>,
    };
    
    const IconContent = icons[name] || <span>?</span>;

    return <span className={`inline-block align-middle ${className}`}>{IconContent}</span>;
};

// --- CORE APPLICATION LOGIC (The Recommendation Engine) ---

const RecommendationEngine = ({ userId, handleSignOut }) => {
    const [ph, setPh] = useState(6.5);
    const [cropKey, setCropKey] = useState('Corn');
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState(null);

    const calculateRecommendation = useCallback(() => {
        setError(null);
        const cropData = CROP_DATA[cropKey];

        if (!cropData) {
            setError("Please select a valid crop.");
            return;
        }

        const { name, minPh, maxPh, baseFertilizer, notes } = cropData;
        const optimalRange = `${minPh} - ${maxPh}`;

        let phStatus = '';
        let amendmentSuggestion = '';
        let statusColor = 'text-green-700';

        // 1. Determine pH Status and Amendment
        if (ph < minPh) {
            phStatus = 'Too Acidic';
            statusColor = 'text-red-600';
            if (name === "Blueberries") {
                amendmentSuggestion = (
                    <p className="mt-2 p-2 bg-yellow-100 rounded-lg text-sm">
                        <Icon name="alert-triangle" className="w-4 h-4 inline mr-1 text-yellow-600" />
                        <strong>No action needed:</strong> {name} thrive in very acidic soil.
                    </p>
                );
            } else {
                amendmentSuggestion = (
                    <p className="mt-2 p-2 bg-red-100 rounded-lg text-sm">
                        <Icon name="droplet" className="w-4 h-4 inline mr-1 text-red-600" />
                        <strong>Soil Amendment Recommended (To raise pH):</strong> Apply Agricultural Lime (Calcium Carbonate).
                    </p>
                );
            }
        } else if (ph > maxPh) {
            phStatus = 'Too Alkaline';
            statusColor = 'text-red-600';
            amendmentSuggestion = (
                <p className="mt-2 p-2 bg-red-100 rounded-lg text-sm">
                    <Icon name="droplet" className="w-4 h-4 inline mr-1 text-red-600" />
                    <strong>Soil Amendment Recommended (To lower pH):</strong> Apply Elemental Sulfur or use Ammonium Sulfate as a Nitrogen source.
                </p>
            );
        } else {
            phStatus = 'Optimal Range';
            statusColor = 'text-green-700';
            amendmentSuggestion = (
                <p className="mt-2 p-2 bg-green-100 rounded-lg text-sm">
                    <Icon name="check-circle" className="w-4 h-4 inline mr-1 text-green-600" />
                    <strong>No pH amendment needed:</strong> Your soil pH is currently optimal for {name}.
                </p>
            );
        }

        // 2. Set the recommendation object
        setRecommendation({
            name, optimalRange, phStatus, statusColor, baseFertilizer, notes, amendmentSuggestion
        });
    }, [ph, cropKey]);

    // Recalculate whenever pH or crop selection changes
    useEffect(() => {
        calculateRecommendation();
    }, [ph, cropKey, calculateRecommendation]);

    // Recommendation Output Display Component
    const OutputDisplay = () => {
        if (!recommendation) return null;

        return (
            <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200 shadow-inner">
                <h2 className="text-xl font-bold mb-3 text-green-800 flex items-center">
                    <Icon name="clipboard-list" className="w-5 h-5 mr-2" />
                    Summary for {recommendation.name}
                </h2>

                <div className="space-y-3">
                    <p className="text-sm">
                        <span className="font-medium text-gray-700">Optimal pH Range:</span> {recommendation.optimalRange}
                    </p>
                    <p className="text-sm">
                        <span className="font-medium text-gray-700">Current Soil pH Status:</span>
                        <span className={`font-bold ${recommendation.statusColor}`}>{ph} ({recommendation.phStatus})</span>
                    </p>
                </div>

                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-md">
                    <h3 className="font-bold text-lg text-green-700 flex items-center mb-2">
                        <Icon name="leaf" className="w-4 h-4 mr-2" />
                        Primary Fertilizer
                    </h3>
                    <p className="text-gray-800 font-semibold">{recommendation.baseFertilizer}</p>
                    <p className="text-xs text-gray-500 mt-1">{recommendation.notes}</p>
                </div>

                <div className="mt-4">
                    <h3 className="font-bold text-lg text-green-700 flex items-center mb-1">
                        <Icon name="droplet" className="w-4 h-4 mr-2" />
                        Soil pH Amendment
                    </h3>
                    {recommendation.amendmentSuggestion}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-green-200">
                <p className="text-sm text-gray-500 flex items-center">
                    <Icon name="user" className="w-4 h-4 mr-1" />
                    User ID: <span className="font-mono text-xs ml-1 text-green-600 break-all">{userId}</span>
                </p>
                <button
                    onClick={handleSignOut}
                    className="flex items-center text-sm font-semibold text-red-600 hover:text-red-800 p-2 rounded-lg transition duration-150"
                >
                    <Icon name="log-out" className="w-4 h-4 mr-1" />
                    Sign Out
                </button>
            </div>
            
            {/* Input Section */}
            <div>
                <label htmlFor="phInput" className="block text-sm font-medium text-gray-700 flex justify-between">
                    Soil pH: <span id="phValue" className="font-semibold text-lg text-green-700">{ph}</span>
                </label>
                <input 
                    type="range" id="phInput" min="4.0" max="9.0" step="0.1" value={ph}
                    onChange={(e) => setPh(parseFloat(e.target.value))}
                    className="mt-2 w-full appearance-none bg-gray-200 rounded-lg h-2 cursor-pointer transition-shadow"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4.0 (Acidic)</span>
                    <span>9.0 (Alkaline)</span>
                </div>
            </div>

            {/* Crop Type Dropdown */}
            <div>
                <label htmlFor="cropSelect" className="block text-sm font-medium text-gray-700">
                    Select Crop Type
                </label>
                <select id="cropSelect" value={cropKey} onChange={(e) => setCropKey(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm bg-white border">
                    {Object.keys(CROP_DATA).map(key => (
                        <option key={key} value={key}>{CROP_DATA[key].name}</option>
                    ))}
                </select>
            </div>

            {/* Error Box */}
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm flex items-center">
                    <Icon name="alert-triangle" className="w-4 h-4 mr-1" />
                    <span>{error}</span>
                </div>
            )}
            
            {/* Recommendation Output */}
            <OutputDisplay />
        </div>
    );
};

// --- AUTHENTICATION AND MAIN APP WRAPPER ---

const LoginForm = ({ handleSignInAnonymously }) => (
    <div className="text-center p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-700">Sign In to Continue</h2>
        <p className="text-gray-500">Access your personalized fertilizer recommendations.</p>
        
        <button
            onClick={handleSignInAnonymously}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-150 transform hover:scale-[1.02]"
        >
            <Icon name="user" className="w-6 h-6 mr-2" />
            Start as Guest (Anonymous Login)
        </button>
        <p className="text-xs text-gray-400 pt-2">
            This prototype uses Anonymous Login for demonstration purposes.
        </p>
    </div>
);


export default function App() {
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // 1. Firebase Initialization and Initial Auth
    useEffect(() => {
        try {
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const firebaseAuth = getAuth(app);
            
            setDb(firestoreDb);
            setAuth(firebaseAuth);

            // 2. Set up Auth State Listener
            const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    setUser(null);
                }
                setLoading(false);
            });

            // 3. Initial Sign-in Attempt
            const initialSignIn = async () => {
                try {
                    // Sign in using the provided token from the environment
                    if (initialAuthToken) {
                        await signInWithCustomToken(firebaseAuth, initialAuthToken);
                        console.log("Signed in with custom token.");
                    } else {
                        // If no custom token, attempt anonymous sign-in as a clean starting point
                        await signInAnonymously(firebaseAuth);
                        console.log("Signed in anonymously as no custom token was available.");
                    }
                } catch (e) {
                    setAuthError("Failed initial sign-in. Please use the manual login button.");
                    console.error("Initial sign-in error:", e);
                    setLoading(false); 
                }
            };
            
            initialSignIn();

            return () => unsubscribe();
        } catch (e) {
            setAuthError("Firebase initialization failed. Check your config.");
            setLoading(false);
            console.error("Firebase Init Error:", e);
        }
    }, []);

    // Function to handle Anonymous Sign-In (for the button)
    const handleSignInAnonymously = async () => {
        if (!auth) return;
        setAuthError(null);
        setLoading(true);
        try {
            await signInAnonymously(auth);
            // onAuthStateChanged listener handles setting 'user' state
        } catch (error) {
            setAuthError("Login failed. Check console for details.");
            console.error("Anonymous Sign In Error:", error);
            setLoading(false);
        }
    };

    // Function to handle Sign Out
    const handleSignOut = async () => {
        if (!auth) return;
        setAuthError(null);
        try {
            await signOut(auth);
            // onAuthStateChanged listener handles setting 'user' state to null
        } catch (error) {
            setAuthError("Logout failed. Check console for details.");
            console.error("Sign Out Error:", error);
        }
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
                    <LoginForm handleSignInAnonymously={handleSignInAnonymously} />
                    {authError && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm flex items-center">
                            <Icon name="alert-triangle" className="w-4 h-4 mr-1" />
                            <span>{authError}</span>
                        </div>
                    )}
                </>
            );
        }
    };

    return (
        <div className="min-h-screen p-4 flex justify-center items-start bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 shadow-2xl rounded-xl border border-green-200">
                {/* Header */}
                <header className="text-center mb-6">
                    <div className="flex justify-center items-center text-green-700 mb-2">
                        <Icon name="sprout" className="w-8 h-8 mr-2" />
                        <h1 className="text-3xl font-extrabold text-green-800">SoilSense</h1>
                    </div>
                    <p className="text-sm text-gray-500">
                        {user ? "Fertilizer and pH Advisor" : "Secure Access"}
                    </p>
                </header>

                {content()}
            </div>
        </div>
    );
}