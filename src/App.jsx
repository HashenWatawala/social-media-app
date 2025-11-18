import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Feed from './components/Feed';
import PostCreator from './components/PostCreator';
import './App.css';

/**
 * Component to protect routes. Redirects unauthenticated users to the sign-in page.
 */
const PrivateRoute = () => {
  const { user } = useAuth();

  // If user is present, render the child route content (Outlet).
  // Otherwise, navigate (redirect) to the signin page.
  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

/**
 * Main App component with routing.
 */
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={
            <div>
              <PostCreator />
              <Feed />
            </div>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
