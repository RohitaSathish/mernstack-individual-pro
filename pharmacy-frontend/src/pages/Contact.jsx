import React from 'react';

const Contact = () => {
  return (
    <div style={{ padding: '2em', maxWidth: '800px', margin: '0 auto', color: 'white', backgroundColor: '#333', borderRadius: '8px' }}>
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to reach out to us!</p>
      <div style={{ marginTop: '2em' }}>
        <h2>Pharmacy Store</h2>
        <p><strong>Address:</strong> 123 Main Street, City, State, ZIP Code</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Email:</strong> contact@pharmacystore.com</p>
        <p><strong>Hours:</strong> Monday - Friday: 9 AM - 9 PM, Saturday: 10 AM - 6 PM, Sunday: Closed</p>
      </div>
      <div style={{ marginTop: '2em' }}>
        <h2>Send us a message</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <input type="text" placeholder="Your Name" style={{ padding: '0.5em' }} />
          <input type="email" placeholder="Your Email" style={{ padding: '0.5em' }} />
          <textarea placeholder="Your Message" rows="5" style={{ padding: '0.5em' }}></textarea>
          <button type="submit" style={{ padding: '0.5em 1em', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;