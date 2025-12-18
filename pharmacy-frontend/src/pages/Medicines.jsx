import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Medicines.css';

function Medicines() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = [
    { name: "Pain Relief", icon: "pain-relief", desc: "Analgesics, Anti-inflammatory drugs, Muscle relaxants", color: "#ff6b6b" },
    { name: "Antibiotics", icon: "antibiotics", desc: "Bacterial infection treatments, Antiviral medications", color: "#4ecdc4" },
    { name: "Vitamins", icon: "vitamins", desc: "Essential vitamins, Minerals, Nutritional supplements", color: "#ffe66d" },
    { name: "Chronic Care", icon: "chronic", desc: "Diabetes, Hypertension, Heart disease medications", color: "#a8e6cf" },
    { name: "Respiratory", icon: "respiratory", desc: "Asthma inhalers, Cough syrups, Allergy medications", color: "#95e1d3" },
    { name: "Digestive", icon: "digestive", desc: "Antacids, Probiotics, Digestive enzymes", color: "#f38181" },
    { name: "Women's Health", icon: "womens-health", desc: "Prenatal vitamins, Menstrual care, Iron supplements", color: "#aa96da" }
  ];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medicines-page" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)', padding: '2em 0' }}>
      <div className="medicines-header" style={{ textAlign: 'center', padding: '2em', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2em' }}>
        <h1 style={{ color: '#333', fontSize: '2.5em', marginBottom: '0.5em' }}>Browse Medicines</h1>
        <p style={{ color: '#666', fontSize: '1.1em', marginBottom: '1.5em' }}>Select a category to find the medicines you need</p>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '15px 20px', fontSize: '1em', border: '2px solid #e0e0e0', borderRadius: '50px', outline: 'none', transition: 'all 0.3s' }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2em 3em 2em' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2em', padding: '1em' }}>
          {filteredCategories.map((category, index) => (
            <Link 
              key={index}
              to={`/category-medicines?category=${category.name}`} 
              style={{ textDecoration: 'none' }}
            >
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '15px', 
                padding: '1.5em', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
                transition: 'all 0.3s',
                cursor: 'pointer',
                border: '2px solid transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '200px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = category.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}>
                <div className={`category-icon ${category.icon}`} style={{ marginBottom: '1em' }}></div>
                <h4 style={{ color: '#333', fontSize: '1.4em', marginBottom: '0.5em' }}>{category.name}</h4>
                <p style={{ color: '#666', fontSize: '0.95em', lineHeight: '1.5' }}>{category.desc}</p>
                <div style={{ marginTop: '1em', color: category.color, fontWeight: '600', fontSize: '0.9em' }}>View Products →</div>
              </div>
            </Link>
          ))}
        </div>
        {filteredCategories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3em', color: '#999' }}>
            <h3>No categories found</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Medicines;
