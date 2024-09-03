import React, { useState, useEffect } from 'react';
import { 
  Box, Button, VStack, Text, useToast, Spinner, useClipboard, Container, 
  FormControl, FormLabel, Input, Grid, GridItem, AspectRatio, Link, Modal, 
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, 
  Heading, Flex 
} from '@chakra-ui/react';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import axios from 'axios';

// Polyfill for process.nextTick
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    nextTick: (callback) => {
      setTimeout(callback, 0);
    },
  };
}

// Secure Password Configuration for Web5 Instance
const configureWeb5 = async () => {
  try {
    const { web5 } = await Web5.connect({
      password: 'your-secure-unique-password', // Set a secure and unique password here
    });
    return web5;
  } catch (error) {
    throw new Error('Failed to configure Web5: ' + error.message);
  }
};

// DIDDisplay Component
const DIDDisplay = ({ did, onCopy, hasCopied }) => (
  <Box bg="gray.700" p={4} borderRadius="md" width="100%" textAlign="center">
    <Text fontSize={{ base: "md", md: "lg" }} mb={2} color="white">Your DID:</Text>
    <Text fontSize="md" wordBreak="break-all" mb={2} color="blue.300">{did}</Text>
    <Button colorScheme="orange" onClick={onCopy} aria-label="Copy DID to Clipboard" width="100%" maxW="300px" mx="auto">
      {hasCopied ? 'DID Copied!' : 'Copy DID to Clipboard'}
    </Button>
  </Box>
);

