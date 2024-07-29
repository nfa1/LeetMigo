  import React, { useState, useEffect, useCallback } from 'react';
  import ReactDOM from 'react-dom/client';
  import './App.css';
  import { initializeApp } from 'firebase/app';
  import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
  import { Web5 } from '@web5/api';
  import CryptoJS from 'crypto-js';

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const localStorageLimit = 5 * 1024 * 1024; // 5MB
  const warningLimit = localStorageLimit / 2; // 50% of total memory limit

  function App() {
    const [email, setEmail] = useState('');
    const [uniqueId, setUniqueId] = useState(localStorage.getItem('uniqueId') || '');
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [gdprAccepted, setGdprAccepted] = useState(false);

    const createWebNode = useCallback(async () => {
      try {
        const web5 = new Web5();
        const id = web5.did;

        if (!id || typeof id !== 'string' || !id.startsWith('did:')) {
          throw new Error('Invalid DID');
        }

        localStorage.setItem('uniqueId', id);
        await setDoc(doc(db, 'users', id), {
          uniqueId: id,
          createdAt: new Date().toISOString(),
        });
        setUniqueId(id);
        loadUserInstructions(id);
      } catch (error) {
        console.error('Error creating web node:', error);
      }
    }, []);

    const loadUserInstructions = useCallback(async (id) => {
      try {
        const userDocRef = doc(db, 'users', id);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists() && docSnap.data().instructions) {
          setInstructions(docSnap.data().instructions);
        } else {
          setInstructions('original');
        }
      } catch (error) {
        console.error('Error loading user instructions:', error);
      }
    }, []);

    useEffect(() => {
      if (!uniqueId) {
        createWebNode();
      } else {
        loadUserInstructions(uniqueId);
      }
    }, [uniqueId, createWebNode, loadUserInstructions]);

    const handleInputChange = (e) => {
      setEmail(e.target.value);
    };

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const encryptAndUploadFile = (e) => {
      // Add file encryption and upload logic here
    };

    const handleGdprAccept = () => {
      setGdprAccepted(true);
    };

    return (
      <div className="container">
        <div className="header">
          <div className="header-content">
            <h1 className="logo">LeetMigo 👾</h1>
            <p className="description">the world's first decentralized platform for dsa interview prep, made for non-trad, cracked techies and frens</p>
          </div>
        </div>

        <div className="form-container">
          <h2 className="form-title">What's your email?*</h2>
          <p className="form-description">Join the LeetMigo waitlist! *By signing up, you accept our <a href="#" className="link">Terms</a> and <a href="#" className="link">Privacy Policy</a></p>
          <form className="launchlist-form" action="https://getlaunchlist.com/s/pI1JRr" method="POST">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input-field"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              required
              className="input-field"
            />
            <button type="submit" className="submit-button">Sign Up</button>
          </form>
        </div>

        <button className="link-button" onClick={() => window.open("https://docs.google.com/spreadsheets/d/1v0OCKeLa9q8douuR6RQmQ5mOG2piThh50wuGA79g2SY/edit?usp=sharing", "_blank")}>
         FREE LeetCode Grind 75 Spreadsheet
        </button>
        
        <p className="coming-soon">Features coming soon:</p>
        <button className="link-button">Learn</button>
        <button className="upload-button" onClick={encryptAndUploadFile}>Upload and Encrypt</button>
        <button className="link-button">Connect Wallet</button>
        
        {!gdprAccepted && (
          <div className="gdpr-container">
            <p className="gdpr-text">We use cookies for a based experience. Continue to use this site and we'll assume you think it's kino.</p>
            <div className="gdpr-buttons">
              <button className="gdpr-button" onClick={handleGdprAccept}>OK</button>
              <button className="gdpr-button" onClick={() => alert('Please accept the GDPR terms.')}>No</button>
              <button className="gdpr-button" onClick={() => window.location.href = '/privacy-policy'}>Privacy policy</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const rootElement = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  export default App;
