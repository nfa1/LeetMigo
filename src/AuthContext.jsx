import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Button, VStack, Text, useToast, Spinner, useClipboard, 
  Image
} from '@chakra-ui/react';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import * as CryptoJS from 'crypto-js'; // For encryption

const Web5Login = () => {
  const [web5Data, setWeb5Data] = useState({ did: '', bearerDid: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [web5Instance, setWeb5Instance] = useState(null);
  const [savedDid, setSavedDid] = useState('');
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(web5Data.did);

  const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

  // Encrypt the DID before storing it
  const encryptDid = (did) => {
    return CryptoJS.AES.encrypt(did, ENCRYPTION_KEY).toString();
  };

  // Decrypt the DID when retrieving it
  const decryptDid = (encryptedDid) => {
    const bytes = CryptoJS.AES.decrypt(encryptedDid, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const showToast = useCallback((title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  }, [toast]);

  useEffect(() => {
    const initWeb5 = async () => {
      try {
        const { web5 } = await Web5.connect({
          password: process.env.REACT_APP_WEB5_PASSWORD,
        });
        setWeb5Instance(web5);
        
        const storedDid = localStorage.getItem('userDid');
        if (storedDid) {
          const decryptedDid = decryptDid(storedDid);
          setSavedDid(decryptedDid);
        }
      } catch (error) {
        console.error('Error initializing Web5:', error);
        showToast('Error', 'Failed to initialize Web5. Please check console for details.', 'error');
      }
    };
    initWeb5();
  }, [showToast]);

  const generateDid = async () => {
    if (!web5Instance) {
      showToast('Error', 'Web5 is not initialized yet. Please try again in a moment.', 'error');
      return;
    }
  
    setIsLoading(true);
    try {
      const { did: aliceDid } = await web5Instance.did.create('key');
      const dhtDid = await DidDht.create();
  
      const newWebData = {
        did: aliceDid.uri,
        bearerDid: dhtDid.uri,
      };
  
      setWeb5Data(newWebData);
      const encryptedDid = encryptDid(aliceDid.uri);
      localStorage.setItem('userDid', encryptedDid);
  
      showToast('Login Successful', 'Your new DID has been generated and saved.', 'success');
    } catch (error) {
      console.error('Error in generateDid:', error);
      showToast('Error', 'Failed to generate DID. Please check console for details.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginWithSavedDid = async () => {
    setIsLoading(true);
    try {
      setWeb5Data({ did: savedDid, bearerDid: '' });
      showToast('Login Successful', 'You have logged in with your saved DID.', 'success');
    } catch (error) {
      console.error('Error logging in with saved DID:', error);
      showToast('Error', 'Failed to log in with saved DID. Please try generating a new one.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%" bg="gray.800" p={4} borderRadius="md" mt={8} textAlign="center">
      <VStack spacing={6} align="center">
        <Image src="/LeetMigo_banner_main_01.png" alt="LeetMigo Banner" width="200px" height="auto" />

        <Text fontSize="2xl" fontWeight="bold" color="orange.300">
          Web5 Instant Login
        </Text>
        
        {savedDid && !web5Data.did && (
          <Box>
            <Text fontSize="md" mb={2}>You have a saved DID. Would you like to use it?</Text>
            <Button
              colorScheme="green"
              onClick={loginWithSavedDid}
              isLoading={isLoading}
              loadingText="Logging in..."
              width="100%"
              maxW="300px"
              mx="auto"
              mb={4}
            >
              Login with Saved DID
            </Button>
          </Box>
        )}
        
        <Box position="relative" width="100%">
          <Button
            colorScheme="blue"
            onClick={generateDid}
            isLoading={isLoading}
            loadingText="Generating DID..."
            disabled={isLoading}
            width="100%"
            maxW="300px"
            mx="auto"
          >
            {web5Data.did ? 'Regenerate DID' : 'Generate New DID'}
          </Button>
          {isLoading && (
            <Spinner
              size="xl"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex="1"
            />
          )}
        </Box>

        {web5Data.did && (
          <Box bg="gray.700" p={4} borderRadius="md" width="100%" textAlign="center">
            <Text fontSize="lg" mb={2} color="white">Your DID:</Text>
            <Text fontSize="md" wordBreak="break-all" mb={2} color="blue.300">{web5Data.did}</Text>
            <Button colorScheme="orange" onClick={onCopy} width="100%" maxW="300px" mx="auto">
              {hasCopied ? 'DID Copied!' : 'Copy DID to Clipboard'}
            </Button>
          </Box>
        )}

      </VStack>
    </Box>
  );
};

export default Web5Login;