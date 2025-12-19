import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        login(data.user);
        
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/medicines');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)', padding: '2em' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', padding: '3em', maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2em' }}>
          <h2 style={{ color: '#333', fontSize: '2em', marginBottom: '0.5em' }}>Welcome Back</h2>
          <p style={{ color: '#666', fontSize: '0.95em' }}>Login to your HealCare Plus account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5em' }}>
            <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#2BBBAD'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '1em' }}>
            <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#2BBBAD'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '1.5em' }}>
            <Link to="/forgot-password" style={{ color: '#2BBBAD', textDecoration: 'none', fontSize: '0.9em', fontWeight: '500' }}>Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', backgroundColor: loading ? '#ccc' : '#1FA89A', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1em', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginBottom: '1em' }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1a9184')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#1FA89A')}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div style={{ textAlign: 'center', padding: '1em 0', borderTop: '1px solid #e0e0e0' }}>
            <p style={{ color: '#666', fontSize: '0.95em', marginBottom: '0.5em' }}>Don't have an account? <Link to="/register" style={{ color: '#2BBBAD', textDecoration: 'none', fontWeight: '600' }}>Register here</Link></p>
            <Link to="/" style={{ color: '#999', fontSize: '0.9em', textDecoration: 'none', display: 'inline-block' }}>← Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
