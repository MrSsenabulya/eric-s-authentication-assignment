import { useAuth as useMockAuth } from '../contexts/MockAuthContext';

// Simplified auth hook that always uses mock authentication
export const useAuth = () => {
  return useMockAuth();
};
