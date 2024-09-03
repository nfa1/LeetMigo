import React, { useState, useEffect } from 'react';
import { 
  Box, Button, VStack, Text, useToast, Spinner, useClipboard, 
  FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';

const Web5Login = () => {
  const [web5Data, setWeb5Data] = useState({ did: '', bearerDid: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [web5Instance, setWeb5Instance] = useState(null);
  const [savedDid, setSavedDid] = useState('');
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(web5Data.did);

  useEffect(() => {
    const initWeb5 = async () => {
      try {
        const { web5 } = await Web5.connect({
          password: process.env.REACT_APP_WEB5_PASSWORD,
        });
        setWeb5Instance(web5);
        
        // Check for saved DID in localStorage
        const storedDid = localStorage.getItem('userDid');
        if (storedDid) {
          setSavedDid(storedDid);
        }
      } catch (error) {
        console.error('Error initializing Web5:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize Web5. Please check console for details.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    initWeb5();
  }, [toast]);

  const generateDid = async () => {
    if (!web5Instance) {
      toast({
        title: 'Error',
        description: 'Web5 is not initialized yet. Please try again in a moment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
      
      // Save DID to localStorage
      localStorage.setItem('userDid', aliceDid.uri);
  
      toast({
        title: 'Login Successful',
        description: 'Your new DID has been generated and saved.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error in generateDid:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate DID. Please check console for details.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginWithSavedDid = async () => {
    setIsLoading(true);
    try {
      // Here you would typically verify the DID or perform any necessary authentication
      // For this example, we'll just set it as the current DID
      setWeb5Data({ did: savedDid, bearerDid: '' });
      toast({
        title: 'Login Successful',
        description: 'You have logged in with your saved DID.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error logging in with saved DID:', error);
      toast({
        title: 'Error',
        description: 'Failed to log in with saved DID. Please try generating a new one.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%" bg="gray.800" p={4} borderRadius="md" mt={8} textAlign="center">
      <VStack spacing={6} align="center">
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

        <Text fontSize="md" color="gray.400" mt={4}>
          Your DID is saved automatically. You can use it to log in instantly in future sessions.
        </Text>
      </VStack>
    </Box>
  );
};

export default Web5Login;
