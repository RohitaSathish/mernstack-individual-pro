import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.email.trim() === "admin@pharmacy.com" && loginData.password.trim() === "admin") {
      login({ email: loginData.email, role: 'admin' });
      navigate("/admin");
    } else {
      login({ email: loginData.email, role: 'user' });
      navigate("/medicines");
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

          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#1FA89A', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1em', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s', marginBottom: '1em' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1a9184'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1FA89A'}>
            Login
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
