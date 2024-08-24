import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  useColorMode,
  Spinner,
  Alert,
  AlertIcon,
  Input,
  FormControl,
  FormLabel,
  Link,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { CashuMint, CashuWallet } from '@cashu/cashu-ts'; // Cashu imports

// Path to the banner image in the src directory
import bannerImage from './LeetMigo_banner_main_01.png';

// Define your app name and description
const APP_NAME = "LeetMigo";
const APP_DESCRIPTION = "Secure Document Encryption and Storage with Bitcoin Lightning Network";

// Custom hook for handling Mint interactions
const useMint = () => {
  const loadMint = async (mintURL) => {
    const mint = new CashuMint(mintURL);
    const keysets = await mint.getKeySets();
    const keys = await mint.getKeys();
    return { mint, keysets, keys };
  };

  return { loadMint };
};

// Custom hook for handling Wallet interactions
const useWallet = () => {
  const { loadMint } = useMint();

  const createWallet = async (mintURL = 'https://testnut.cashu.space') => {
    const { mint, keys } = await loadMint(mintURL);
    return new CashuWallet(mint, keys);
  };

  const receiveToken = async (encodedToken) => {
    try {
      const wallet = await createWallet();
      const { token, tokensWithErrors } = await wallet.receive(encodedToken);
      return { token, tokensWithErrors };
    } catch (error) {
      console.error('Error receiving token:', error);
      return { error: 'Error occurred with redeeming tokens' };
    }
  };

  const sendToken = async (amountToSend, tokens) => {
    try {
      const wallet = await createWallet();
      const proofs = tokens.token.map((t) => t.proofs).flat();
      const { returnChange, send } = await wallet.send(amountToSend, proofs);
      return { returnChange, send };
    } catch (error) {
      console.error('Error sending token:', error);
      return { error: 'Error occurred with sending token' };
    }
  };

  return { createWallet, receiveToken, sendToken };
};

// Main App Component
const AppContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [encryptedDoc, setEncryptedDoc] = useState(null);
  const [verifiableCredential, setVerifiableCredential] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { createWallet, receiveToken, sendToken } = useWallet();

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGdprAccept = () => {
    setGdprAccepted(true);
  };

  // Handle payment and document encryption
  const handlePayment = useCallback(async () => {
    if (!selectedFile) {
      setAlertMessage('Please select a file.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate token receiving using Cashu
      const encodedToken = 'your-encoded-token-here'; // Replace with actual encoded token
      const { token, tokensWithErrors } = await receiveToken(encodedToken);

      if (token) {
        await encryptAndUploadDocument();
        setAlertMessage('Payment successful, document encrypted and uploaded.');
      } else {
        setAlertMessage('Payment failed or tokens with errors.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setAlertMessage('Error processing payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, receiveToken]);

  // Encrypt and upload document
  const encryptAndUploadDocument = async () => {
    try {
      const fileBuffer = await selectedFile.arrayBuffer();
      const fileContent = new Uint8Array(fileBuffer);

      const encryptionKey = crypto.getRandomValues(new Uint8Array(32));
      const iv = crypto.getRandomValues(new Uint8Array(12));

      const encryptedContent = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        await crypto.subtle.importKey('raw', encryptionKey, { name: 'AES-GCM' }, false, ['encrypt']),
        fileContent
      );

      const encryptedData = new Uint8Array(iv.length + encryptedContent.byteLength);
      encryptedData.set(iv, 0);
      encryptedData.set(new Uint8Array(encryptedContent), iv.length);

      // Simulate storing the encrypted document
      setEncryptedDoc({ id: 'document-id', data: encryptedData });
    } catch (error) {
      console.error('Error encrypting and storing document:', error);
      setAlertMessage('Failed to encrypt and store document. Please try again.');
    }
  };

  return (
    <Box minH="100vh" color={colorMode === 'light' ? 'black' : 'white'} position="relative">
      {/* Banner */}
      <Box
        bgImage={`url(${bannerImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height={{ base: '200px', md: '300px', lg: '400px' }}
        width="100%"
      />

      {/* Main content */}
      <VStack spacing={8} align="stretch" maxW="lg" mx="auto" mt={8}>
        <Box textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">
            {APP_NAME}
          </Text>
          <Text fontSize="md" mt={2}>
            {APP_DESCRIPTION}
          </Text>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Select a document to upload</FormLabel>
            <Input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
          </FormControl>
          <Button
            onClick={handlePayment}
            colorScheme="blue"
            mt={4}
            isDisabled={!selectedFile || isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : 'Pay with Bitcoin & Upload'}
          </Button>
        </Box>

        {encryptedDoc && (
          <Alert status="success">
            <AlertIcon />
            Encrypted Document ID: {encryptedDoc.id}
          </Alert>
        )}

        {verifiableCredential && (
          <Alert status="success">
            <AlertIcon />
            Verifiable Credential Created: {JSON.stringify(verifiableCredential, null, 2)}
          </Alert>
        )}

        {alertMessage && (
          <Alert status="info">
            <AlertIcon />
            {alertMessage}
          </Alert>
        )}

        <Button onClick={toggleColorMode} alignSelf="center" mt={4}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </VStack>

      {/* Additional content */}
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
        <button className="upload-button" onClick={encryptAndUploadDocument}>Upload and Encrypt</button>
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
    </Box>
  );
};

// Ensure the default export
export default AppContent;