// Web5Login Component
const Web5Login = () => {
  const [web5Data, setWeb5Data] = useState({ did: '', bearerDid: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [web5Instance, setWeb5Instance] = useState(null);
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(web5Data.did);

  useEffect(() => {
    const initWeb5 = async () => {
      try {
        const web5 = await configureWeb5();
        setWeb5Instance(web5);
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
      const dhtDid = await DidDht.create();
      const aliceDid = await web5Instance.did.create('key');

      setWeb5Data({
        did: aliceDid.uri,
        bearerDid: dhtDid.uri,
      });

      toast({
        title: 'Login Successful',
        description: 'Your new DID has been generated.',
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

  return (
    <Box width="100%" bg="gray.800" p={4} borderRadius="md" mt={8} textAlign="center">
      <VStack spacing={6} align="center">
        <Text fontSize="2xl" fontWeight="bold" color="orange.300">
          Web5 Instant Login
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
            {web5Data.did ? 'Regenerate DID' : 'Login with Web5'}
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

        {web5Data.bearerDid && (
          <Box bg="gray.700" p={4} borderRadius="md" width="100%" textAlign="center">
            <Text fontSize="lg" mb={2} color="white">Your Bearer DID:</Text>
            <Text fontSize="md" wordBreak="break-all" mb={2} color="blue.300">
              {web5Data.bearerDid}
            </Text>
            <Button colorScheme="orange" onClick={onCopy} aria-label="Copy Bearer DID to Clipboard" width="100%" maxW="300px" mx="auto">
              {hasCopied ? 'Bearer DID Copied!' : 'Copy Bearer DID to Clipboard'}
            </Button>
          </Box>
        )}

        <Text fontSize="md" color="gray.400" mt={4}>
          A DID (Decentralized Identifier) is a unique identifier that enables you to have control over your own data.
        </Text>
      </VStack>
    </Box>
  );
};

// AIProgrammingPair Component
const AIProgrammingPair = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const toast = useToast();

  const handlePromptSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/ai', { prompt });
      setResponse(res.data.response);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not get a response from the AI',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const res = await axios.post('/api/pay', {
        amount: 0.001, // Example amount in BTC
        walletAddress: 'your-bitcoin-wallet-address-here',
      });
      toast({
        title: 'Payment Successful',
        description: `Transaction ID: ${res.data.transactionId}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Payment failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <Box width="100%" bg="gray.800" p={4} borderRadius="md" mt={8} textAlign="center">
      <VStack spacing={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">🤖 AI-Powered Learning</Text>

        <FormControl id="prompt" width="100%" textAlign="center">
          <FormLabel textAlign="center">Enter your DSA problem:</FormLabel>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your DSA problem here..."
            width="100%"
            maxW="300px"
            mx="auto"
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handlePromptSubmit} isDisabled={loading} width="100%" maxW="300px" mx="auto">
          {loading ? <Spinner /> : 'Get AI Help'}
        </Button>

        {response && (
          <Box bg="gray.700" p={4} borderRadius="md" width="100%" maxW="300px" wordBreak="break-word" mx="auto">
            <Text>{response}</Text>
          </Box>
        )}

        <Button
          colorScheme="orange"
          onClick={handlePayment}
          isDisabled={paymentLoading}
          width="100%"
          maxW="300px"
          mx="auto"
        >
          {paymentLoading ? <Spinner /> : 'Pay with Bitcoin 💰'}
        </Button>
      </VStack>
    </Box>
  );
};

// AppContent Component
const AppContent = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const toast = useToast();

  const handlePrivacyClick = () => setIsPrivacyModalOpen(true);
  const handleClosePrivacyModal = () => setIsPrivacyModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    toast({
      title: "You're in the squad!",
      description: "Welcome aboard! We'll hit you up soon.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const commonButtonStyles = {
    colorScheme: "blue",
    width: "100%",
    maxW: "300px",
    fontSize: { base: "md", md: "lg" },
    _hover: { bg: "blue.600" },
    _active: { bg: "blue.700" },
    mx: "auto", 
  };

  return (
    <Box minH="100vh" color="white" bg="gray.900" textAlign="center" overflowY="auto" overflowX="hidden" pt={{ base: 8, md: 12 }}>
      <Flex as="header" bg="gray.800" py={8} px={4} align="center" justify="center" direction="column" minH={{ base: "35vh", md: "40vh" }} flexShrink="0"> 
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" textAlign="center">
          LeetMigo 👾 - Decentralized DSA Interview Prep
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mt={4} textAlign="center" px={{ base: 4, md: 8 }}>
          Join the revolution of decentralized, AI-powered learning to prepare for your coding interviews.
        </Text>
      </Flex>

      <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }} pt={8} px={4} pb={24} textAlign="center" flexGrow="1"> 
        <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="center" justify="center">

          <Box width="100%" overflow="hidden" borderRadius="md" textAlign="center">
            <AspectRatio ratio={{ base: 16 / 9, md: 21 / 9 }}>
              <Box bg="gray.600" width="100%" height="100%" />
            </AspectRatio>
          </Box>

          <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} textAlign="center" mt={{ base: 2, md: 4 }}>
            Yo, weebs and tech otakus! Join the waitlist for LeetMigo - your AI-powered LeetCode sidekick! 🚀🎮
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 4, md: 6, lg: 8 }} width="100%" textAlign="center">
            <GridItem>
              <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">💾 Secure Local Storage</Text>
              <Text fontSize="md" textAlign="center">
                Your data's safer than your mom's secret cookie recipe, fr. Passwordless login, cuz who's got time for that?
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">💰 Pay with Bitcoin</Text>
              <Text fontSize="md" textAlign="center">
                Flex on 'em with crypto. We're so web3, even your wallet's feeling FOMO.
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">🤝 Collab with Cracked Techies</Text>
              <Text fontSize="md" textAlign="center">
                Squad up with fellow 10x devs. It's like Discord, but for big brain energy only.
              </Text>
            </GridItem>
            <GridItem>
              <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">🤖 AI-Powered Learning</Text>
              <Text fontSize="md" textAlign="center">
                Your personal 1000x aura software engineer. It's like having Linus Torvalds in your pocket, but with gigachad rizz.
              </Text>
            </GridItem>
          </Grid>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" textAlign="center" mt={4}>
            Sign up now for free early access! 🚀
          </Text>

          <Box width="100%" maxW="300px" mt={4} textAlign="center">
            <form className="launchlist-form" action="https://getlaunchlist.com/s/pI1JRr" method="POST" onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="name">
                  <FormLabel>Your Tag</FormLabel>
                  <Input name="name" type="text" placeholder="Enter your name/tpot username" width="100%" mx="auto" />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" placeholder="Drop your email here" required width="100%" mx="auto" />
                </FormControl>
                <Button type="submit" {...commonButtonStyles}>
                  Let's Goooo! 🔥
                </Button>
              </VStack>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg" fontWeight="bold" mb={2}>Free leetcode resource for the squad:</Text>
            <Link
              href="https://www.techinterviewhandbook.org/grind75?hours=40&weeks=8"
              color="blue.300"
              fontWeight="bold"
              isExternal
              _hover={{ textDecoration: "underline" }}
              wordBreak="break-word"
              textAlign="center"
            >
              LeetCode Grind 75 Spreadsheet 📊
            </Link>
          </Box>

          <Text fontSize="sm" textAlign="center" mt={4}>
            By joining the squad, you're cool with our{' '}
            <Text
              as="span"
              color="blue.300"
              cursor="pointer"
              onClick={handlePrivacyClick}
            >
              privacy stuff
            </Text>.
          </Text>

          <Web5Login /> {/* Integrated Web5 Login Component */}
          <AIProgrammingPair /> {/* Integrated AI Programming Pair Component */}

        </VStack>
      </Container>

      <Modal isOpen={isPrivacyModalOpen} onClose={handleClosePrivacyModal}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white" maxW={{ base: "90%", md: "600px" }} textAlign="center">
          <ModalHeader fontSize={{ base: "lg", md: "xl" }} textAlign="center">Privacy Stuff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="center">
              Yo, this is where we'd spill the tea on our privacy policy. We'll update this with the real deal soon. Stay tuned!
            </Text>
          </ModalBody>
          <ModalFooter textAlign="center">
            <Button colorScheme="blue" mr={3} onClick={handleClosePrivacyModal}>
              Bet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppContent;
