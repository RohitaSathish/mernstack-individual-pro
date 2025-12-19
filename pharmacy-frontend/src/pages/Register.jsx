import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        login(data.user);
        alert('Registration successful!');
        navigate('/medicines');
      } else {
        alert(data.message || 'Registration failed');
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
          <h2 style={{ color: '#333', fontSize: '2em', marginBottom: '0.5em' }}>Create Account</h2>
          <p style={{ color: '#666', fontSize: '0.95em' }}>Join HealCare Plus today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5em' }}>
            <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#2BBBAD'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '1.5em' }}>
            <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#2BBBAD'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '1.5em' }}>
            <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#2BBBAD'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '1.5em' }}>
            <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#2BBBAD'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', backgroundColor: loading ? '#ccc' : '#1FA89A', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1em', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginBottom: '1em' }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1a9184')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#1FA89A')}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: '0.95em' }}>Already have an account? <Link to="/login" style={{ color: '#2BBBAD', textDecoration: 'none', fontWeight: '600' }}>Login here</Link></p>
            <Link to="/" style={{ color: '#999', fontSize: '0.9em', textDecoration: 'none', marginTop: '0.5em', display: 'inline-block' }}>← Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
