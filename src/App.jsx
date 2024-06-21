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

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeArNtgtrssOytNTt39Hs78UFUq1FgLwQlKNNZ5gzvIbjPnXg/viewform";
  };

  const handleFileChange = (e) => {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeArNtgtrssOytNTt39Hs78UFUq1FgLwQlKNNZ5gzvIbjPnXg/viewform";
    setFile(e.target.files[0]);
  };

  const encryptAndUploadFile = (e) => {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeArNtgtrssOytNTt39Hs78UFUq1FgLwQlKNNZ5gzvIbjPnXg/viewform";
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1 className="logo">LeetMigo 👾</h1>
          <p className="description">A DSA interview preparation platform for non-traditional, cracked candidates seeking software engineering jobs.</p>
          <div className="header-links">
            <button className="link-button" onClick={() => window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeArNtgtrssOytNTt39Hs78UFUq1FgLwQlKNNZ5gzvIbjPnXg/viewform"}>Learn</button>
            <button className="link-button" onClick={() => window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSeArNtgtrssOytNTt39Hs78UFUq1FgLwQlKNNZ5gzvIbjPnXg/viewform"}>Connect Wallet</button>
          </div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="form-title">What's your email address?*</h2>
        <p className="form-description">Get on the LeetMigo waitlist for early access! *By signing up you accept our <a href="https://docs.google.com/forms/d/e/1FAIpQLSeArNtgtrssOytNTt39Hs78UFUq1FgLwQlKNNZ5gzvIbjPnXg/viewform" className="link">Terms of Use</a> and <a href="https://docs.google.com/forms/d/e/1FAIpQLSeArNtgtrssOytNTt39Hs78UFUq1FgLwQlKNNZ5gzvIbjPnXg/viewform" className="link">Privacy Policy</a></p>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          placeholder="name@example.com"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button" onClick={handleSubmit}>OK</button>
      </div>

      {fileError && (
        <div className="alert">
          <span className="alert-icon">⚠️</span>
          {fileError}
        </div>
      )}
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button className="upload-button" onClick={encryptAndUploadFile}>Upload and Encrypt</button>
      
      {/* LaunchList widget */}
      <div className="launchlist-widget" data-key-id="pI1JRr" data-height="180px"></div>
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
