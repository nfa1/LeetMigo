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

  return (
    <div className="App" style={{ backgroundColor: '#282c34', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>LeetMigo 🎮👾</h1>
      <p>Please save and store your generated DID in a safe location.</p>
      <p>Your DID: {did}</p>
      <form className="form-inline" onSubmit={switchAccount}>
        <div className="form-group mb-2">
          <label htmlFor="didInput" className="sr-only">Paste your DID to switch accounts:</label>
          <input type="text" className="form-control" id="didInput" placeholder="Paste your DID" value={userInput} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Switch Account</button>
      </form>
      {accountSwitched && <p>Account has been switched!</p>}
    </div>
  );
}

export default App;
