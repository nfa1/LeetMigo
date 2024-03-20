// src/Web5Login.jsx
import React from 'react';

const Web5Login = ({ onLogin }) => {
  const handleLogin = () => {
    // Placeholder for Web5 DID login logic
    console.log('Logging in with Web5 DID...');
    onLogin(true); // Simulate successful login
  };

  return (
    <button onClick={handleLogin} className="btn btn-secondary">
      Login with Web5 DID
    </button>
  );
};

export default Web5Login;
