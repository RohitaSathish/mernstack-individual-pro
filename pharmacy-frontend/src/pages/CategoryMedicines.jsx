import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useMedicines } from '../MedicineContext';

function CategoryMedicines() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { medicines: allMedicines, loading } = useMedicines();
  const { addToCart } = useCart();
  
  const medicines = allMedicines.filter(medicine => medicine.category === category);

  if (loading) return <div style={{ textAlign: 'center', padding: '3em' }}>Loading medicines...</div>;

  return (
    <div style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)', padding: '2em 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2em' }}>
        <div style={{ marginBottom: '2em' }}>
          <Link to="/medicines" style={{ color: '#667eea', textDecoration: 'none' }}>← Back to Categories</Link>
          <h1 style={{ color: '#333', fontSize: '2.5em', margin: '0.5em 0' }}>{category}</h1>
          <p style={{ color: '#666' }}>{medicines.length} medicines available</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2em' }}>
          {medicines.map((medicine) => (
            <div key={medicine._id} style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '1.5em',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={medicine.image} alt={medicine.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1em' }} />
              <h3 style={{ color: '#333', marginBottom: '0.5em' }}>{medicine.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '0.5em' }}>{medicine.brand} - {medicine.dosage}</p>
              <p style={{ color: '#888', fontSize: '0.85em', marginBottom: '1em' }}>{medicine.purpose}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#667eea' }}>₹{medicine.price}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                  <span style={{ color: '#ffa500' }}>★ {medicine.rating}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  addToCart(medicine);
                  alert('Medicine added to cart!');
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {medicines.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3em', color: '#999' }}>
            <h3>No medicines found in this category</h3>
            <p>Please check back later or browse other categories</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryMedicines;