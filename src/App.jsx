import React, { useState, useEffect } from "react";
import { DidJwk } from "@web5/dids";

function App() {
  const [didInfo, setDidInfo] = useState({ full: "", short: ""});
  const [userInput, setUserInfo] = useState("");
  const [accountSwitched, setAccountSwitched] = useState(false);
  const [showDocument, setshowDocument] = useState(false);

  useEffect(() => {
    const fetchInitialDID = async () => {
      try {
        const didJwk = await DidJwk.create();
        const portableDid = didJwk.export();
        const didDocument = JSON.stringify(did.Jwk.document, null, 2);
        updateDID(didJwk.uri, portableDid, didDocument);
      } catch (error) {
        console.error('Failed to fetch initial DID:', error);
      }
    };
    
    fetchInitialDID();
  }, []);

  const updateDID = (newDID, portable, document) => {
    setDidInfo({
      full: newDID,
      short: `${newDID.slice(0,15)}...`,
      document: document,
      portable: portable
     });
  };


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (accountSwitched) {
      setAccountSwitched(false);
    } // Reset only if needed
  };

  const switchAccount = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      updateDID(userInput.trim());
      setAccountSwitched(true);
    }
  };

  const redirectToLeetMigo = () => {
    window.location.href = "https://chat.openai.com/g/g-JD79hRxJc-leetmigo";
  };

  const redirectToGoogleForm = () => {
    window.location.href = "https://docs.google.com/forms/d/1eAAZa7Wc_snP0AhH2w6B3ewXh0_zbYd_zYcko_-f2IY/prefill";
  };

  return (
    <div className="App d-flex flex-column vh-100 justify-content-center align-items-center text-center"
      style={{ backgroundColor: "#000", color: "#fff", width: "100%" }}>
      <header className="mb-4 w-100" style={{ backgroundColor: "#333" }}>
        <h1>LeetMigo 👾</h1>
        <p>Your based Web5-pilled technical mock interviewer so that you can land that awesome software engineering job! ⚛️🫡</p>
      </header>

      {accountSwitched && <p>Account successfully switched.</p>}

      <form onSubmit={switchAccount}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter new DID"
          style={{ margin: "10px" }}
        />
        <button type="submit">Switch Account</button>
      </form>

      <button onClick={redirectToGoogleForm} style={{ marginTop: "20px" }}>
        Go to Survey - Complete for Free access!
      </button>
      <button onClick={redirectToLeetMigo} style={{ marginTop: "20px" }}>
        Go to LeetMigo Custom GPT
      </button>
    </div>
  );
}

export default App;
