import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">HealCare Plus Pharmacy</h1>
          <p className="hero-subtitle">
            Your Trusted Healthcare Partner - Quality Medicines, Expert Care, Delivered to Your Door
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary btn-large">
              <i className="icon-user"></i> Login
            </Link>
            <Link to="/register" className="btn btn-secondary btn-large">
              <i className="icon-plus"></i> Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Pharmacy Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon prescription"></div>
              <h3>Prescription Medicines</h3>
              <p>Authentic prescription drugs from licensed manufacturers with proper quality assurance and safety standards.</p>
            </div>
            <div className="service-card">
              <div className="service-icon otc"></div>
              <h3>Over-the-Counter</h3>
              <p>Wide range of OTC medications for common ailments, vitamins, supplements, and health products.</p>
            </div>
            <div className="service-card">
              <div className="service-icon consultation"></div>
              <h3>Pharmacist Consultation</h3>
              <p>Professional consultation services for medication management, drug interactions, and health advice.</p>
            </div>
            <div className="service-card">
              <div className="service-icon delivery"></div>
              <h3>Home Delivery</h3>
              <p>Fast and secure delivery of medicines to your doorstep with proper temperature-controlled packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Awareness Section */}
      <section className="awareness-section">
        <div className="container">
          <h2 className="section-title">Health Awareness & Safety</h2>
          <div className="awareness-grid">
            <div className="awareness-card">
              <h3>🛡️ Medication Safety</h3>
              <ul>
                <li>Always check expiry dates before consuming medicines</li>
                <li>Store medications in cool, dry places away from sunlight</li>
                <li>Never share prescription medicines with others</li>
                <li>Complete the full course of antibiotics as prescribed</li>
              </ul>
            </div>
            <div className="awareness-card">
              <h3>⚠️ Drug Interactions</h3>
              <ul>
                <li>Inform your pharmacist about all medications you're taking</li>
                <li>Avoid alcohol while taking certain medications</li>
                <li>Check for food-drug interactions</li>
                <li>Consult before combining herbal supplements with medicines</li>
              </ul>
            </div>
            <div className="awareness-card">
              <h3>🏥 When to Seek Help</h3>
              <ul>
                <li>Severe allergic reactions (difficulty breathing, swelling)</li>
                <li>Unusual side effects or worsening symptoms</li>
                <li>Accidental overdose or missed doses</li>
                <li>Questions about medication effectiveness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Medicine Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Medicine Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon pain-relief"></div>
              <h4>Pain Relief</h4>
              <p>Analgesics, Anti-inflammatory drugs, Muscle relaxants</p>
            </div>
            <div className="category-card">
              <div className="category-icon antibiotics"></div>
              <h4>Antibiotics</h4>
              <p>Bacterial infection treatments, Antiviral medications</p>
            </div>
            <div className="category-card">
              <div className="category-icon vitamins"></div>
              <h4>Vitamins & Supplements</h4>
              <p>Essential vitamins, Minerals, Nutritional supplements</p>
            </div>
            <div className="category-card">
              <div className="category-icon chronic"></div>
              <h4>Chronic Care</h4>
              <p>Diabetes, Hypertension, Heart disease medications</p>
            </div>
            <div className="category-card">
              <div className="category-icon skincare"></div>
              <h4>Skincare</h4>
              <p>Dermatological treatments, Topical medications</p>
            </div>
            <div className="category-card">
              <div className="category-icon respiratory"></div>
              <h4>Respiratory</h4>
              <p>Asthma inhalers, Cough syrups, Allergy medications</p>
            </div>
            <div className="category-card">
              <div className="category-icon digestive"></div>
              <h4>Digestive Health</h4>
              <p>Antacids, Probiotics, Digestive enzymes</p>
            </div>
            <div className="category-card">
              <div className="category-icon womens-health"></div>
              <h4>Women's Health</h4>
              <p>Prenatal vitamins, Menstrual care, Iron supplements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Information */}
      <section className="emergency-section">
        <div className="container">
          <div className="emergency-card">
            <h2>🚨 Emergency Information</h2>
            <div className="emergency-content">
              <div className="emergency-item">
                <h4>Poison Control</h4>
                <p>National: 1-800-222-1222</p>
              </div>
              <div className="emergency-item">
                <h4>Medical Emergency</h4>
                <p>Call: 911 immediately</p>
              </div>
              <div className="emergency-item">
                <h4>24/7 Pharmacy Helpline</h4>
                <p>Call: 1-800-PHARMACY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="container">
          <h2 className="section-title">Why Choose HealCare Plus?</h2>
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-number">2+</div>
              <p>Years of Experience</p>
            </div>
            <div className="trust-item">
              <div className="trust-number">10K+</div>
              <p>Satisfied Customers</p>
            </div>
            <div className="trust-item">
              <div className="trust-number">8-8</div>
              <p>Customer Support</p>
            </div>
            <div className="trust-item">
              <div className="trust-number">100%</div>
              <p>Authentic Medicines</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
