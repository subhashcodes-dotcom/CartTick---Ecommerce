import React from 'react';
import subhashImg from "../images/subhash.jpeg";
import siddarthImg from "../images/siddharth.jpeg";
import shanthImg from "../images/shanth.jpeg";
import shrishailImg from "../images/shrishail.jpeg";

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>About CartTick</h1>
        <p style={styles.paragraph}>
          Welcome to CartTick, your premier destination for modern e-commerce shopping.
          Our goal is to provide a seamless, premium, and efficient shopping experience for everyone.
        </p>
        <div style={styles.founderSection}>
          <h2 style={styles.subheading}>Meet the Team</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={styles.card}>
              <img src={subhashImg} alt="Subhash Chandra" style={styles.avatarImage}/>
              <div>
                <h3 style={styles.name}>Subhash Chandra S</h3>
                <p style={styles.role}>Founder & Developer  </p>
                <p style={styles.bio}>
                  Subhash Chandra envisioned CartTick as a platform that bridges the gap between quality products 
                  and intuitive design. With a passion for modern web technologies and user experience, 
                  Subhash built CartTick to set a new standard in online retail.
                </p>
              </div>
            </div>

            <div style={styles.card}>
              <img src={siddarthImg} alt="Siddarth" style={styles.avatarImage}/>
              <div>
                <h3 style={styles.name}>Siddarth</h3>
                <p style={styles.role}>Operations & Customer Experience Lead</p>
                <p style={styles.bio}>
                  Siddarth plays a key role in managing team coordination and enhancing customer satisfaction. His strong communication skills and problem-solving mindset help ensure smooth project execution and a better shopping experience for users.
                </p>
              </div>
            </div>

            <div style={styles.card}>
              <img src={shrishailImg} alt="Shrishail Teli" style={styles.avatarImage}/>
              <div>
                <h3 style={styles.name}>Shrishail Teli</h3>
                <p style={styles.role}>Strategy & System Management</p>
                <p style={styles.bio}>
                  Shrishail contributes to platform planning, workflow management, and maintaining operational efficiency. He focuses on improving teamwork, organizing processes, and ensuring the platform grows in a structured and reliable manner.
                </p>
              </div>
            </div>

            <div style={styles.card}>
              <img src={shanthImg} alt="Shanthakumar" style={styles.avatarImage}/>
              <div>
                <h3 style={styles.name}>Shanthakumar M</h3>
                <p style={styles.role}>Research & Analysis Associate</p>
                <p style={styles.bio}>
                   Shanthakumar works on market research and field analysis to understand customer needs, identify trends, and contribute ideas that help improve the platform and its services.
                </p>
              </div>
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
    maxWidth: '800px',
    width: '100%',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: 'var(--text-main)',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: 'var(--text-muted)',
    marginBottom: '3rem',
  },
  founderSection: {
    marginTop: '2rem',
  },
  subheading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: 'var(--text-main)',
  },
  card: {
    display: 'flex',
    gap: '2rem',
    backgroundColor: 'var(--surface)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    alignItems: 'flex-start',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  avatarImage: {
  width: "150px",       // adjust as needed
  height: "150px",      // adjust as needed
  objectFit: "cover",
  borderRadius: "50%",   // makes it circular
},
  name: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.5rem',
  },
  role: {
    color: 'var(--primary)',
    fontWeight: '600',
    margin: '0 0 1rem 0',
  },
  bio: {
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    margin: 0,
  }
};

export default About;
