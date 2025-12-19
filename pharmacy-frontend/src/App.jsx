import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .header-title { font-size: 1.4rem !important; }
    .header-subtitle { font-size: 0.7rem !important; }
  }
  @media (min-width: 769px) {
    .desktop-nav { display: flex !important; }
    .mobile-menu-btn { display: none !important; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}
import { AuthProvider, useAuth } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";
import { MedicineProvider } from "./MedicineContext";
import { MessageProvider } from "./MessageContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import CategoryMedicines from "./pages/CategoryMedicines";
import MedicineDetails from "./pages/MedicineDetails";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const showNavLinks = isLoggedIn && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

  const navLinkStyle = {
    color: '#2c3e50',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const buttonStyle = {
    ...navLinkStyle,
    background: 'linear-gradient(135deg, #2BBBAD, #1FA89A)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600'
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      color: '#2c3e50',
      padding: '1rem 1.5rem',
      display: 'flex',
      justifyContent: isLoggedIn ? 'space-between' : 'center',
      alignItems: 'center',
      boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
      borderBottom: '1px solid rgba(43, 187, 173, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <svg width="45" height="45" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#2BBBAD" opacity="0.15"/>
          <path d="M20 8 L20 32 M8 20 L32 20" stroke="#2BBBAD" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="6" fill="#1FA89A"/>
          <path d="M16 20 L19 23 L24 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <div>
          <h1 className="header-title" style={{ margin: 0, fontSize: '1.75rem', color: '#2BBBAD', fontWeight: '700', letterSpacing: '-0.5px' }}>HealCare</h1>
          <p className="header-subtitle" style={{ margin: 0, fontSize: '0.75rem', color: '#7f8c8d', fontWeight: '400' }}>Professional Pharmacy</p>
        </div>
      </div>
      {showNavLinks && (
        <>
          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/medicines" style={navLinkStyle} onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(43, 187, 173, 0.1)'; e.target.style.color = '#2BBBAD'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#2c3e50'; }}>Medicines</Link>
            <Link to="/cart" style={navLinkStyle} onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(43, 187, 173, 0.1)'; e.target.style.color = '#2BBBAD'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#2c3e50'; }}>Cart</Link>
            <Link to="/orders" style={navLinkStyle} onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(43, 187, 173, 0.1)'; e.target.style.color = '#2BBBAD'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#2c3e50'; }}>Orders</Link>
            <Link to="/contact" style={navLinkStyle} onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(43, 187, 173, 0.1)'; e.target.style.color = '#2BBBAD'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#2c3e50'; }}>Contact</Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" style={{...navLinkStyle, fontWeight: '600', color: '#e74c3c'}} onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(231, 76, 60, 0.1)'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; }}>Admin</Link>
            )}
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(44, 62, 80, 0.2)', margin: '0 0.5rem' }}></div>
            <button onClick={handleLogout} style={buttonStyle} onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>Logout</button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              color: '#2BBBAD'
            }}
          >
            ⋮
          </button>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '1.5rem',
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: '8px',
              padding: '1rem 0',
              minWidth: '200px',
              zIndex: 1001
            }}>
              <Link 
                to="/medicines" 
                style={{ display: 'block', padding: '0.75rem 1.5rem', color: '#2c3e50', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Medicines
              </Link>
              <Link 
                to="/cart" 
                style={{ display: 'block', padding: '0.75rem 1.5rem', color: '#2c3e50', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
              <Link 
                to="/orders" 
                style={{ display: 'block', padding: '0.75rem 1.5rem', color: '#2c3e50', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
              <Link 
                to="/contact" 
                style={{ display: 'block', padding: '0.75rem 1.5rem', color: '#2c3e50', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {user && user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  style={{ display: 'block', padding: '0.75rem 1.5rem', color: '#e74c3c', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button 
                onClick={handleLogout}
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  padding: '0.75rem 1.5rem', 
                  background: 'none', 
                  border: 'none', 
                  color: '#2BBBAD', 
                  textAlign: 'left', 
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </>
      )}
      {/* Overlay to close mobile menu when clicking outside */}
      {isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

function AppContent() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      <Navigation />
      <main style={{ flex: 1, paddingTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/category-medicines" element={<CategoryMedicines />} />
          <Route path="/medicine/:id" element={<MedicineDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '2rem 1rem',
        marginTop: 'auto',
        borderTop: '4px solid #2BBBAD'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#2BBBAD" opacity="0.3"/>
                <path d="M20 8 L20 32 M8 20 L32 20" stroke="#2BBBAD" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="6" fill="#1FA89A"/>
                <path d="M16 20 L19 23 L24 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>HealCare</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>&copy; 2025 HealCare Professional Pharmacy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <MedicineProvider>
              <MessageProvider>
                <AppContent />
              </MessageProvider>
            </MedicineProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;