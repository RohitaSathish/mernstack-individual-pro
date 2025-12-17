import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ₹ {total}</h3>
            <button onClick={clearCart}>Clear Cart</button>
            <Link to="/payment">
              <button style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: 'rgba(108, 155, 207, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}>
                Make Payment
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;