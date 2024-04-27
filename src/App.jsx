import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DidJwk } from '@web5/dids';

function App() {
  const [did, setDid] = useState(''); // Full DID
  const [shortDid, setShortDid] = useState(''); // Shortened DID for display
  const [userInput, setUserInput] = useState('');
  const [accountSwitched, setAccountSwitched] = useState(false);

  useEffect(() => {
    const fetchDID = async () => {
      const didJwk = await DidJwk.create();
      setDid(didJwk.uri);
      // Update the shortened DID display whenever the full DID changes
      setShortDid(didJwk.uri.slice(0, 15) + '...'); // Adjust length as needed
    };

    fetchDID();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setAccountSwitched(false); // Reset account switched message when user edits input
  };

  const switchAccount = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      setDid(userInput.trim());
      setShortDid(userInput.trim().slice(0, 15) + '...'); // Update shortened DID when user inputs a new one
      setAccountSwitched(true);
    }
  };

  const redirectToLeetMigo = () => {
    window.location.href = "https://chat.openai.com/g/g-JD79hRxJc-leetmigo";
  };

  return (
    <div className="App d-flex flex-column vh-100 justify-content-center align-items-center text-center" style={{ backgroundColor: '#000', color: '#fff', width: '100%' }}>
      <header className="mb-4 w-100" style={{ backgroundColor: '#333' }}>
        <h1>LeetMigo 💻👾</h1>
        <p className="tagline">Your based Web5-pilled technical mock interviewer so that you can land that awesome software engineering job!⚛️🫡</p>
      </header>

      {accountSwitched && <p>Account has been switched!</p>}
      <div className="warning-message">
        <p>Please save and store your generated DID in a safe location.</p>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <p>Your DID: {shortDid}</p>
        <form className="form-inline" onSubmit={switchAccount}>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="didInput" className="sr-only">Paste your DID to switch accounts:</label>
            <input type="text" className="form-control" id="didInput" placeholder="Paste your DID" value={userInput} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Switch Account</button>
        </form>
        <button onClick={redirectToLeetMigo} className="btn btn-success mb-2 ml-2">Start Grinding!</button>
      </div>
    </div>
  );
}

export default App;
