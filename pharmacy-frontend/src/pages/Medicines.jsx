import React from "react";
import { Link } from "react-router-dom";
import './Medicines.css';

function Medicines() {
  return (
    <div className="medicines-page">
      <div className="medicines-header">
        <h1>Browse Medicines</h1>
        <p>Select a category to find the medicines you need</p>
      </div>

      <div className="container">
        <div className="categories-grid">
          <Link to="/category-medicines?category=Pain Relief" className="category-card">
            <div className="category-icon pain-relief"></div>
            <h4>Pain Relief</h4>
            <p>Analgesics, Anti-inflammatory drugs, Muscle relaxants</p>
          </Link>
          <Link to="/category-medicines?category=Antibiotics" className="category-card">
            <div className="category-icon antibiotics"></div>
            <h4>Antibiotics</h4>
            <p>Bacterial infection treatments, Antiviral medications</p>
          </Link>
          <Link to="/category-medicines?category=Vitamins" className="category-card">
            <div className="category-icon vitamins"></div>
            <h4>Vitamins & Supplements</h4>
            <p>Essential vitamins, Minerals, Nutritional supplements</p>
          </Link>
          <Link to="/category-medicines?category=Chronic Care" className="category-card">
            <div className="category-icon chronic"></div>
            <h4>Chronic Care</h4>
            <p>Diabetes, Hypertension, Heart disease medications</p>
          </Link>
          <Link to="/category-medicines?category=Skincare" className="category-card">
            <div className="category-icon skincare"></div>
            <h4>Skincare</h4>
            <p>Dermatological treatments, Topical medications</p>
          </Link>
          <Link to="/category-medicines?category=Respiratory" className="category-card">
            <div className="category-icon respiratory"></div>
            <h4>Respiratory</h4>
            <p>Asthma inhalers, Cough syrups, Allergy medications</p>
          </Link>
          <Link to="/category-medicines?category=Digestive" className="category-card">
            <div className="category-icon digestive"></div>
            <h4>Digestive Health</h4>
            <p>Antacids, Probiotics, Digestive enzymes</p>
          </Link>
          <Link to="/category-medicines?category=Women's Health" className="category-card">
            <div className="category-icon womens-health"></div>
            <h4>Women's Health</h4>
            <p>Prenatal vitamins, Menstrual care, Iron supplements</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Medicines;
