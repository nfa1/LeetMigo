import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Input,
  Image,
  Collapse,
  HStack,
} from '@chakra-ui/react';
import bannerImage from './LeetMigo_banner_main_01.png';

const AppContent = () => {
  const [email, setEmail] = useState('');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGdprAccept = () => {
    setGdprAccepted(true);
  };

  return (
    <Box minH="100vh" color="white" bg="gray.900" position="relative">
      <VStack spacing={8} align="center" justify="center" maxW="lg" mx="auto" mt={8} px={4}>
        
        {/* LeetMigo Header and Description */}
        <Box textAlign="center" mb={4}>
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
            LeetMigo 👾
          </Text>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            the world's first decentralized platform for dsa interview prep, made for non-trad, cracked techies and frens
          </Text>
        </Box>

        {/* Banner Image */}
        <Box width="100%" mb={8}>
          <Image src={bannerImage} alt="LeetMigo Banner" width="100%" objectFit="cover" maxH="300px" />
        </Box>

        {/* Waitlist Form */}
        <Box width="100%" textAlign="center">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            join the waitlist for free early access
          </Text>
          <form action="https://getlaunchlist.com/s/pI1JRr" method="POST">
            <Input
              type="text"
              name="name"
              placeholder="your name"
              textAlign="center"
              mb={4}
              color="black"
            />
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              required
              textAlign="center"
              mb={4}
              color="black"
            />
            <Button type="submit" width="auto" colorScheme="blue" mx="auto">
              sign up
            </Button>
          </form>
        </Box>

        {/* Features Coming Soon */}
        <VStack align="center" mt={8}>
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

      {/* GDPR Banner */}
      {!gdprAccepted && (
        <Box
          position="fixed"
          bottom={0}
          width="100%"
          bg="orange.400"
          color="gray.800"
          py={3}
          textAlign="center"
          zIndex={1000}
        >
          <Text mb={2}>we use cookies for a based experience. continue to use this site and we'll assume you think it's kino.</Text>
          <Button size="sm" colorScheme="gray" mr={2} onClick={handleGdprAccept}>
            ok
          </Button>
          <Button size="sm" colorScheme="gray" mr={2} onClick={() => alert('please accept the gdpr terms (grudgingly).')}>
            no
          </Button>
          <Button size="sm" colorScheme="gray" variant="outline" onClick={() => setShowPrivacyPolicy(true)}>
            privacy policy
          </Button>
        </Box>
      )}

      {/* Privacy Policy Section */}
      <Collapse in={showPrivacyPolicy} animateOpacity>
        <Box
          bg="gray.700"
          color="white"
          p={4}
          mt={4}
          borderRadius="md"
          maxW="lg"
          mx="auto"
          textAlign="center"
        >
          <Text fontSize="lg" fontWeight="bold">
            Privacy Policy
          </Text>
          {/* Add your privacy policy content here */}
          <Button mt={4} onClick={() => setShowPrivacyPolicy(false)} style={{ margin: '0 auto' }}>
            Close
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default AppContent;
