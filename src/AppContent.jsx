import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
  AspectRatio,
  Input,
  FormControl,
  FormLabel,
  Link,
  Grid,
  GridItem,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import bannerImage from './LeetMigo_banner_main_01.png';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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
    <Box width="100%" bg="gray.800" p={4} borderRadius="md" mt={8}>
      <VStack spacing={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          AI-Powered Learning
        </Text>

        <FormControl id="prompt">
          <FormLabel>Enter your DSA problem:</FormLabel>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your DSA problem here..."
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handlePromptSubmit} isDisabled={loading}>
          {loading ? <Spinner /> : 'Get AI Help'}
        </Button>

        {response && (
          <Box bg="gray.700" p={4} borderRadius="md" width="100%">
            <Text>{response}</Text>
          </Box>
        )}

        <Button
          colorScheme="orange"
          onClick={handlePayment}
          isDisabled={paymentLoading}
        >
          {paymentLoading ? <Spinner /> : 'Pay with Bitcoin'}
        </Button>
      </VStack>
    </Box>
  );
};

// AppContent Component
const AppContent = () => {
  const [referralCode] = useState(uuidv4());
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
    _hover: { bg: "blue.600" },
    _active: { bg: "blue.700" },
  };

  return (
    <Box minH="100vh" color="white" bg="gray.900">
      <Box as="header" bg="gray.800" py={4} px={4}>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" textAlign="center">
          LeetMigo 👾 - Decentralized DSA Interview Prep
        </Text>
      </Box>

      <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }} pt={8} px={4} pb={24}>
        <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="center" justify="center">

          <Box width="100%" overflow="hidden" borderRadius="md">
            <AspectRatio ratio={{ base: 16 / 9, md: 21 / 9 }}>
              <Image 
                src={bannerImage} 
                alt="LeetMigo Banner" 
                objectFit="cover" 
                objectPosition="center"
                width="100%" 
                height="100%"
              />
            </AspectRatio>
          </Box>

          <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} textAlign="center" mt={{ base: 2, md: 4 }}>
            Yo, weebs and tech otakus! Join the waitlist for LeetMigo - your AI-powered LeetCode sidekick! 🚀🎮
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={{ base: 4, md: 6, lg: 8 }} width="100%">
            {[
              { title: "💾 Secure Local Storage", desc: "Your data's safer than your mom's secret cookie recipe, fr. Passwordless login, cuz who's got time for that?" },
              { title: "💰 Pay with Bitcoin", desc: "Flex on 'em with crypto. We're so web3, even your wallet's feeling FOMO." },
              { title: "🤝 Collab with Cracked Techies", desc: "Squad up with fellow 10x devs. It's like Discord, but for big brain energy only." },
              { title: "🤖 AI-Powered Learning", desc: "Your personal 1000x aura software engineer. It's like having Linus Torvalds in your pocket, but with gigachad rizz." },
            ].map((item, index) => (
              <GridItem key={index}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {item.title}
                </Text>
                <Text fontSize="md">
                  {item.desc}
                </Text>
              </GridItem>
            ))}
          </Grid>

          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" textAlign="center" mt={4}>
            Sign up now for free early access! 🚀
          </Text>

          <Box width="100%" maxW="400px" mt={4}>
            <form className="launchlist-form" action="https://getlaunchlist.com/s/pI1JRr" method="POST" onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="name">
                  <FormLabel>Your Tag</FormLabel>
                  <Input name="name" type="text" placeholder="Enter your name/tpot username" />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" placeholder="Drop your email here" required />
                </FormControl>
                <Button type="submit" fontSize={{ base: "md", md: "lg" }} py={{ base: 6, md: 8 }} {...commonButtonStyles}>
                  Let's Goooo! 🔥
                </Button>
              </VStack>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Free leetcode resource for the squad:
            </Text>
            <Link
              href="https://www.techinterviewhandbook.org/grind75?hours=40&weeks=8"
              isExternal
              color="blue.300"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
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
            </Text>
            . 
          </Text>

          <AIProgrammingPair /> {/* Integrated Component */}

        </VStack>
      </Container>

      <Modal isOpen={isPrivacyModalOpen} onClose={handleClosePrivacyModal}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white" maxW={{ base: "90%", md: "600px" }}>
          <ModalHeader fontSize={{ base: "lg", md: "xl" }}>Privacy Stuff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Yo, this is where we'd spill the tea on our privacy policy. We'll update this with the real deal soon. Stay tuned!
            </Text>
          </ModalBody>
          <ModalFooter>
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
