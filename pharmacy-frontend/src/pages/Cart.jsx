import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryCharge = cart.length > 0 ? 50 : 0;
  const finalTotal = total + deliveryCharge;

  return (
    <div style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)', padding: '2em' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em' }}>
          <h2 style={{ color: '#333', fontSize: '2em', marginBottom: '0.5em', borderBottom: '3px solid #667eea', paddingBottom: '0.5em' }}>Your Cart</h2>
          <p style={{ color: '#666', marginBottom: '1.5em' }}>{cart.length} item(s) in your cart</p>
        </div>

        {cart.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '4em 2em', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2em', marginBottom: '0.5em', color: '#667eea', fontWeight: 'bold' }}>CART</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>Your cart is empty</h3>
            <p style={{ color: '#666', marginBottom: '2em' }}>Add some medicines to get started!</p>
            <Link to="/medicines">
              <button style={{ padding: '12px 30px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}>
                Browse Medicines
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5em', borderBottom: index < cart.length - 1 ? '1px solid #e0e0e0' : 'none', transition: 'background 0.3s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#333', fontSize: '1.2em', marginBottom: '0.3em' }}>{item.name}</h3>
                    <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '0.2em' }}>{item.brand} - {item.dosage}</p>
                    <p style={{ color: '#667eea', fontWeight: '600', fontSize: '1.1em' }}>₹ {item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id || item._id)} style={{ padding: '10px 20px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.3s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#ee5a52'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '1em', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5em' }}>Order Summary</h3>
              <div style={{ marginBottom: '1em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em', color: '#666' }}>
                  <span>Subtotal ({cart.length} items):</span>
                  <span>₹ {total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em', color: '#666' }}>
                  <span>Delivery Charge:</span>
                  <span>₹ {deliveryCharge}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3em', fontWeight: '700', color: '#333', marginTop: '1em', paddingTop: '1em', borderTop: '2px solid #e0e0e0' }}>
                  <span>Total:</span>
                  <span style={{ color: '#667eea' }}>₹ {finalTotal}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1em', marginTop: '2em' }}>
                <button onClick={clearCart} style={{ flex: 1, padding: '14px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}>
                  Clear Cart
                </button>
                <Link to="/payment" style={{ flex: 2 }}>
                  <button style={{ width: '100%', padding: '14px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1em', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}>
                    Proceed to Checkout →
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;