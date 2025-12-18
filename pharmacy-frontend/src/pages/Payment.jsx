import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryData, setDeliveryData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    upiId: "",
    bankName: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate delivery data
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !deliveryData[field] || deliveryData[field].trim() === '');
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Save order to localStorage
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      paymentMethod: paymentMethod,
      total: total,
      deliveryAddress: deliveryData,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        brand: item.brand,
        dosage: item.dosage
      }))
    };
    
    console.log("Payment - New order being saved:", newOrder);
    console.log("Payment - Delivery data:", deliveryData);
    
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    
    console.log("Payment - All orders after save:", existingOrders);
    
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
      <h2>Delivery & Payment Details</h2>
      <h3>Total Amount: ₹ {total}</h3>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <h3 style={{ marginTop: "1.5em", borderBottom: "2px solid #007bff", paddingBottom: "0.5em" }}>Delivery Information</h3>
        <div style={{ marginBottom: "1em" }}>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={deliveryData.fullName}
            onChange={handleDeliveryChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            placeholder="10-digit mobile number"
            value={deliveryData.phone}
            onChange={handleDeliveryChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>Delivery Address:</label>
          <textarea
            name="address"
            placeholder="House/Flat No., Street, Landmark"
            value={deliveryData.address}
            onChange={handleDeliveryChange}
            required
            rows="3"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>City:</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={deliveryData.city}
            onChange={handleDeliveryChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>State:</label>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={deliveryData.state}
            onChange={handleDeliveryChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            placeholder="6-digit pincode"
            value={deliveryData.pincode}
            onChange={handleDeliveryChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <h3 style={{ marginTop: "1.5em", borderBottom: "2px solid #007bff", paddingBottom: "0.5em" }}>Payment Method</h3>
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
                onChange={handlePaymentChange}
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
                onChange={handlePaymentChange}
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
                onChange={handlePaymentChange}
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
                onChange={handlePaymentChange}
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
              onChange={handlePaymentChange}
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
              onChange={handlePaymentChange}
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
