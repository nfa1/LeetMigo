import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // To simulate DID generation

function App() {
  const [did, setDid] = useState('');
  const [userInput, setUserInput] = useState('');
  const [accountSwitched, setAccountSwitched] = useState(false);

  // Simulate generating a DID upon navigating to the site
  useEffect(() => {
    const newDid = `did:example:${uuidv4()}`; // Generate a mock DID
    setDid(newDid);
  }, []);

  // Handle user input for switching accounts
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setAccountSwitched(false); // Reset account switched message when user edits input
  };

  // Validate and switch accounts with the provided DID
  const switchAccount = (e) => {
    e.preventDefault();
    // Validate the DID format (for demonstration, we only check if it's not empty)
    if (userInput.trim() !== '') {
      setDid(userInput.trim());
      setAccountSwitched(true);
    }
  };

  // Redirect to the provided URL
  const redirectToLeetMigo = () => {
    window.location.href = "https://chat.openai.com/g/g-JD79hRxJc-leetmigo";
  };

  return (
    <div className="App d-flex flex-column vh-100 justify-content-center align-items-center text-center" style={{ backgroundColor: '#000', color: '#fff', width: '100%' }}>
      <header className="mb-4 w-100" style={{ backgroundColor: '#333' }}>
        <h1>LeetMigo 🎮👾</h1>
        <p className="tagline">Your based technical mock interviewer so that you can land that awesome software engineering job!</p>
      </header>

      {accountSwitched && <p>Account has been switched!</p>}
      <div className="warning-message">
        <p>Please save and store your generated DID in a safe location.</p>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <p>Your DID: {did}</p>
        <form className="form-inline" onSubmit={switchAccount}>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="didInput" className="sr-only">Paste your DID to switch accounts:</label>
            <input type="text" className="form-control" id="didInput" placeholder="Paste your DID" value={userInput} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Switch Account</button>
        </form>
        <button onClick={redirectToLeetMigo} className="btn btn-success mb-2 ml-2">Start Grinding, LeetMigo!</button>
      </div>
    </div>
  );
}

export default App;
