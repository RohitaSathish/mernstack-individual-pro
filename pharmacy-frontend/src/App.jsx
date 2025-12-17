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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      backgroundColor: '#007bff',
      color: 'white',
      padding: '1em',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(5px)'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.8em' }}>HealCare</h1>
      {isLoggedIn && (
        <nav>
          <Link to="/medicines" style={{ color: 'white', margin: '0 1em', textDecoration: 'none' }}>Browse Medicines</Link>
          <Link to="/cart" style={{ color: 'white', margin: '0 1em', textDecoration: 'none' }}>Cart</Link>
          <Link to="/orders" style={{ color: 'white', margin: '0 1em', textDecoration: 'none' }}>Orders</Link>
          <Link to="/contact" style={{ color: 'white', margin: '0 1em', textDecoration: 'none' }}>Contact</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" style={{ color: 'white', margin: '0 1em', textDecoration: 'none', fontWeight: 'bold' }}>Admin Panel</Link>
          )}
          <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', margin: '0 1em', textDecoration: 'underline', cursor: 'pointer' }}>Logout</button>
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