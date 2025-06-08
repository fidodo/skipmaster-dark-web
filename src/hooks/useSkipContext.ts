
import { useContext } from 'react';
import { SkipContext } from '../contexts/SkipContext';

export const useSkipContext = () => {
  const context = useContext(SkipContext);
  if (context === undefined) {
    throw new Error('useSkipContext must be used within a SkipProvider');
  }
  return context;
};
