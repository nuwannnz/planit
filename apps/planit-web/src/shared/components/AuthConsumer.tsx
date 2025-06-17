'use client';

import { useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthConsumer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AuthService.initialise();
  }, []);
  return children;
};
