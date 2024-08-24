import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Image,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
  AspectRatio,
} from '@chakra-ui/react';
import bannerImage from './LeetMigo_banner_main_01.png';

const AppContent = () => {
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const widgetRef = useRef(null);

  const handleGdprAccept = () => {
    setGdprAccepted(true);
    localStorage.setItem('gdprAccepted', 'true');
  };

  useEffect(() => {
    const accepted = localStorage.getItem('gdprAccepted');
    if (accepted) setGdprAccepted(true);
  }, []);

  useEffect(() => {
    if (!widgetRef.current) {
      const script = document.createElement('script');
      script.src = 'https://getlaunchlist.com/js/widget.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.LaunchListWidget) {
          window.LaunchListWidget.init();
          widgetRef.current = true;
        }
      };
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  // Set a consistent max width for all buttons
  const buttonSizeProps = { width: '100%', maxW: { base: '100%', md: '300px' } };

  return (
    <Box minH="100vh" color="white" bg="gray.900" position="relative">
      <Container maxW="container.md" pt={8} px={{ base: 4, md: 8 }} pb={16}>
        <VStack spacing={8} align="center" justify="center">
          
          {/* LeetMigo Header and Description */}
          <Box textAlign="center">
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" lineHeight="shorter">
              LeetMigo 👾
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} mt={4} lineHeight="tall">
              the world's first decentralized platform for dsa interview prep, made for non-trad, cracked techies and frens
            </Text>
          </Box>

          {/* Banner Image with Aspect Ratio */}
          <AspectRatio ratio={16 / 9} width="100%" maxW="800px" borderRadius="md">
            <Image 
              src={bannerImage} 
              alt="LeetMigo Banner" 
              objectFit="cover" 
              loading="lazy"
            />
          </AspectRatio>

          {/* Waitlist Form (GetLaunchList Widget) */}
          <Box width="100%" maxW="400px">
            <div className="launchlist-widget" data-key-id="pI1JRr" data-height="180px"></div>
          </Box>

          {/* Free LeetCode Grind 75 Study Spreadsheet Button */}
          <Button 
            as="a" 
            href="https://docs.google.com/spreadsheets/d/1v0OCKeLa9q8douuR6RQmQ5mOG2piThh50wuGA79g2SY/edit?usp=sharing" 
            variant="outline"
            colorScheme="blue"
            size="lg" 
            target="_blank" 
            rel="noopener noreferrer" 
            {...buttonSizeProps}
          >
            Free LeetCode Grind 75 Study Spreadsheet
          </Button>

          {/* Features Coming Soon */}
          <VStack align="center" spacing={4} width="100%">
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              features coming soon:
            </Text>
            <HStack spacing={4} justify="center" width="100%">
              <Button variant="outline" colorScheme="blue" {...buttonSizeProps}>
                learn
              </Button>
              <Button variant="outline" colorScheme="blue" {...buttonSizeProps}>
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

export { AppContent as default };
