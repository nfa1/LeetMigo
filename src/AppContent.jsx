import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import bannerImage from './LeetMigo_banner_main_01.png';
import { v4 as uuidv4 } from 'uuid';

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

      <Container maxW="container.md" pt={8} px={4} pb={24}>
        <VStack spacing={8} align="center" justify="center">
        <Box width="100%" overflow="hidden" borderRadius="md" maxH={{ base: "200px", md: "300px" }}>
          <Image 
            src={bannerImage} 
            alt="LeetMigo Banner" 
            objectFit="cover" 
            objectPosition="center center"
            width="100%" 
            height="100%"
          />
        </Box>


          <Text fontSize={{ base: "lg", md: "xl" }} textAlign="center">
            Yo, weebs and tech otakus! Join the waitlist for LeetMigo - your AI-powered LeetCode sidekick! 🚀🎮
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} width="100%">
            {[
              { title: "💾 Secure Local Storage", desc: "No cap, your data's safer than your mom's secret cookie recipe. Passwordless login, 'cause who's got time for that?" },
              { title: "💰 Pay with Bitcoin", desc: "Flex on 'em with crypto. We're so web3, even your wallet's feeling FOMO." },
              { title: "🤝 Collab with Cracked Techies", desc: "Squad up with fellow 10x devs. It's like Discord, but for big brain energy only." },
              { title: "🤖 AI-Powered Learning", desc: "Your personal 1000x aura software engineer. It's like having Linus Torvalds in your pocket, but cooler." },
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
                  <Input name="name" type="text" placeholder="Enter your username" />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" placeholder="Drop your email here" required />
                </FormControl>
                <Button type="submit" {...commonButtonStyles}>
                  Let's Goooo! 🔥
                </Button>
              </VStack>
            </form>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Free resource for the squad:
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
            . No cap.
          </Text>
        </VStack>
      </Container>

      <Modal isOpen={isPrivacyModalOpen} onClose={handleClosePrivacyModal}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Privacy Stuff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Yo, this is where we'd spill the tea on our privacy policy. We'll update this with the real deal soon. Stay tuned!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClosePrivacyModal}>
              Aight, got it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppContent;
