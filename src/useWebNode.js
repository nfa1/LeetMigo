// src/useWebNode.js
import { useRef, useEffect } from 'react';

export const useWebNode = (elementType = 'div') => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!nodeRef.current) {
      nodeRef.current = document.createElement(elementType);
    }
    // Optionally append the element to a specific location
    document.body.appendChild(nodeRef.current);

    return () => {
      if (nodeRef.current) {
        document.body.removeChild(nodeRef.current);
      }
    };
  }, [elementType]);

  return nodeRef;
};


