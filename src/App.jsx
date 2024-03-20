import React, { useState, useEffect } from 'react';
import LightningLogin from './LightningLogin';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "LeetMigo"; // Sets the document title for the browser tab
    
    if (isLoggedIn) {
      setIsLoading(true); // Start loading animation
      setTimeout(() => {
        setIsLoading(false); // Stop loading animation
        window.location.href = "https://chat.openai.com/g/g-JD79hRxJc-leetmigo";
      }, 2000); // Redirect after 2 seconds
    }
  }, [isLoggedIn]);

  return (
    <div className="App d-flex flex-column vh-100 justify-content-center align-items-center text-center" style={{ backgroundColor: '#000', color: '#fff', width: '100%' }}>
      <header className="mb-4 w-100" style={{ backgroundColor: '#333' }}>
        <h1>LeetMigo 🎮👾</h1>
      </header>

      {isLoading ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : isLoggedIn ? (
        <p>Welcome! You're logged in.</p>
      ) : (
        <LightningLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
