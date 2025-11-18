// Firebase Web SDK v9 (Modular) configuration
// This file reads configuration from environment variables (e.g., REACT_APP_FIREBASE_API_KEY)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, serverTimestamp } from "firebase/database";

// 1. Your web app's Firebase configuration
// IMPORTANT: Replace the placeholder values with actual environment variables
const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.REACT_APP_FIREBASE_DATABASE_URL, // Required for Realtime Database
    projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.REACT_APP_FIREBASE_APP_ID
};

// 2. Initialize Firebase
// The core Firebase App instance
const app = initializeApp(firebaseConfig);

// 3. Initialize services
// Export the initialized services so they can be imported and used anywhere in the app
export const auth = getAuth(app);
export const db = getDatabase(app);

// 4. Helper function for Realtime Database Server Timestamp
// Realtime Database uses a separate `serverTimestamp` function compared to Firestore.
// We export it as `serverTs` for convenience.
export const serverTs = serverTimestamp;

// Optional: Export the app instance if needed for other services later (e.g., storage)
export default app;