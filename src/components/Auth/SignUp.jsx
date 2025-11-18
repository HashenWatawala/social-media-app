import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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

  // --- Updated Modern Front-End Only Styling for Mobile Responsiveness ---
  // Adjusted for mobile-first: smaller paddings, font sizes, and widths using relative units where possible.
  // Card uses 90% width for mobile, centering with flexbox. Paddings and fonts scaled down.

  const styles = {
    // Page Layout (Mobile-Responsive Container)
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '10px', // Reduced for mobile // Light gray background
      boxSizing: 'border-box',
    },
    // Card Style (Mobile-Responsive: 90% width, smaller padding)
    card: {
      width: '90%', // 90% for mobile responsiveness
      maxWidth: '420px',
      padding: '20px', // Reduced from 30px for mobile
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', // Soft, modern shadow
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      boxSizing: 'border-box',
    },
    // Header (Mobile-Responsive: Smaller font)
    header: {
      fontSize: '24px', // Reduced from 28px for mobile
      fontWeight: '700',
      color: '#333',
      marginBottom: '15px', // Slightly reduced
      textAlign: 'center',
    },
    // Error Alert (Mobile-Responsive: Smaller padding)
    errorAlert: {
      color: '#d9534f', // Soft red
      backgroundColor: '#fbeaea',
      padding: '8px', // Reduced from 10px
      borderRadius: '6px',
      marginBottom: '12px', // Slightly reduced
      borderLeft: '4px solid #d9534f',
      fontWeight: '500',
      fontSize: '14px',
    },
    // Form Group (Mobile-Responsive: Smaller margin)
    formGroup: {
      marginBottom: '15px', // Reduced from 18px
    },
    // Label (Mobile-Responsive: Smaller font)
    label: {
      display: 'block',
      marginBottom: '6px', // Reduced from 8px
      fontWeight: '600',
      color: '#555',
      fontSize: '13px', // Reduced from 14px
    },
    // Input (Mobile-Responsive: Smaller padding, font)
    input: {
      width: '100%',
      padding: '10px 12px', // Reduced from 12px 15px
      border: '1px solid #e0e0e0', // Light border
      borderRadius: '8px',
      fontSize: '14px', // Reduced from 16px for mobile
      transition: 'border-color 0.2s',
      boxSizing: 'border-box', // Crucial for responsive padding/width
    },
    // Button (Mobile-Responsive: Smaller padding, font)
    button: {
      width: '100%',
      padding: '10px', // Reduced from 12px
      backgroundColor: '#007bff', // Primary blue (Modern)
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px', // Reduced from 16px
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '15px', // Reduced from 20px
      transition: 'background-color 0.2s, opacity 0.2s',
      // Simulate hover and disabled states with opacity
      ':hover': loading ? {} : { backgroundColor: '#0056b3' },
      opacity: loading ? 0.6 : 1,
    },
    // Footer Link Area (Mobile-Responsive: Smaller margin, font)
    footerText: {
      textAlign: 'center',
      marginTop: '20px', // Reduced from 25px
      color: '#777',
      fontSize: '13px', // Reduced from 14px
    },
    // Link Style (Mobile-Responsive: Smaller font)
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '600',
      marginLeft: '5px',
      transition: 'color 0.2s',
      fontSize: '13px', // Reduced from 14px
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
