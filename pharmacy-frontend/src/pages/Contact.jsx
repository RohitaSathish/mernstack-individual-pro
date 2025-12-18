import React, { useState, useEffect } from 'react';
import { useMessages } from '../MessageContext';
import { useAuth } from '../AuthContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { addMessage, messages, refreshMessages } = useMessages();
  const { user } = useAuth();
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString());

  const handleManualRefresh = () => {
    refreshMessages();
    setLastRefresh(new Date().toLocaleTimeString());
    alert('Messages refreshed! Check for new replies.');
  };

  // Refresh messages every 3 seconds to check for admin replies
  useEffect(() => {
    const interval = setInterval(() => {
      refreshMessages();
      setLastRefresh(new Date().toLocaleTimeString());
    }, 3000);
    return () => clearInterval(interval);
  }, [refreshMessages]);

  // Also refresh when component mounts
  useEffect(() => {
    refreshMessages();
    setLastRefresh(new Date().toLocaleTimeString());
  }, [refreshMessages]);

  // Show messages for current user's email, or if no matches, show all messages
  const userMessages = messages.filter(msg => msg.email === user?.email);
  const allUserMessages = userMessages.length > 0 ? userMessages : messages;

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
          <h1 style={{ color: '#333', fontSize: '2.5em', marginBottom: '0.5em' }}>Contact Information</h1>
          <p style={{ color: '#666', fontSize: '1.1em' }}>We're here to help! Reach out to us anytime</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2em', marginBottom: '2em' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#2BBBAD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1em auto', color: 'white', fontSize: '1.5em', fontWeight: 'bold' }}>LOC</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>Our Location</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Cross-Cut Road<br/>Gandhipuram<br/>Coimbatore - 641004</p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#2BBBAD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1em auto', color: 'white', fontSize: '1.5em', fontWeight: 'bold' }}>TEL</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>Phone Support</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Main: 9870543812<br/>Emergency: 1-800-PHARMACY<br/>Available 8-8</p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '2em', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#2BBBAD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1em auto', color: 'white', fontSize: '1.5em', fontWeight: 'bold' }}>MSG</div>
            <h3 style={{ color: '#333', marginBottom: '0.5em' }}>Email Support</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>support@healcare.com<br/>orders@healcare.com<br/>Response within 24hrs</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2em' }}>
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
              <h3 style={{ color: '#333', marginBottom: '0.8em', fontSize: '1.2em' }}>Emergency Services</h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '0.5em' }}>For medical emergencies, call 911 immediately.</p>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Poison Control: 1-800-222-1222</p>
            </div>



          </div>
        </div>

        {user && allUserMessages.length > 0 && (
          <div style={{ backgroundColor: 'white', padding: '2em', borderRadius: '12px', border: '1px solid #e1e8ed', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginTop: '2em' }}>
            <div style={{ marginBottom: '2em', paddingBottom: '1em', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
              <h3 style={{ color: '#2c3e50', fontSize: '1.5em', margin: 0, fontWeight: '600' }}>Customer Support Messages</h3>
              <p style={{ color: '#6c757d', fontSize: '0.9em', margin: '0.5em 0 0 0' }}>View your inquiries and our responses below</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
              {allUserMessages.map((msg) => (
                <div key={msg.id} style={{ backgroundColor: '#fafbfc', padding: '1.5em', borderRadius: '8px', border: '1px solid #e1e8ed', position: 'relative' }}>
                  {msg.reply && (
                    <div style={{ position: 'absolute', top: '0', right: '0', backgroundColor: '#28a745', color: 'white', padding: '4px 12px', borderRadius: '0 10px 0 8px', fontSize: '0.75em', fontWeight: '600' }}>RESOLVED</div>
                  )}
                  
                  <div style={{ marginBottom: '1.5em' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8em' }}>
                      <h4 style={{ color: '#2c3e50', fontSize: '1.2em', fontWeight: '600', margin: 0, lineHeight: '1.3' }}>{msg.subject}</h4>
                      <span style={{ color: '#6c757d', fontSize: '0.85em', whiteSpace: 'nowrap', marginLeft: '1em' }}>{msg.date}</span>
                    </div>
                    
                    <div style={{ backgroundColor: 'white', padding: '1.2em', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: msg.reply ? '1.5em' : '0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '0.8em' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: '#667eea', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9em', fontWeight: '600' }}>You</div>
                        <span style={{ color: '#495057', fontSize: '0.9em', fontWeight: '500' }}>Your Inquiry</span>
                      </div>
                      <p style={{ color: '#495057', fontSize: '1em', lineHeight: '1.6', margin: 0 }}>{msg.message}</p>
                    </div>
                    
                    {msg.reply ? (
                      <div style={{ backgroundColor: '#f8f9fa', padding: '1.2em', borderRadius: '8px', border: '1px solid #28a745' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '0.8em' }}>
                          <div style={{ width: '32px', height: '32px', backgroundColor: '#28a745', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8em', fontWeight: '600' }}>HC</div>
                          <span style={{ color: '#28a745', fontSize: '0.9em', fontWeight: '600' }}>HealCare Support Team</span>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '1em', borderRadius: '6px', border: '1px solid #d4edda' }}>
                          <p style={{ color: '#155724', fontSize: '1em', lineHeight: '1.6', margin: 0 }}>{msg.reply}</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ backgroundColor: '#fff3cd', padding: '1.2em', borderRadius: '8px', border: '1px solid #ffeaa7', textAlign: 'center' }}>
                        <div style={{ color: '#856404', fontSize: '0.9em' }}>
                          <strong>Status:</strong> Under Review - Our support team will respond within 24 hours
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;