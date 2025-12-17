import React, { useState } from 'react';
import { useMessages } from '../MessageContext';
import { useAuth } from '../AuthContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { addMessage, messages } = useMessages();
  const { user } = useAuth();

  const userMessages = messages.filter(msg => msg.email === user?.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #E0F7FA, #E3F2FD)', padding: '2em' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2em', textAlign: 'center' }}>
          <h1 style={{ color: '#333', fontSize: '2.5em', marginBottom: '0.5em' }}>📞 Contact Us</h1>
          <p style={{ color: '#666', fontSize: '1.1em' }}>We're here to help! Reach out to us anytime</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2em', marginBottom: '2em' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '3em', marginBottom: '0.5em' }}>📍</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>Visit Us</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Cross-Cut Road<br/>Gandhipuram<br/>Coimbatore - 641004</p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '3em', marginBottom: '0.5em' }}>📞</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>Call Us</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Main: 9870543812<br/>Emergency: 1-800-PHARMACY<br/>Available 8-8</p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ fontSize: '3em', marginBottom: '0.5em' }}>✉️</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>Email Us</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>support@healcare.com<br/>orders@healcare.com<br/>Response within 24hrs</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2em' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '1em', fontSize: '1.8em' }}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5em' }}>
                <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Your Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '1.5em' }}>
                <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Your Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '1.5em' }}>
                <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Subject</label>
                <input 
                  type="text" 
                  placeholder="What is this about?" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', transition: 'border 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ marginBottom: '1.5em' }}>
                <label style={{ display: 'block', color: '#555', fontWeight: '500', marginBottom: '0.5em' }}>Your Message</label>
                <textarea 
                  placeholder="Tell us how we can help you..." 
                  rows="5" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1em', resize: 'vertical', transition: 'border 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1em', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5568d3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}>
                Send Message
              </button>
            </form>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#333', marginBottom: '1em', fontSize: '1.8em' }}>Business Hours</h2>
            <div style={{ marginBottom: '2em' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1em', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '0.5em' }}>
                <span style={{ color: '#555', fontWeight: '600' }}>Monday - Friday</span>
                <span style={{ color: '#667eea', fontWeight: '600' }}>8:00 AM - 8:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1em', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '0.5em' }}>
                <span style={{ color: '#555', fontWeight: '600' }}>Saturday</span>
                <span style={{ color: '#667eea', fontWeight: '600' }}>8:00 AM - 8:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1em', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <span style={{ color: '#555', fontWeight: '600' }}>Sunday</span>
                <span style={{ color: '#ff6b6b', fontWeight: '600' }}>Closed</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff9e6', padding: '1.5em', borderRadius: '10px', border: '1px solid #ffe66d', marginBottom: '2em' }}>
              <h3 style={{ color: '#333', marginBottom: '0.8em', fontSize: '1.2em' }}>🚨 Emergency Services</h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '0.5em' }}>For medical emergencies, call 911 immediately.</p>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Poison Control: 1-800-222-1222</p>
            </div>

            {user && (
              <div style={{ backgroundColor: '#f0f8ff', padding: '1em', borderRadius: '8px', marginBottom: '1em', border: '1px solid #2BBBAD' }}>
                <p style={{ color: '#666', fontSize: '0.9em' }}>Logged in as: {user.email}</p>
                <p style={{ color: '#666', fontSize: '0.9em' }}>Total messages: {messages.length}</p>
                <p style={{ color: '#666', fontSize: '0.9em' }}>Your messages: {userMessages.length}</p>
              </div>
            )}
            {user && userMessages.length > 0 && (
              <div style={{ backgroundColor: '#e6f7ff', padding: '1.5em', borderRadius: '10px', border: '1px solid #2BBBAD' }}>
                <h3 style={{ color: '#333', marginBottom: '1em', fontSize: '1.2em' }}>💬 Your Messages</h3>
                {userMessages.map((msg) => (
                  <div key={msg.id} style={{ backgroundColor: 'white', padding: '1em', borderRadius: '8px', marginBottom: '1em', border: '1px solid #e0e0e0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em' }}>
                      <strong style={{ color: '#333' }}>{msg.subject}</strong>
                      <span style={{ fontSize: '0.85em', color: '#999' }}>{msg.date}</span>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '0.5em' }}>{msg.message}</p>
                    {msg.reply && (
                      <div style={{ backgroundColor: '#f0f8ff', padding: '0.8em', borderRadius: '6px', marginTop: '0.8em', borderLeft: '3px solid #2BBBAD' }}>
                        <p style={{ color: '#555', fontWeight: '600', fontSize: '0.9em', marginBottom: '0.3em' }}>Admin Reply:</p>
                        <p style={{ color: '#666', fontSize: '0.9em' }}>{msg.reply}</p>
                      </div>
                    )}
                    {!msg.reply && (
                      <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#ffc107', color: 'white', borderRadius: '12px', fontSize: '0.8em', fontWeight: '600', marginTop: '0.5em' }}>Pending Reply</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;