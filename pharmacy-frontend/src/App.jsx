import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";
import { MedicineProvider } from "./MedicineContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import CategoryMedicines from "./pages/CategoryMedicines";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";

function ProtectedAdminRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/medicines" replace />;
  }

  return children;
}

function Navigation() {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showNavLinks = isLoggedIn && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <header style={{
      backgroundColor: '#ffffff',
      color: '#2c3e50',
      padding: '1em 2em',
      display: 'flex',
      justifyContent: isLoggedIn ? 'space-between' : 'center',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderBottom: '3px solid #2BBBAD'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#2BBBAD" opacity="0.2"/>
          <path d="M20 8 L20 32 M8 20 L32 20" stroke="#2BBBAD" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="6" fill="#1FA89A"/>
          <path d="M16 20 L19 23 L24 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <h1 style={{ margin: 0, fontSize: '1.8em', color: '#2BBBAD', fontWeight: '700' }}>HealCare</h1>
      </div>
      {showNavLinks && (
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/medicines" style={{ color: '#2c3e50', margin: '0 1em', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#2BBBAD'} onMouseOut={(e) => e.target.style.color = '#2c3e50'}>Browse Medicines</Link>
          <Link to="/cart" style={{ color: '#2c3e50', margin: '0 1em', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#2BBBAD'} onMouseOut={(e) => e.target.style.color = '#2c3e50'}>Cart</Link>
          <Link to="/orders" style={{ color: '#2c3e50', margin: '0 1em', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#2BBBAD'} onMouseOut={(e) => e.target.style.color = '#2c3e50'}>Orders</Link>
          <Link to="/contact" style={{ color: '#2c3e50', margin: '0 1em', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#2BBBAD'} onMouseOut={(e) => e.target.style.color = '#2c3e50'}>Contact</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" style={{ color: '#2c3e50', margin: '0 1em', textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#2BBBAD'} onMouseOut={(e) => e.target.style.color = '#2c3e50'}>Admin Panel</Link>
          )}
          <button onClick={handleLogout} style={{ color: '#2c3e50', background: 'none', border: 'none', margin: '0 1em', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#2BBBAD'} onMouseOut={(e) => e.target.style.color = '#2c3e50'}>Logout</button>
        </nav>
      )}
    </header>
  );
}

function AppContent() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/category-medicines" element={<CategoryMedicines />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer style={{
        backgroundColor: 'rgba(74, 92, 106, 0.9)',
        color: 'white',
        textAlign: 'center',
        padding: '1em',
        marginTop: 'auto',
        backdropFilter: 'blur(5px)'
      }}>
        <p>&copy; 2025 HealCare. All rights reserved.</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <MedicineProvider>
              <AppContent />
            </MedicineProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;