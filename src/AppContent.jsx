import React, { useState, useEffect } from 'react';
import {
  Box, Button, VStack, Text, useToast, Spinner, useClipboard, Container,
  Image, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Heading, Flex, Input
} from '@chakra-ui/react';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import axios from 'axios';

const Web5Login = () => {
  const [web5Data, setWeb5Data] = useState({ did: '', bearerDid: '' });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(web5Data.did);

  useEffect(() => {
    const initWeb5 = async () => {
      try {
        const { web5, did } = await Web5.connect();
        setWeb5Data({ did, bearerDid: did });
      } catch (error) {
        toast({
          title: 'Web5 initialization failed',
          description: 'Unable to connect to Web5. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    initWeb5();
  }, [toast]);

  const generateDid = async () => {
    setIsLoading(true);
    try {
      const did = await DidDht.create();
      setWeb5Data({ did: did.uri, bearerDid: did.uri });
      toast({
        title: 'DID Generated',
        description: 'Your Decentralized ID has been created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'DID Generation Failed',
        description: 'Unable to generate a new DID. Please try again.',
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
        <Image src="/LeetMigo_banner_main_01.png" alt="LeetMigo Banner" width="200px" />
        <Text fontSize="2xl" fontWeight="bold" color="orange.300">
          Web5 Instant Login - No Cap, Just Facts 💯
        </Text>
        <Button
          colorScheme="blue"
          onClick={generateDid}
          isLoading={isLoading}
          loadingText="Generating DID..."
          width="100%"
          maxW="300px"
        >
          {web5Data.did ? 'Regenerate DID' : 'Get Your Decentralized ID'}
        </Button>
        {web5Data.did && (
          <DIDDisplay did={web5Data.did} onCopy={onCopy} hasCopied={hasCopied} />
        )}
        <Text fontSize="md" color="gray.400" mt={4}>
          Your DID is your digital flex. It’s like your aura, but decentralized, fr.
        </Text>
      </VStack>
    </Box>
  );
};

const DIDDisplay = ({ did, onCopy, hasCopied }) => (
  <Box>
    <Text fontSize="sm" mb={2}>Your Decentralized ID:</Text>
    <Flex align="center" justify="center">
      <Text isTruncated maxW="200px" mr={2}>{did || "No DID available"}</Text>
      <Button onClick={onCopy} ml={2}>
        {hasCopied ? 'Copied!' : 'Copy'}
      </Button>
    </Flex>
  </Box>
);

const AIProgrammingPair = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Button onClick={() => setIsOpen(true)} colorScheme="purple">
        Chat with AI Pair Programmer
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Pair Programmer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your programming question..."
            />
            {response && (
              <Text mt={4} fontWeight="bold">
                AI Response: <Text fontWeight="normal">{response}</Text>
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
              Send
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const WaitlistForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://getlaunchlist.com/js/widget-diy.js';
    script.defer = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <Box maxW="500px" bg="gray.800" p={6} borderRadius="md" boxShadow="xl">
      <Heading size="lg" mb={4}>Join the LeetMigo Waitlist ⬇️</Heading>
      <form action="https://getlaunchlist.com/s/pI1JRr" method="POST">
        <VStack spacing={4}>
          <Input name="name" placeholder="Enter your name or tpot username" />
          <Input name="email" type="email" placeholder="Drop your email here" required />
          <Button type="submit" colorScheme="blue" width="100%">
            Let’s goooo! 🚀
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const AppContent = () => {
  return (
    <Box minH="100vh" bg="gray.900" color="white" pt={8}>
      <Container maxW="container.xl">
        <Flex direction="column" align="center">
          <Heading as="h1" size="2xl" mb={4}>LeetMigo 👾</Heading>
          <Text fontSize="xl" mb={6}>
            The world’s first decentralized platform for DSA prep, made for non-trad techies and frens.
          </Text>
        </Flex>
      </Container>

      <Container maxW="container.lg" pt={8}>
        <VStack spacing={8}>
          <WaitlistForm />
          <Web5Login />
          <AIProgrammingPair />
        </VStack>
      </Container>
    </Box>
  );
};

export default AppContent;
