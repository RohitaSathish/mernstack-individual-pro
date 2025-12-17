import React, { useState } from "react";
import { useMedicines } from "../MedicineContext";
import { useUser } from "../UserContext";
import { useMessages } from "../MessageContext";

function Admin() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useMedicines();
  const { users } = useUser();
  const { messages, replyToMessage } = useMessages();

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    brand: "",
    price: "",
    rating: "",
    purpose: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMedicine(editingId, newMedicine);
      setEditingId(null);
    } else {
      addMedicine(newMedicine);
    }
    setNewMedicine({ name: "", dosage: "", brand: "", price: "", rating: "", purpose: "", image: "" });
  };

  const handleEdit = (med) => {
    setNewMedicine(med);
    setEditingId(med.id);
  };

  const handleDelete = (id) => {
    deleteMedicine(id);
  };

  const handleReply = (id) => {
    if (replyText.trim()) {
      replyToMessage(id, replyText);
      setReplyingTo(null);
      setReplyText("");
      alert("Reply sent successfully!");
    }
  };

  return (
    <div style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)', padding: '2em' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em', textAlign: 'center' }}>
          <h2 style={{ color: '#2BBBAD', fontSize: '2.5em', marginBottom: '0.5em' }}>⚙️ Admin Dashboard</h2>
          <p style={{ color: '#666' }}>Manage medicines and users</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em' }}>
          <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '1.5em', borderBottom: '2px solid #2BBBAD', paddingBottom: '0.5em' }}>
            {editingId ? "✏️ Edit Medicine" : "➕ Add New Medicine"}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1em' }}>
            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              value={newMedicine.name}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em' }}
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={newMedicine.dosage}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em' }}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={newMedicine.brand}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em' }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={newMedicine.price}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em' }}
            />
            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={newMedicine.rating}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em' }}
            />
            <input
              type="text"
              name="purpose"
              placeholder="Purpose"
              value={newMedicine.purpose}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', gridColumn: 'span 2' }}
            />
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={newMedicine.image}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', gridColumn: 'span 2' }}
            />
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1em' }}>
              <button type="submit" style={{ flex: 1, padding: '14px', backgroundColor: '#1FA89A', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: '600', cursor: 'pointer' }}>
                {editingId ? "Update Medicine" : "Add Medicine"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setNewMedicine({ name: "", dosage: "", brand: "", price: "", rating: "", purpose: "", image: "" }); }} style={{ padding: '14px 30px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: '600', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em' }}>
          <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '1.5em', borderBottom: '2px solid #2BBBAD', paddingBottom: '0.5em' }}>📦 Manage Medicines</h3>
          <div style={{ maxWidth: '600px', margin: '0 auto 1.5em auto' }}>
            <input
              type="text"
              placeholder="🔍 Search medicines..."
              value={searchTerm}
              onChange={(e) => {
                const term = e.target.value;
                setSearchTerm(term);
                if (term.trim()) {
                  const results = medicines.filter(med => 
                    med.name.toLowerCase().includes(term.toLowerCase()) ||
                    med.brand.toLowerCase().includes(term.toLowerCase()) ||
                    med.purpose.toLowerCase().includes(term.toLowerCase())
                  );
                  setSearchResults(results);
                } else {
                  setSearchResults([]);
                }
              }}
              style={{ width: '100%', padding: '12px 20px', border: '2px solid #e0e0e0', borderRadius: '50px', fontSize: '1em', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.borderColor = '#2BBBAD'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          {searchResults.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5em' }}>
              {searchResults.map((med) => (
                <div key={med.id} style={{ backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '1.5em', border: '2px solid #e0e0e0', transition: 'all 0.3s' }}>
                  <img src={med.image} alt={med.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1em' }} />
                  <h4 style={{ color: '#333', fontSize: '1.2em', marginBottom: '0.5em' }}>{med.name}</h4>
                  <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '0.3em' }}>{med.dosage} - {med.brand}</p>
                  <p style={{ color: '#2BBBAD', fontWeight: '700', fontSize: '1.3em', margin: '0.5em 0' }}>₹ {med.price}</p>
                  <p style={{ color: '#ffa500', marginBottom: '0.5em' }}>⭐ {med.rating}/5</p>
                  <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '1em' }}>{med.purpose}</p>
                  <div style={{ display: 'flex', gap: '0.5em' }}>
                    <button onClick={() => handleEdit(med)} style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Edit</button>
                    <button onClick={() => handleDelete(med.id)} style={{ flex: 1, padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {searchTerm && searchResults.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', padding: '2em' }}>No medicines found matching your search.</p>
          )}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em' }}>
          <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '1.5em', borderBottom: '2px solid #2BBBAD', paddingBottom: '0.5em' }}>💬 Customer Messages</h3>
          {messages.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '1.5em', border: `2px solid ${msg.status === 'replied' ? '#28a745' : '#ffc107'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
                    <div>
                      <h4 style={{ color: '#333', marginBottom: '0.3em' }}>{msg.name}</h4>
                      <p style={{ color: '#666', fontSize: '0.9em' }}>{msg.email}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'inline-block', padding: '5px 15px', backgroundColor: msg.status === 'replied' ? '#28a745' : '#ffc107', color: 'white', borderRadius: '20px', fontSize: '0.85em', fontWeight: '600' }}>
                        {msg.status === 'replied' ? 'Replied' : 'Pending'}
                      </span>
                      <p style={{ color: '#999', fontSize: '0.85em', marginTop: '0.5em' }}>{msg.date}</p>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1em' }}>
                    <p style={{ color: '#555', fontWeight: '600', marginBottom: '0.3em' }}>Subject: {msg.subject}</p>
                    <p style={{ color: '#666', lineHeight: '1.6' }}>{msg.message}</p>
                  </div>
                  {msg.reply && (
                    <div style={{ backgroundColor: '#e6f7ff', padding: '1em', borderRadius: '8px', borderLeft: '3px solid #2BBBAD', marginBottom: '1em' }}>
                      <p style={{ color: '#555', fontWeight: '600', marginBottom: '0.5em' }}>Admin Reply:</p>
                      <p style={{ color: '#666' }}>{msg.reply}</p>
                    </div>
                  )}
                  {!msg.reply && (
                    replyingTo === msg.id ? (
                      <div>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          rows="3"
                          style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', marginBottom: '0.5em' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5em' }}>
                          <button onClick={() => handleReply(msg.id)} style={{ padding: '10px 20px', backgroundColor: '#1FA89A', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Send Reply</button>
                          <button onClick={() => { setReplyingTo(null); setReplyText(''); }} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setReplyingTo(msg.id)} style={{ padding: '10px 20px', backgroundColor: '#2BBBAD', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Reply</button>
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '2em' }}>No customer messages yet.</p>
          )}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '1.5em', borderBottom: '2px solid #2BBBAD', paddingBottom: '0.5em' }}>👥 User Management</h3>
          <p style={{ color: '#666', marginBottom: '1.5em', fontSize: '1.1em' }}>Total Registered Users: <strong style={{ color: '#2BBBAD' }}>{users.length}</strong></p>
          {users.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#2BBBAD', color: 'white' }}>
                    <th style={{ padding: '1em', textAlign: 'left', borderRadius: '8px 0 0 0' }}>ID</th>
                    <th style={{ padding: '1em', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '1em', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '1em', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Registered Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                      <td style={{ padding: '1em', border: '1px solid #e0e0e0' }}>{user.id}</td>
                      <td style={{ padding: '1em', border: '1px solid #e0e0e0' }}>{user.name}</td>
                      <td style={{ padding: '1em', border: '1px solid #e0e0e0' }}>{user.email}</td>
                      <td style={{ padding: '1em', border: '1px solid #e0e0e0' }}>{user.registeredDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '2em' }}>No users registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
