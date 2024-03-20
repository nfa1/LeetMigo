// src/LightningLogin.jsx
import React from 'react';

const LightningLogin = ({ onLogin }) => {
  const handleLogin = () => {
    // Placeholder for login logic
    console.log('Logging in with Bitcoin Lightning...');
    onLogin(true); // Simulate successful login
  };

  return (
    <button onClick={handleLogin} className="btn btn-primary">
      Login with Lightning
    </button>
  );
};

export default LightningLogin;
