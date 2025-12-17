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
    console.log('Login attempt:', loginData); // Debug log
    // Simple check for admin
    if (loginData.email.trim() === "admin@pharmacy.com" && loginData.password.trim() === "admin") {
      console.log('Admin login successful'); // Debug log
      login({ email: loginData.email, role: 'admin' });
      navigate("/admin");
    } else {
      console.log('User login'); // Debug log
      login({ email: loginData.email, role: 'user' });
      navigate("/medicines");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <Link to="/forgot-password">Forgot Password?</Link>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

