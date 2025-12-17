import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    upiId: "",
    bankName: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save order to localStorage
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      paymentMethod: paymentMethod,
      total: total,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        brand: item.brand,
        dosage: item.dosage
      }))
    };
    
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    
    let message = "Payment successful! Thank you for your purchase.";
    if (paymentMethod === "cod") {
      message = "Order placed successfully! You will pay cash on delivery.";
    } else if (paymentMethod === "netbanking") {
      message = "Payment via Net Banking successful!";
    } else if (paymentMethod === "upi") {
      message = "Payment via UPI successful!";
    }
    alert(message);
    clearCart();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2>Payment Page</h2>
        <p>
          Your cart is empty. Please add items before proceeding to payment.
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Payment Page</h2>
      <h3>Total Amount: ₹ {total}</h3>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "1em" }}>
          <label>Payment Method:</label>
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Credit/Debit Card
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="netbanking"
            checked={paymentMethod === "netbanking"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Net Banking
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          UPI
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Cash on Delivery
        </div>

        {paymentMethod === "card" && (
          <>
            <div style={{ marginBottom: "1em" }}>
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "1em" }}>
              <label>Expiry Date:</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "1em" }}>
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "1em" }}>
              <label>Cardholder Name:</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
          </>
        )}

        {paymentMethod === "netbanking" && (
          <div style={{ marginBottom: "1em" }}>
            <label>Bank Name:</label>
            <input
              type="text"
              name="bankName"
              placeholder="e.g., SBI, HDFC"
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div style={{ marginBottom: "1em" }}>
            <label>UPI ID:</label>
            <input
              type="text"
              name="upiId"
              placeholder="yourname@upi"
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        )}

        {paymentMethod !== "cod" && (
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Pay Now
          </button>
        )}

        {paymentMethod === "cod" && (
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Place Order (Cash on Delivery)
          </button>
        )}
      </form>
    </div>
  );
}

export default Payment;
