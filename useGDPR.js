// useWeb5.js
import { useState } from 'react';
import { Web5 } from '@web5/api';

export function useWeb5() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginDID, setLoginDID] = useState('');

  const createDID = async (username) => {
    setIsLoading(true);
    setError('');
    setLoginDID('');

    try {
      const { did } = await Web5.createDID({ identifier: username });
      setLoginDID(did);
      localStorage.setItem('userDID', did);
      return did;
    } catch (err) {
      console.error('Error creating DID:', err);
      setError('An unexpected error occurred while creating your decentralized ID. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, loginDID, createDID };
}
