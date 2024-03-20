import React, { useState } from 'react';
import LightningLogin from './LightningLogin';
import Web5Login from './Web5Login';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* Use Bootstrap classes to style the header */}
      <header className="App-header text-center bg-primary text-white py-3 mb-4">
        {/* Title with emojis, centered and styled with Bootstrap */}
        <h1>LeetMigo 🎮👾</h1>
      </header>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            {isLoggedIn ? (
              <p>Welcome! You're logged in.</p>
            ) : (
              <>
                <LightningLogin onLogin={setIsLoggedIn} />
                <Web5Login onLogin={setIsLoggedIn} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


