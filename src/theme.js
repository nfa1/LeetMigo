import { extendTheme } from '@chakra-ui/react';
import { localStorageManager } from '@chakra-ui/color-mode';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colorModeManager: localStorageManager, // Save preference in localStorage
};

const theme = extendTheme({ config });

export default theme;
