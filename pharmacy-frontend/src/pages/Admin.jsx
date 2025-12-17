import React, { useState } from "react";
import { useMedicines } from "../MedicineContext";
import { useUser } from "../UserContext";

function Admin() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useMedicines();
  const { users } = useUser();

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

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="admin-section">
        <h3>{editingId ? "Edit Medicine" : "Add New Medicine"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={newMedicine.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dosage"
            placeholder="Dosage"
            value={newMedicine.dosage}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newMedicine.brand}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={newMedicine.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={newMedicine.rating}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            value={newMedicine.purpose}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={newMedicine.image}
            onChange={handleChange}
            required
          />
          <button type="submit">{editingId ? "Update Medicine" : "Add Medicine"}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setNewMedicine({ name: "", dosage: "", brand: "", price: "", rating: "", purpose: "", image: "" }); }}>Cancel</button>}
        </form>
      </div>

      <div className="admin-section">
        <h3>Manage Medicines</h3>
        <input
          type="text"
          placeholder="Search medicines..."
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
          style={{ marginBottom: '1em', width: '100%', padding: '0.5em' }}
        />
        {searchResults.length > 0 && (
          <div className="medicine-list">
            {searchResults.map((med) => (
              <div key={med.id} className="medicine-card">
                <img src={med.image} alt={med.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto 1em auto', display: 'block' }} />
                <h3>{med.name} <span style={{ fontSize: '0.8em', color: 'var(--secondary-color)', fontWeight: 'normal' }}>({med.dosage})</span></h3>
                <p style={{ fontSize: '0.9em', color: 'var(--secondary-color)', marginBottom: '0.5em' }}>Brand: {med.brand}</p>
                <div style={{ textAlign: 'center', marginBottom: '0.5em' }}>
                  <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'var(--primary-color)', margin: '0.5em 0' }}>₹ {med.price}</p>
                  <p style={{ color: '#ffa500', margin: '0.5em 0' }}>★ {med.rating}/5</p>
                </div>
                <div style={{ marginBottom: '1em', textAlign: 'left' }}>
                  <p><strong>Purpose:</strong> {med.purpose}</p>
                </div>
                <button onClick={() => handleEdit(med)} style={{ backgroundColor: '#28a745', borderColor: '#28a745', marginRight: '0.5em' }}>Edit</button>
                <button onClick={() => handleDelete(med.id)} style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}>Delete</button>
              </div>
            ))}
          </div>
        )}
        {searchTerm && searchResults.length === 0 && (
          <p>No medicines found matching your search.</p>
        )}
      </div>

      <div className="admin-section">
        <h3>User Management</h3>
        <p>Total Registered Users: {users.length}</p>
        {users.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1em' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '0.75em', border: '1px solid #dee2e6', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '0.75em', border: '1px solid #dee2e6', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.75em', border: '1px solid #dee2e6', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '0.75em', border: '1px solid #dee2e6', textAlign: 'left' }}>Registered Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: '0.75em', border: '1px solid #dee2e6' }}>{user.id}</td>
                    <td style={{ padding: '0.75em', border: '1px solid #dee2e6' }}>{user.name}</td>
                    <td style={{ padding: '0.75em', border: '1px solid #dee2e6' }}>{user.email}</td>
                    <td style={{ padding: '0.75em', border: '1px solid #dee2e6' }}>{user.registeredDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users registered yet.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
