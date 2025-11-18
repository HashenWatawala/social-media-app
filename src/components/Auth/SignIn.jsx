import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
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
      // Redirect to the feed on successful sign in
      navigate('/');
    } catch (err) {
      // Common errors: 'auth/user-not-found', 'auth/wrong-password'
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Sign In to PetShare</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </div>
        <button disabled={loading} type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
          Sign In
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;