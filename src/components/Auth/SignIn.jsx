import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  // --- Existing Logic & Hooks (Unchanged) ---
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  // ------------------------------------------

  // --- Replicated Modern Inline Styling ---

  const styles = {
    // Page Layout (Replicated from SignUp)

    // Card Style (Replicated from SignUp)
    card: {
      width: '100%',
      maxWidth: '420px',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', // Soft, modern shadow
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    // Header (Replicated from SignUp)
    header: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center',
    },
    // Error Alert (Replicated from SignUp)
    errorAlert: {
      color: '#d9534f', // Soft red
      backgroundColor: '#fbeaea',
      padding: '10px',
      borderRadius: '6px',
      marginBottom: '15px',
      borderLeft: '4px solid #d9534f',
      fontWeight: '500',
    },
    // Form Group (Replicated from SignUp)
    formGroup: {
      marginBottom: '18px',
    },
    // Label (Replicated from SignUp)
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#555',
      fontSize: '14px',
    },
    // Input (Replicated from SignUp)
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #e0e0e0', // Light border
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
    },
    // Button (Replicated from SignUp - Primary Blue)
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff', // Primary blue (Modern)
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.2s, opacity 0.2s',
      // Simulate hover and disabled states with opacity
      ':hover': loading ? {} : { backgroundColor: '#0056b3' },
      opacity: loading ? 0.6 : 1,
    },
    // Footer Link Area (Replicated from SignUp)
    footerText: {
      textAlign: 'center',
      marginTop: '25px',
      color: '#777',
      fontSize: '14px',
    },
    // Link Style (Replicated from SignUp)
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '5px',
      transition: 'color 0.2s',
      ':hover': { color: '#0056b3' }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Welcome Back! 🐾</h2>
        {error && <p style={styles.errorAlert}>{error}</p>}
        <form onSubmit={handleSubmit}>
          
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              ref={emailRef} 
              required 
              placeholder="name@example.com"
              style={styles.input} 
              autoComplete="email"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input 
              type="password" 
              id="password" 
              ref={passwordRef} 
              required 
              placeholder="••••••••"
              style={styles.input} 
              autoComplete="current-password"
            />
          </div>
          
          <button 
            disabled={loading} 
            type="submit" 
            style={styles.button}
          >
            {loading ? 'Signing In...' : 'Sign In Securely'}
          </button>
        </form>
        
        <div style={styles.footerText}>
          Don't have an account? 
          <Link to="/signup" style={styles.link}>Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;