import React from "react";
import { useCart } from "../CartContext";
import { useMedicines } from "../MedicineContext";
import { useSearchParams, Link } from "react-router-dom";
import './CategoryMedicines.css';

function CategoryMedicines() {
  const { addToCart } = useCart();
  const { medicines } = useMedicines();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'Pain Relief';

  const handleAddToCart = (med) => {
    addToCart(med);
    alert(`${med.name} added to cart!`);
  };

  const filteredMedicines = medicines.filter(med => med.category === category);

  return (
    <div className="category-medicines-page">
      <div className="category-header">
        <Link to="/medicines" className="back-btn">← Back to Categories</Link>
        <h1>{category}</h1>
        <p>Browse our selection of {category.toLowerCase()} medicines</p>
      </div>

      <div className="container">
        <div className="medicines-grid">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((med) => (
              <div key={med.id} className="medicine-item-card">
                <div className="medicine-image">
                  <img src={med.image} alt={med.name} />
                </div>
                <div className="medicine-content">
                  <h3>{med.name}</h3>
                  <p className="medicine-dosage">{med.dosage}</p>
                  <p className="medicine-brand">Brand: {med.brand}</p>
                  <p className="medicine-purpose">{med.purpose}</p>
                  <div className="medicine-footer">
                    <div className="medicine-info">
                      <span className="medicine-price">₹{med.price}</span>
                      <span className="medicine-rating">★ {med.rating}/5</span>
                    </div>
                    <button 
                      className="add-to-cart-btn" 
                      onClick={() => handleAddToCart(med)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-medicines">
              <p>No medicines found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryMedicines;
