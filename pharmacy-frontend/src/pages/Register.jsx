import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { useAuth } from "../AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const { addUser } = useUser();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const result = addUser(formData);
    if (result.success) {
      alert(result.message);
      login({ email: formData.email, name: formData.name, role: 'user' });
      navigate("/medicines");
    } else {
      alert(result.message);
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

          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#1FA89A', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1em', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s', marginBottom: '1em' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1a9184'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1FA89A'}>
            Create Account
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
