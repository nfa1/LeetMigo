import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

function ComingSoon() {
  return (
    <Box
      width="100vw"
      height="100vh"
      backgroundImage="url('public/LeetMigo_banner_main_01.png')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.7)"
    >
      <Heading size="2xl" color="white">
        Feature Coming Soon!
      </Heading>
    </Box>
  );
}

export default ComingSoon;
