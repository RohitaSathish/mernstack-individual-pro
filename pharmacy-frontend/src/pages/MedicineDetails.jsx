import React from 'react';
import { useParams } from 'react-router-dom';

const MedicineDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Medicine Details</h2>
      <p>Medicine ID: {id}</p>
      {/* Add your medicine details implementation here */}
    </div>
  );
};

export default MedicineDetails;