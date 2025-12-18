import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    console.log("Orders - Loaded orders:", savedOrders);
    setOrders(savedOrders.reverse());
  }, []);

  const getStatusColor = (status) => {
    return status === "Order Placed" ? "#4ecdc4" : "#95e1d3";
  };

  return (
    <div style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)', padding: '2em' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em' }}>
          <h2 style={{ color: '#333', fontSize: '2em', marginBottom: '0.5em', borderBottom: '3px solid #667eea', paddingBottom: '0.5em' }}>My Orders</h2>
          <p style={{ color: '#666' }}>Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '4em 2em', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2em', marginBottom: '0.5em', color: '#667eea', fontWeight: 'bold' }}>ORDERS</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>No orders yet</h3>
            <p style={{ color: '#666', marginBottom: '2em' }}>Start shopping to see your orders here!</p>
            <Link to="/medicines">
              <button style={{ padding: '12px 30px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}>
                Browse Medicines
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: 'white',
                  border: "2px solid #e0e0e0",
                  borderRadius: "15px",
                  padding: "2em",
                  marginBottom: "1.5em",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5em', flexWrap: 'wrap', gap: '1em' }}>
                  <div>
                    <h3 style={{ color: '#333', fontSize: '1.3em', marginBottom: '0.3em' }}>Order #{order.id}</h3>
                    <p style={{ color: '#666', fontSize: '0.9em' }}>Placed on {order.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: getStatusColor(order.status || "Order Placed"), color: 'white', borderRadius: '20px', fontWeight: '600', fontSize: '0.9em', marginBottom: '0.5em' }}>
                      {order.status || "Order Placed"}
                    </div>
                    <p style={{ color: '#667eea', fontWeight: '700', fontSize: '1.4em' }}>₹ {order.total}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1em', padding: '1.5em', backgroundColor: '#f8f9fa', borderRadius: '10px', marginBottom: '1.5em' }}>
                  {order.trackingId && (
                    <div>
                      <p style={{ color: '#999', fontSize: '0.85em', marginBottom: '0.3em' }}>TRACKING ID</p>
                      <p style={{ color: '#333', fontWeight: '600', fontSize: '0.95em' }}>{order.trackingId}</p>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div>
                      <p style={{ color: '#999', fontSize: '0.85em', marginBottom: '0.3em' }}>ESTIMATED DELIVERY</p>
                      <p style={{ color: '#333', fontWeight: '600', fontSize: '0.95em' }}>{order.estimatedDelivery}</p>
                    </div>
                  )}
                  <div>
                    <p style={{ color: '#999', fontSize: '0.85em', marginBottom: '0.3em' }}>PAYMENT METHOD</p>
                    <p style={{ color: '#333', fontWeight: '600', fontSize: '0.95em', textTransform: 'uppercase' }}>{order.paymentMethod}</p>
                  </div>
                </div>

                {order.deliveryAddress && (
                  <div style={{ backgroundColor: '#fff9e6', padding: '1.5em', borderRadius: '10px', marginBottom: '1.5em', border: '1px solid #ffe66d' }}>
                    <h4 style={{ color: '#333', marginBottom: '0.8em', fontSize: '1.1em' }}>Delivery Address</h4>
                    <p style={{ color: '#555', marginBottom: '0.3em', fontWeight: '600' }}>{order.deliveryAddress.fullName}</p>
                    <p style={{ color: '#666', marginBottom: '0.2em' }}>{order.deliveryAddress.address}</p>
                    <p style={{ color: '#666', marginBottom: '0.2em' }}>{order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                    <p style={{ color: '#666' }}>Phone: {order.deliveryAddress.phone}</p>
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                    <h4 style={{ color: '#333', fontSize: '1.1em' }}>Order Items ({order.items.length})</h4>
                    <button 
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      style={{ padding: '8px 16px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9em', fontWeight: '600', transition: 'background 0.3s' }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
                    >
                      {expandedOrder === order.id ? 'Hide Items' : 'View Items'}
                    </button>
                  </div>
                  {expandedOrder === order.id && (
                    <div style={{ backgroundColor: '#f8f9fa', padding: '1em', borderRadius: '8px' }}>
                      {order.items.map((item, index) => (
                        <div key={index} style={{ padding: '1em', borderBottom: index < order.items.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <p style={{ color: '#333', fontWeight: '600', marginBottom: '0.3em' }}>{item.name}</p>
                              <p style={{ color: '#666', fontSize: '0.9em' }}>{item.brand} - {item.dosage}</p>
                            </div>
                            <p style={{ color: '#667eea', fontWeight: '700', fontSize: '1.1em' }}>₹ {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
