import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css'

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // Retaining the original hooks and context for functionality
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match.');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      // Redirect to the feed on successful sign up
      navigate('/');
    } catch (err) {
      // Firebase error codes can be handled more specifically here
      setError('Failed to create an account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Modern Front-End Only Styling ---

  const styles = {
    // Page Layout
    // Card Style (Modern box with shadow)
    card: {
      width: '100%',
      maxWidth: '420px',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', // Soft, modern shadow
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    // Header
    header: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center',
    },
    // Error Alert
    errorAlert: {
      color: '#d9534f', // Soft red
      backgroundColor: '#fbeaea',
      padding: '10px',
      borderRadius: '6px',
      marginBottom: '15px',
      borderLeft: '4px solid #d9534f',
      fontWeight: '500',
    },
    // Form Group
    formGroup: {
      marginBottom: '18px',
    },
    // Label
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#555',
      fontSize: '14px',
    },
    // Input
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #e0e0e0', // Light border
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box', // Crucial for responsive padding/width
    },
    // Button
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
    // Footer Link Area
    footerText: {
      textAlign: 'center',
      marginTop: '25px',
      color: '#777',
      fontSize: '14px',
    },
    // Link Style
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
        <h2 style={styles.header}>Join PetShare 🐾</h2>
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
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input 
              type="password" 
              id="password" 
              ref={passwordRef} 
              required 
              placeholder="6+ characters"
              style={styles.input} 
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password-confirm" style={styles.label}>Confirm Password</label>
            <input 
              type="password" 
              id="password-confirm" 
              ref={passwordConfirmRef} 
              required 
              placeholder="Re-enter password"
              style={styles.input} 
            />
          </div>
          <button 
            disabled={loading} 
            type="submit" 
            style={styles.button}
          >
            {loading ? 'Signing Up...' : 'Create Account'}
          </button>
        </form>
        <div style={styles.footerText}>
          Already have an account? 
          <Link to="/signin" style={styles.link}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;