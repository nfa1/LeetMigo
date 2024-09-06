import React, { useState, useEffect } from 'react';
import { 
  Box, Button, VStack, Text, useToast, Spinner, useClipboard, Container, 
  FormControl, FormLabel, Input, Grid, GridItem, AspectRatio, Link, Modal, 
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, 
  Heading, Flex, Image
} from '@chakra-ui/react';
import { Web5 } from '@web5/api';
import { DidDht } from '@web5/dids';
import axios from 'axios';

// Adjusted image path for proper loading
const DIDDisplay = ({ did, onCopy, hasCopied }) => (
  <Box>
    <Text fontSize="sm" mb={2}>Your Decentralized ID:</Text>
    <Flex align="center" justify="center">
      <Text isTruncated maxW="200px" mr={2}>{did || "No DID available"}</Text> {/* Fallback for missing DID */}
      <Button onClick={onCopy} ml={2}>
        {hasCopied ? 'Copied!' : 'Copy'}
      </Button>
    </Flex>
  </Box>
);

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
        console.error('Failed to initialize Web5:', error);
        toast({
          title: 'Web5 Initialization Failed',
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
      console.error('Failed to generate DID:', error);
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
        <Image src="/public/LeetMigo_banner_main_01.png" alt="LeetMigo Banner" width="200px" height="auto" />

        <Text fontSize="2xl" fontWeight="bold" color="orange.300">
          Web5 Instant Login - No Cap, Just Facts 💯
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
          Your DID is your digital flex. It's like your online street cred, but decentralized. No cap.
        </Text>
      </VStack>
    </Box>
  );
};

const AIProgrammingPair = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/ai', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAnswer('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%" bg="gray.800" p={4} borderRadius="md">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel textAlign ="center">Ask your coding question:</FormLabel>
          <Input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="E.g., How do I implement a binary search?"
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit" isLoading={isLoading}>
          Get AI Help
        </Button>
      </form>
      {answer && (
        <Box mt={4}>
          <Text fontWeight="bold">AI Response:</Text>
          <Text>{answer}</Text>
        </Box>
      )}
    </Box>
  );
};

const AppContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const openModal = (problem) => {
    setSelectedProblem(problem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProblem(null);
  };

  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy' },
    { id: 2, title: 'Reverse Linked List', difficulty: 'Easy' },
    { id: 3, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium' },
    { id: 4, title: 'Merge K Sorted Lists', difficulty: 'Hard' },
  ];

  return (
    <Box minH="100vh" color="white" bg="gray.900" textAlign="center" overflowY="auto" overflowX="hidden" pt={{ base: 8, md: 12 }}>
      <Flex as="header" bg="gray.800" py={8} px={4} align="center" justify="center" direction="column" minH={{ base: "35vh", md: "40vh" }} flexShrink="0"> 
        <Image src="/public/LeetMigo_banner_main_01.png" alt="LeetMigo Banner" width="300px" height="auto" mb={4} />
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" textAlign="center">
          LeetMigo 👾 - No Cap DSA Prep
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mt={4} textAlign="center" px={{ base: 4, md: 8 }}>
          Level up your coding game with AI-powered, decentralized learning. It's not just prep, it's a vibe.
        </Text>
      </Flex>

      <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }} pt={8} px={4} pb={24} textAlign="center" flexGrow="1"> 
        <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="center" justify="center">
          <Text fontSize="xl" fontWeight="bold">
            Featured Problems
          </Text>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
            {problems.map((problem) => (
              <GridItem key={problem.id}>
                <Box
                  bg="gray.700"
                  p={4}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => openModal(problem)}
                  _hover={{ bg: "gray.600" }}
                >
                  <Text fontWeight="bold">{problem.title}</Text>
                  <Text color={problem.difficulty === 'Easy' ? 'green.300' : problem.difficulty === 'Medium' ? 'yellow.300' : 'red.300'}>
                    {problem.difficulty}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>

          <Web5Login />
          <AIProgrammingPair />

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Web3 Integration
            </Text>
            <Text>
              Connect your wallet to access exclusive content and track your progress on the blockchain.
            </Text>
            <Button mt={4} colorScheme="purple">
              Connect Wallet
            </Button>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Community Leaderboard
            </Text>
            <Text>
              Compete with other developers and showcase your problem-solving skills.
            </Text>
            <Link color="blue.300" href="#" mt={2} display="inline-block">
              View Leaderboard
            </Link>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              AI-Powered Code Review
            </Text>
            <Text>
              Get instant feedback on your solutions with our advanced AI code reviewer.
            </Text>
            <Button mt={4} colorScheme="green">
              Try AI Code Review
            </Button>
          </Box>
        </VStack>
      </Container>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>{selectedProblem?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>: {selectedProblem?.difficulty}</Text>
            <Text mt={4}>Problem description and details would go here...</Text>
            <AspectRatio ratio={16 / 9} mt={4}>
              <iframe
                title="Sample Problem Video"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                allowFullScreen
              />
            </AspectRatio>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button variant="ghost">Solve Problem</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppContent;

