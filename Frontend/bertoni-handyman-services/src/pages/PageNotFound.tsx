import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  const goHome = () => navigate('/');
  const contact = () => navigate('/contact');

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    margin: '0 10px', // Added margin for spacing between buttons
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '72px', fontWeight: 'bold' }}>404</h1>
        <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>Page Not Found</h2>
        <p style={{ marginBottom: '30px' }}>Oops! That page can’t be found.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Container for buttons */}
          <button onClick={goHome} style={buttonStyle}>
            Go Home
          </button>
          <button onClick={contact} style={buttonStyle}>
            Contact
          </button>
        </div>
      </main>
    </div>
  );
}
