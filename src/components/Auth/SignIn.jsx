import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../../styles/SignIn.module.css';;

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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.header}>Welcome Back! 🐾</h2>
        {error && <p className={styles.errorAlert}>{error}</p>}
        <form onSubmit={handleSubmit}>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              ref={emailRef} 
              required 
              placeholder="name@example.com"
              className={styles.input} 
              autoComplete="email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input 
              type="password" 
              id="password" 
              ref={passwordRef} 
              required 
              placeholder="••••••••"
              className={styles.input} 
              autoComplete="current-password"
            />
          </div>
          
          <button 
            disabled={loading} 
            type="submit" 
            className={styles.button}
          >
            {loading ? 'Signing In...' : 'Sign In Securely'}
          </button>
        </form>
        
        <div className={styles.footerText}>
          Don't have an account? 
          <Link 
            to="/signup" 
            className={styles.link}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;