import React, { useState, useEffect } from 'react';
import LightningLogin from './LightningLogin';
// import Web5Login from './Web5Login'; // Temporarily disable import if not used elsewhere
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      // Redirect the user after a short delay post-login
      setTimeout(() => {
        window.location.href = "https://chat.openai.com/g/g-JD79hRxJc-leetmigo";
      }, 2000); // Adjust the delay here as needed (2000 milliseconds = 2 seconds)
    }
  }, [isLoggedIn]); // This effect runs whenever isLoggedIn changes

  return (
    <div className="App">
      <header className="App-header text-center bg-primary text-white py-3 mb-4">
        <h1>LeetMigo 🎮👾</h1>
      </header>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            {!isLoggedIn ? (
              <>
                <LightningLogin onLogin={() => setIsLoggedIn(true)} />
                {/* Commenting out the Web5Login for now
                <Web5Login onLogin={() => setIsLoggedIn(true)} />
                */}
              </>
            ) : (
              <p>Welcome! You're logged in.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
