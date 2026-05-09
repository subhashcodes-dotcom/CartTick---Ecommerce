import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Contact Us</h1>
        <p style={styles.paragraph}>
          Have a question or need assistance? Fill out the form below and our team will get back to you.
        </p>

        <div style={styles.grid}>
          {/* Form */}
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                style={styles.input} 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                style={styles.input} 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea 
                style={{...styles.input, minHeight: '150px'}} 
                required 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>
            <button type="submit" style={styles.button}>
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>

          {/* Contact Info */}
          <div style={styles.infoCard}>
            <h3 style={styles.infoHeading}>Get in Touch</h3>
            <div style={styles.infoItem}>
              <strong>📍 Address</strong>
              <p>123 CartTick HQ, Tech Park<br/>Bangalore, India 560001</p>
            </div>
            <div style={styles.infoItem}>
              <strong>📞 Phone</strong>
              <p>+91 98765 43210</p>
            </div>
            <div style={styles.infoItem}>
              <strong>✉️ Email</strong>
              <p>support@carttick.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 2rem',
    backgroundColor: 'var(--background)',
    color: 'var(--text-main)'
  },
  content: {
    maxWidth: '1000px',
    width: '100%',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    marginBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    backgroundColor: 'var(--surface)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--background)',
    color: 'var(--text-main)',
    fontFamily: 'inherit',
    fontSize: '1rem',
  },
  button: {
    padding: '1rem',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  infoCard: {
    backgroundColor: 'var(--surface)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    height: 'fit-content',
  },
  infoHeading: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.5rem',
  },
  infoItem: {
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  }
};

export default Contact;
