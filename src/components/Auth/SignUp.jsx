import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../../styles/SignUp.module.css';
// Sign up
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.header}>Join PetShare 🐾</h2>
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
              placeholder="6+ characters"
              className={styles.input} 
              autoComplete="new-password"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password-confirm" className={styles.label}>Confirm Password</label>
            <input 
              type="password" 
              id="password-confirm" 
              ref={passwordConfirmRef} 
              required 
              placeholder="Re-enter password"
              className={styles.input} 
              autoComplete="new-password"
            />
          </div>
          <button 
            disabled={loading} 
            type="submit" 
            className={styles.button}
          >
            {loading ? 'Signing Up...' : 'Create Account'}
          </button>
        </form>
        <div className={styles.footerText}>
          Already have an account? 
          <Link to="/signin" className={styles.link}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;