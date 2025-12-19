import React, { useState, useEffect } from "react";
import { useMedicines } from "../MedicineContext";
import { adminService } from "../services/adminService.js";

function Admin() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useMedicines();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesData, ordersData, usersData] = await Promise.all([
          adminService.getMessages(),
          adminService.getOrders(),
          adminService.getUsers()
        ]);
        setMessages(messagesData);
        setOrders(ordersData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    brand: "",
    price: "",
    rating: "",
    purpose: "",
    image: "",
    category: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newMedicine.name || !newMedicine.dosage || !newMedicine.brand || !newMedicine.price || !newMedicine.category) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      if (editingId) {
        await updateMedicine(editingId, newMedicine);
        setEditingId(null);
        alert('Medicine updated successfully!');
      } else {
        await addMedicine(newMedicine);
        alert('Medicine added successfully!');
      }
      setNewMedicine({ name: "", dosage: "", brand: "", price: "", rating: "", purpose: "", image: "", category: "" });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (med) => {
    setNewMedicine(med);
    setEditingId(med._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteMedicine(id);
        alert('Medicine deleted successfully!');
      } catch (error) {
        alert('Error deleting medicine: ' + error.message);
      }
    }
  };

  const handleReply = async (id) => {
    if (replyText.trim()) {
      try {
        await adminService.replyToMessage(id, replyText);
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, reply: replyText, status: 'replied' } : msg
        ));
        setReplyingTo(null);
        setReplyText("");
        alert("Reply sent successfully!");
      } catch (error) {
        alert("Failed to send reply. Please try again.");
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#333', margin: '0 0 10px 0' }}>Admin Dashboard</h2>
          <p style={{ color: '#666', margin: '0' }}>Manage medicines and users</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>
            {editingId ? "Edit Medicine" : "Add New Medicine"}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              value={newMedicine.name}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={newMedicine.dosage}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newMedicine.brand}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={newMedicine.price}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={newMedicine.rating}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              name="purpose"
              placeholder="Purpose"
              value={newMedicine.purpose}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', gridColumn: 'span 2' }}
            />
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={newMedicine.image}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <select
              name="category"
              value={newMedicine.category}
              onChange={handleChange}
              required
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Select Category</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Vitamins">Vitamins</option>
              <option value="Chronic Care">Chronic Care</option>
              <option value="Respiratory">Respiratory</option>
              <option value="Digestive">Digestive</option>
              <option value="Women's Health">Women's Health</option>
            </select>
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                {editingId ? "Update Medicine" : "Add Medicine"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setNewMedicine({ name: "", dosage: "", brand: "", price: "", rating: "", purpose: "", image: "", category: "" }); }} style={{ padding: '12px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>Manage Medicines</h3>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => {
                const term = e.target.value;
                setSearchTerm(term);
                if (term.trim()) {
                  const results = medicines.filter(med => 
                    med.name?.toLowerCase().includes(term.toLowerCase()) ||
                    med.brand?.toLowerCase().includes(term.toLowerCase()) ||
                    med.purpose?.toLowerCase().includes(term.toLowerCase())
                  );
                  setSearchResults(results);
                } else {
                  setSearchResults([]);
                }
              }}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          {searchResults.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {searchResults.map((med) => (
                <div key={med._id} style={{ backgroundColor: '#f9f9f9', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  {med.image && <img src={med.image} alt={med.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />}
                  <h4 style={{ color: '#333', margin: '0 0 8px 0' }}>{med.name}</h4>
                  <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '14px' }}>{med.dosage} - {med.brand}</p>
                  <p style={{ color: '#007bff', fontWeight: 'bold', margin: '5px 0' }}>₹ {med.price}</p>
                  <p style={{ color: '#ffa500', margin: '0 0 5px 0', fontSize: '14px' }}>Rating: {med.rating}/5</p>
                  <p style={{ color: '#666', margin: '0 0 15px 0', fontSize: '14px' }}>{med.purpose}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(med)} style={{ flex: 1, padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(med._id)} style={{ flex: 1, padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {searchTerm && searchResults.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No medicines found matching your search.</p>
          )}
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>Customer Messages</h3>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Loading messages...</p>
          ) : messages.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((msg) => (
                <div key={msg._id} style={{ backgroundColor: '#f9f9f9', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ color: '#333', margin: '0 0 5px 0' }}>{msg.name}</h4>
                      <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>{msg.email}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: msg.status === 'replied' ? '#28a745' : '#ffc107', color: 'white', borderRadius: '4px', fontSize: '12px' }}>
                        {msg.status === 'replied' ? 'Replied' : 'Pending'}
                      </span>
                      <p style={{ color: '#999', fontSize: '12px', margin: '5px 0 0 0' }}>{new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ color: '#555', fontWeight: 'bold', margin: '0 0 5px 0' }}>Subject: {msg.subject}</p>
                    <p style={{ color: '#666', margin: '0' }}>{msg.message}</p>
                  </div>
                  {msg.reply && (
                    <div style={{ backgroundColor: '#e6f7ff', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
                      <p style={{ color: '#555', fontWeight: 'bold', margin: '0 0 5px 0' }}>Admin Reply:</p>
                      <p style={{ color: '#666', margin: '0' }}>{msg.reply}</p>
                    </div>
                  )}
                  {!msg.reply && (
                    replyingTo === msg._id ? (
                      <div>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          rows="3"
                          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px' }}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleReply(msg._id)} style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send Reply</button>
                          <button onClick={() => { setReplyingTo(null); setReplyText(''); }} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setReplyingTo(msg._id)} style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reply</button>
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No customer messages yet.</p>
          )}
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>Order Management</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>Total Orders: <strong style={{ color: '#007bff' }}>{orders.length}</strong></p>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Loading orders...</p>
          ) : orders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {orders.map((order) => (
                <div key={order._id} style={{ backgroundColor: '#f9f9f9', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                    <div>
                      <h4 style={{ color: '#333', margin: '0 0 8px 0' }}>Order #{order._id}</h4>
                      <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '14px' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '14px' }}>Payment: {order.paymentMethod}</p>
                      <p style={{ color: '#007bff', fontWeight: 'bold', margin: '0' }}>Total: ₹{order.total}</p>
                    </div>
                    {order.deliveryAddress && (
                      <div>
                        <h5 style={{ color: '#333', margin: '0 0 8px 0' }}>Delivery Address</h5>
                        <p style={{ color: '#666', margin: '0 0 3px 0', fontSize: '14px' }}><strong>{order.deliveryAddress.fullName}</strong></p>
                        <p style={{ color: '#666', margin: '0 0 3px 0', fontSize: '14px' }}>Phone: {order.deliveryAddress.phone}</p>
                        <p style={{ color: '#666', margin: '0 0 3px 0', fontSize: '14px' }}>{order.deliveryAddress.address}</p>
                        <p style={{ color: '#666', margin: '0 0 3px 0', fontSize: '14px' }}>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                        <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>PIN: {order.deliveryAddress.pincode}</p>
                      </div>
                    )}
                    <div>
                      <h5 style={{ color: '#333', margin: '0 0 8px 0' }}>Items Ordered</h5>
                      {order.items.map((item, index) => (
                        <div key={index} style={{ backgroundColor: 'white', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                          <p style={{ color: '#333', fontWeight: 'bold', margin: '0 0 3px 0', fontSize: '14px' }}>{item.name}</p>
                          <p style={{ color: '#666', margin: '0 0 3px 0', fontSize: '12px' }}>{item.dosage} - {item.brand}</p>
                          <p style={{ color: '#007bff', fontWeight: 'bold', margin: '0', fontSize: '14px' }}>₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No orders placed yet.</p>
          )}
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>Registered Users</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>Total Registered Users: <strong style={{ color: '#007bff' }}>{users.length}</strong></p>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Loading users...</p>
          ) : users.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {users.map((user) => (
                <div key={user._id} style={{ backgroundColor: '#f9f9f9', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                      <h4 style={{ color: '#333', margin: '0 0 8px 0' }}>User Details</h4>
                      <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '14px' }}><strong>Name:</strong> {user.name}</p>
                      <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '14px' }}><strong>Email:</strong> {user.email}</p>
                      <p style={{ color: '#666', margin: '0', fontSize: '14px' }}><strong>Role:</strong> {user.role}</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#333', margin: '0 0 8px 0' }}>Registration Info</h4>
                      <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '14px' }}><strong>User ID:</strong> {user._id}</p>
                      <p style={{ color: '#666', margin: '0 0 5px 0', fontSize: '14px' }}><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                      <p style={{ color: '#666', margin: '0', fontSize: '14px' }}><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 style={{ color: '#333', margin: '0 0 8px 0' }}>Account Status</h4>
                      <span style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: user.role === 'admin' ? '#dc3545' : '#28a745', color: 'white', borderRadius: '4px', fontSize: '12px' }}>
                        {user.role === 'admin' ? 'Administrator' : 'Regular User'}
                      </span>
                      <p style={{ color: '#666', margin: '8px 0 0 0', fontSize: '12px' }}>Password: Encrypted & Secured</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No users registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;