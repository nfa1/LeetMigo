import React, { useState } from 'react';
import './App.css'; // Assume you have a CSS file for styling

function App() {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Add logic for handling email submission
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src="C:\Users\Fabian\OneDrive - Eastern Gateway Community College\Leetmigo\LeetMigo\public" alt="LeetMigo Logo" className="logo" />
        <div className="header-buttons">
          <button className="header-button">Learn</button>
          <button className="header-button">Connect Wallet</button>
        </div>
      </div>
      <form className="email-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          What's your email address?*
        </label>
        <p className="form-subtext">
          So we can make sure you get placed on the LeetMigo waitlist for early free access! By signing up you accept our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
        </p>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          placeholder="name@example.com"
          className="email-input"
          required
        />
        <button type="submit" className="submit-button">
          OK
        </button>
      </form>
      <div className="content">
        <div className="category">
          <h2>Coding & Startups</h2>
          <div className="card-container">
            <div className="card">Lesson 1: Learning & Motivation</div>
            <div className="card">Lesson 2: Frontend Programming</div>
            <div className="card">Lesson 3: Backend Connections</div>
            <div className="card">Lesson 4: Building Apps</div>
            <div className="card">Lesson 5: Computer Science</div>
          </div>
        </div>
        <div className="category">
          <h2>Communications</h2>
          <div className="card-container">
            <div className="card">Philosophy & Role</div>
            <div className="card">Interactions & Design</div>
            <div className="card">The Psychology of the System</div>
          </div>
        </div>
        <div className="category">
          <h2>Investing & Business</h2>
          <div className="card-container">
            <div className="card">Resume Writing</div>
            <div className="card">Focus & Investing</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
