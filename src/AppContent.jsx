import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Input,
  Image,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
} from '@chakra-ui/react';
import bannerImage from './LeetMigo_banner_main_01.png';

const AppContent = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    toast({
      title: "Waitlist Joined!",
      description: "You've successfully joined the waitlist.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleGdprAccept = () => {
    setGdprAccepted(true);
    localStorage.setItem('gdprAccepted', 'true');
  };

  useEffect(() => {
    const accepted = localStorage.getItem('gdprAccepted');
    if (accepted) setGdprAccepted(true);
  }, []);

  return (
    <Box minH="100vh" color="white" bg="gray.900" position="relative">
      <Container maxW="container.xl" pt={{ base: 16, md: 20 }} px={{ base: 4, md: 8 }} pb={{ base: 24, md: 20 }}>
        <VStack spacing={{ base: 8, md: 12 }} align="center" justify="center">
          
          {/* LeetMigo Header and Description */}
          <Box textAlign="center">
            <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" lineHeight="shorter">
              LeetMigo 👾
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} mt={4} lineHeight="tall">
              the world's first decentralized platform for dsa interview prep, made for non-trad, cracked techies and frens
            </Text>
          </Box>

          {/* Banner Image */}
          <Box width="100%" maxH={{ base: '200px', md: '300px', lg: '400px' }}>
            <Image 
              src={bannerImage} 
              alt="LeetMigo Banner" 
              width="100%" 
              height="auto" 
              objectFit="cover" 
              maxH="100%"
              loading="lazy"
            />
          </Box>

          {/* Waitlist Form */}
          <Box width="100%" textAlign="center">
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              join the waitlist for free early access
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="your name"
                  textAlign="center"
                  color="black"
                  required
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  textAlign="center"
                  color="black"
                  required
                />
                <Button type="submit" width="auto" colorScheme="blue">
                  sign up
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Free LeetCode Grind 75 Study Spreadsheet Button */}
          <Box textAlign="center">
            <a
              href="https://docs.google.com/spreadsheets/d/1v0OCKeLa9q8douuR6RQmQ5mOG2piThh50wuGA79g2SY/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button colorScheme="green" size="lg">
                Free LeetCode Grind 75 Study Spreadsheet
              </Button>
            </a>
          </Box>

          {/* Features Coming Soon */}
          <VStack align="center">
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              features coming soon:
            </Text>
            <HStack spacing={4} justify="center">
              <Button variant="outline" colorScheme="blue">
                learn
              </Button>
              <Button variant="outline" colorScheme="blue">
                collab
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Container>

      {/* GDPR Banner */}
      {!gdprAccepted && (
        <Box
          position="fixed"
          bottom={0}
          width="100%"
          bg="orange.400"
          color="gray.800"
          py={3}
          px={4}
          textAlign="center"
          zIndex={1000}
        >
          <Text mb={2}>we use cookies for a based experience. continue to use this site and we'll assume you think it's kino.</Text>
          <HStack spacing={2} justify="center">
            <Button size="sm" colorScheme="gray" onClick={handleGdprAccept}>
              ok
            </Button>
            <Button size="sm" colorScheme="gray" onClick={() => alert('please accept the gdpr terms (grudgingly).')}>
              no
            </Button>
            <Button size="sm" colorScheme="gray" variant="outline" onClick={() => setIsPrivacyPolicyOpen(true)}>
              privacy policy
            </Button>
          </HStack>
        </Box>
      )}

      {/* Privacy Policy Modal */}
      <Modal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Add your privacy policy content here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsPrivacyPolicyOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppContent;
