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
  Spinner,
  useClipboard,
} from '@chakra-ui/react';
import bannerImage from './LeetMigo_banner_main_01.png';
import { v4 as uuidv4 } from 'uuid';  // Mock DID generation using UUID

const AppContent = () => {
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [did, setDid] = useState('');
  const { hasCopied, onCopy } = useClipboard(did);
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
      script.loading = 'lazy';
      script.onload = () => {
        if (window.LaunchListWidget) {
          window.LaunchListWidget.init();
          widgetRef.current = true;
          setTimeout(() => {
            widgetRef.current = false;
          }, 500);
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

  useEffect(() => {
    // Generate DID automatically on mount (mock implementation)
    const generatedDid = `did:web5:${uuidv4()}`;
    setDid(generatedDid);
  }, []);

  const commonButtonStyles = {
    colorScheme: 'orange',
    bg: 'orange.400',
    color: 'black',
    size: 'lg',
    borderRadius: 'full',
    paddingX: 8,
    paddingY: 6,
    fontSize: 'lg',
    textDecoration: 'none',  // Remove underline
    transition: 'all 0.2s ease-in-out',
    _hover: { bg: 'orange.500', transform: 'scale(1.1)', boxShadow: '2xl' },
    _active: { bg: 'orange.600' },
    _focus: { boxShadow: 'outline' },
  };

  return (
    <Box minH="100vh" color="white" bg="gray.900" position="relative">
      <Container maxW="container.md" pt={8} px={{ base: 4, md: 8 }} pb={16}>
        <VStack spacing={8} align="center" justify="center">
          {/* Title Section */}
          <VStack spacing={2} textAlign="center">
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="extrabold" lineHeight="shorter">
              LeetMigo 👾
            </Text>
            <Text fontSize={{ base: 'sm', md: 'lg' }} fontWeight="semibold">
              the world's first decentralized platform for dsa interview prep, made for non-trad, cracked techies and frens
            </Text>
          </VStack>

          {/* Banner Image */}
          <AspectRatio ratio={16 / 9} width="100%" maxW="800px" borderRadius="md">
            <Image 
              src={bannerImage} 
              alt="LeetMigo Banner" 
              objectFit="cover" 
              loading="lazy"
            />
          </AspectRatio>

          {/* LaunchList Widget and CTA */}
          {!widgetRef.current && <Spinner color="orange.400" size="xl" />}
          {widgetRef.current && (
            <Text mt={2} fontSize="sm" color="gray.400">
              Widget loaded successfully
            </Text>
          )}
          <Box width="100%" maxW="400px" mt={4}>
            <div className="launchlist-widget" data-key-id="pI1JRr" data-height="180px"></div>
          </Box>

          <VStack align="center" width="100%" mt={4} spacing={4}>
            <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="orange.400" textAlign="center">
              don’t miss out! 🚀 get free early access and be part of the first wave of cracked techies. sign up now!
            </Text>
            <Box width="100%" maxW="400px">
              <div className="launchlist-widget" data-key-id="pI1JRr" data-height="180px"></div>
            </Box>
          </VStack>

          {/* LeetCode 75 Button */}
          <VStack align="center" width="100%" mt={4}>
            <Button 
              {...commonButtonStyles}
              as="a"
              href="https://docs.google.com/spreadsheets/d/1v0OCKeLa9q8douuR6RQmQ5mOG2piThh50wuGA79g2SY/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              bg="orange.500"
              border="2px solid"
              borderColor="orange.600"
              color="white"
              _hover={{ bg: "orange.600", transform: "scale(1.1)", boxShadow: "2xl" }}
              textDecoration="none"
            >
              free leetcode grind 75 study spreadsheet
            </Button>
          </VStack>

          {/* Features Section */}
          <VStack align="center" spacing={4} width="100%" mt={8}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center" color="gray.300">
              features coming soon:
            </Text>
            <HStack spacing={{ base: 6, md: 4 }} justify="center" width="100%">
              <Button {...commonButtonStyles} paddingX={{ base: 10, md: 8 }} paddingY={{ base: 8, md: 6 }}>
                learn
              </Button>
              <Button {...commonButtonStyles} paddingX={{ base: 10, md: 8 }} paddingY={{ base: 8, md: 6 }}>
                collab
              </Button>
              <Button {...commonButtonStyles} paddingX={{ base: 10, md: 8 }} paddingY={{ base: 8, md: 6 }}>
                pay with bitcoin
              </Button>
            </HStack>
          </VStack>

          {/* DID Login Section */}
          <VStack spacing={4} align="center" width="100%" mt={8}>
            <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" color="orange.400">
              your DID has been generated! 🎉
            </Text>
            <Text fontSize="sm" color="gray.300">
              DID: {did}
            </Text>
            <Button {...commonButtonStyles} onClick={onCopy}>
              {hasCopied ? 'copied!' : 'copy DID to clipboard'}
            </Button>
            <Text fontSize="sm" color="gray.400" mt={2}>
              save your DID for future logins using your username.
            </Text>
          </VStack>
        </VStack>
      </Container>

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
            <Button {...commonButtonStyles} size="sm" bg="gray.600" onClick={handleGdprAccept}>
              accept
            </Button>
            <Button {...commonButtonStyles} size="sm" bg="gray.600" variant="outline" onClick={() => setIsPrivacyPolicyOpen(true)}>
              dismiss
            </Button>
          </HStack>
        </Box>
      )}

      <Modal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)}>
        <ModalOverlay />
        <ModalContent p={4} borderRadius="md">
          <ModalHeader>Privacy Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This is where your privacy policy content will be displayed. Make sure to
              include all necessary details regarding data usage, storage, and user rights.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button {...commonButtonStyles} onClick={() => setIsPrivacyPolicyOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  
    </Box>
  );
};

export { AppContent as default };
