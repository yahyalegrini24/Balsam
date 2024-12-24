// src/hooks/useRole.js
import { useState, useEffect } from 'react';

export const useRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Mock the role for testing (replace with actual logic when available)
    setRole('patient');  // You can change this to 'admin', 'professional', etc., for testing

    // Optionally, retrieve the role from AsyncStorage or a database here
    // Example: setRole(localStorage.getItem('role') or AsyncStorage.getItem('role'));
  }, []);

  return { role, setRole };
};
