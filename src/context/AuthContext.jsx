import React, { useContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
// FIX: Changed import path to resolve the 'firebaseConfig' module error.
import { auth } from '../firebaseConfig'; // Import initialized auth service

// Create the context
const AuthContext = React.createContext();

// Custom hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // Firebase Authentication functions
    const signup = (email, password) => {
        setAuthError(null); // Clear previous errors
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signin = (email, password) => {
        setAuthError(null);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setAuthError(null);
        return signOut(auth);
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Authentication state is determined
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    // The value provided to consuming components
    const value = {
        user,
        loading,
        authError,
        setAuthError, // Allows components to manually clear the context error
        signup,
        signin,
        signOut: logOut,
    };

    // Only render children when loading is false
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Ensure you wrap your top-level App component with <AuthProvider> in main.jsx