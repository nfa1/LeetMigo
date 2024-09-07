import React, { useState, useEffect } from 'react';
import {
  Box, Button, VStack, Text, useToast, Spinner, useClipboard, Container,
  FormControl, FormLabel, Input, Link, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, ModalCloseButton, Heading, Flex, Image, Textarea, Select, Checkbox
} from '@chakra-ui/react';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import axios from 'axios';

const Web5Login = () => {
  const [web5Data, setWeb5Data] = useState({ did: '', bearerDid: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [web5Instance, setWeb5Instance] = useState(null);
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(web5Data.did);

  useEffect(() => {
    const initWeb5 = async () => {
      try {
        const { web5, did } = await Web5.connect();
        setWeb5Instance(web5);
        setWeb5Data({ did, bearerDid: did });
      } catch (error) {
        console.error('Failed to initialize web5:', error);
        toast({
          title: 'web5 initialization failed',
          description: 'unable to connect to web5. Please try again later.',
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
        description: 'your decentralized ID has been created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('failed to generate DID:', error);
      toast({
        title: 'DID Generation Failed',
        description: 'unable to generate a new DID. please try again.',
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
        <Image src="/LeetMigo_banner_main_01.png" alt="LeetMigo Banner" width="200px" height="auto" />
        <Text fontSize="2xl" fontWeight="bold" color="orange.300">
          web5 instant login - no cap, just facts 💯
        </Text>
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
            {web5Data.did ? 'Regenerate DID' : 'Get Your Decentralized ID'}
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
          <DIDDisplay did={web5Data.did} onCopy={onCopy} hasCopied={hasCopied} />
        )}
        <Text fontSize="md" color="gray.400" mt={4}>
          your DID is your digital flex. it's like your aura, but decentralized, fr.
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
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Button onClick={() => setIsOpen(true)} colorScheme="purple" variant="solid">
        chat with ai pair programmer
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>aI pair programmer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your programming question..."
            />
            {response && (
              <Text mt={4} fontWeight="bold">
                AI Response:
                <Text fontWeight="normal">{response}</Text>
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Send
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              close
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

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box width="100%" maxW="500px" bg="gray.800" p={6} borderRadius="md" boxShadow="xl">
      <Heading size="lg" mb={4}>Join the LeetMigo Waitlist ⬇️</Heading>
      {/* LaunchList Form */}
      <form className="launchlist-form" action="https://getlaunchlist.com/s/pI1JRr" method="POST">
        <VStack spacing={4}>
          <Input name="name" placeholder="enter your name or tpot username" />
          <Input name="email" type="email" placeholder="drop your email here" required />
          <Button type="submit" colorScheme="blue" width="100%">
            let's goooo! 🚀
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const AppContent = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handlePrivacyClick = () => {
    setIsPrivacyOpen(true);
  };

  return (
    <Box minH="100vh" color="white" bg="gray.900" textAlign="center" overflowY="auto" overflowX="hidden" pt={{ base: 8, md: 12 }}>
      <Container maxW="container.xl">
        <Flex direction="column" align="center">
          <Heading as="h1" size="2xl" mb={4}>
            LeetMigo 👾
          </Heading>
          <Text fontSize="xl" mb={6}>
            the world's first decentralized platform for dsa prep, made for non-trad techies and frens
          </Text>
        </Flex>
      </Container>

      <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }} pt={8} px={4} pb={24} textAlign="center" flexGrow="1">
        <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="center" justify="center">
          <WaitlistForm />

          <Web5Login />
          <AIProgrammingPair />

          <Box textAlign="center">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              free leetcode resource for the squad:
            </Text>
            <Link
              href="https://www.techinterviewhandbook.org/grind75?hours=40&weeks=8"
              color="blue.300"
              fontWeight="bold"
              isExternal
              _hover={{ textDecoration: "underline" }}
            >
              grind 75 spreadsheet 📊
            </Link>
          </Box>

          <Text fontSize="sm" textAlign="center" mt={4}>
            by joining gang, you're cool with our{' '}
            <Text
              as="span"
              color="blue.300"
              cursor="pointer"
              onClick={handlePrivacyClick}
            >
              privacy stuff
            </Text>
            .
          </Text>
        </VStack>
      </Container>

      <Modal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>privacy policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              we respect your privacy and are committed to protecting it through our compliance with this policy.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsPrivacyOpen(false)}>
              close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppContent;
