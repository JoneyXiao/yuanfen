"use client";

import { useEffect } from 'react';

const ClientPolyfills = () => {
  useEffect(() => {
    // Dynamically import polyfills on the client side
    const loadPolyfills = async () => {
      try {
        await import('@/lib/polyfills');
      } catch (error) {
        console.warn('Failed to load polyfills:', error);
      }
    };

    loadPolyfills();
  }, []);

  return null; // This component doesn't render anything
};

export default ClientPolyfills;
